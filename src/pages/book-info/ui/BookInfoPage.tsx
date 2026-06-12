import { useState } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationBar, Input, Text } from '@/shared/ui';
import { colors, spacing, typography, radius, shadow } from '@/shared/tokens';
import { useLineStore } from '@/entities/line';

export default function BookInfoPage() {
  const { sentence } = useLocalSearchParams<{ sentence: string }>();
  const scheme = useColorScheme() ?? 'light';
  const palette = colors[scheme];
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const addLine = useLineStore((s) => s.addLine);

  const [bookTitle, setBookTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [page, setPage] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const canSave = bookTitle.trim().length > 0;

  function handleSave() {
    if (!canSave || isSaving) return;
    setIsSaving(true);
    addLine({
      sentence: sentence ?? '',
      bookTitle: bookTitle.trim(),
      author: author.trim() || undefined,
      page: page ? parseInt(page, 10) : undefined,
    });
    router.replace('/');
  }

  return (
    <KeyboardAvoidingView
      style={styles.fill}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <NavigationBar title="책 정보" />
      <ScrollView
        style={styles.fill}
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + spacing.xxl }]}
        keyboardShouldPersistTaps="handled"
      >
        <View style={[styles.sentenceCard, { backgroundColor: palette.surface, ...shadow.card }]}>
          <Text variant="bodySerif" style={[styles.sentenceText, { color: palette.ink }]}>
            {sentence}
          </Text>
        </View>

        <View style={styles.form}>
          <Input label="책 이름" placeholder="책 제목을 입력하세요" value={bookTitle} onChangeText={setBookTitle} />
          <Input
            label="작가"
            placeholder="작가명 (선택)"
            value={author}
            onChangeText={setAuthor}
            style={styles.inputGap}
          />
          <Input
            label="페이지"
            placeholder="페이지 번호 (선택)"
            value={page}
            onChangeText={setPage}
            keyboardType="numeric"
            style={styles.inputGap}
          />
        </View>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.md, backgroundColor: palette.bg }]}>
        <TouchableOpacity
          style={[styles.saveButton, { backgroundColor: canSave ? palette.ink : palette.line }]}
          disabled={!canSave || isSaving}
          onPress={handleSave}
          activeOpacity={0.85}
        >
          <Text style={[styles.saveText, { color: canSave ? palette.bg : palette.inkSubtle }]}>
            저장하기
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  content: {
    padding: spacing.lg,
    gap: spacing.xxl,
  },
  sentenceCard: {
    borderRadius: radius.card,
    padding: spacing.xxl,
    minHeight: 140,
    justifyContent: 'center',
  },
  sentenceText: {
    fontSize: 22,
    lineHeight: 32,
  },
  form: {
    gap: 0,
  },
  inputGap: {
    marginTop: spacing.lg,
  },
  footer: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(0,0,0,0.08)',
  },
  saveButton: {
    height: 50,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveText: {
    fontSize: typography.size.base,
    fontWeight: '600',
  },
});
