import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, shadow, spacing, radius } from '@/tokens';
import { Text } from '@/components/ui/Text';
import { Avatar } from '@/components/ui/Avatar';
import { useLineStore } from '@/store/useLineStore';
import { formatCardDate } from '@/utils/date';

export default function CollectionScreen() {
  const scheme = useColorScheme() ?? 'light';
  const palette = colors[scheme];
  const lines = useLineStore((s) => s.lines);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: palette.bg }} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* 유저 섹션 */}
        <View style={styles.userSection}>
          <View style={styles.userInfo}>
            <Text variant="display" style={{ marginBottom: spacing.lg }}>
              선밈
            </Text>
            <Text variant="body" color={palette.inkMuted} style={{ marginBottom: spacing.xs }}>
              종이책도 좋고, 기록도 좋지만 글씨 쓰기는 싫은 사람
            </Text>
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text variant="body" weight="bold">
                  {lines.length}
                </Text>
                <Text variant="body" color={palette.inkMuted}>
                  {' '}
                  줄
                </Text>
              </View>
              <View style={styles.statItem}>
                <Text variant="body" weight="bold">
                  {new Set(lines.map((l) => l.bookTitle)).size}
                </Text>
                <Text variant="body" color={palette.inkMuted}>
                  {' '}
                  권
                </Text>
              </View>
            </View>
          </View>
          <Avatar
            size={100}
            fallback="선"
            editable
            onEditPress={() => console.log('edit')}
            style={{ alignSelf: 'center' }}
          />
        </View>

        {/* 카드 그리드 */}
        <View style={styles.grid}>
          {lines.map((line) => (
            <Pressable
              key={line.id}
              style={[styles.card, { backgroundColor: palette.surface, ...shadow.card }]}
            >
              <TouchableOpacity
                style={styles.menuBtn}
                hitSlop={8}
                onPress={() => console.log('menu', line.id)}
              >
                <Text style={{ fontSize: 16, color: palette.inkSubtle, letterSpacing: 1 }}>
                  ···
                </Text>
              </TouchableOpacity>
              <Text variant="bodySerif" style={styles.sentence}>
                {line.sentence}
              </Text>
              <View style={styles.cardBottom}>
                <View style={styles.bookInfo}>
                  <Text variant="caption" weight="bold" color={palette.ink}>
                    {line.bookTitle}
                  </Text>
                  <Text variant="caption" color={palette.inkMuted} style={{ marginTop: 2 }}>
                    {[line.author, line.page ? `p.${line.page}` : null].filter(Boolean).join(' · ')}
                  </Text>
                </View>
                <Text variant="caption" color={palette.inkSubtle}>
                  {formatCardDate(line.savedAt)}
                </Text>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity
        style={[styles.fab, { backgroundColor: palette.ink, ...shadow.fab }]}
        activeOpacity={0.85}
        onPress={() => console.log('add')}
      >
        <Text style={{ fontSize: 28, color: palette.bg, lineHeight: 32 }}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 120,
  },
  userSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xxl,
    paddingBottom: spacing.xl,
  },
  userInfo: {
    flex: 1,
    paddingRight: spacing.lg,
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.lg,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  card: {
    width: '48.5%',
    borderRadius: radius.card,
    padding: spacing.md,
    minHeight: 200,
    justifyContent: 'space-between',
  },
  menuBtn: {
    alignSelf: 'flex-end',
    marginBottom: spacing.xs,
  },
  sentence: {
    flex: 1,
    fontSize: 15,
    lineHeight: 27,
    marginBottom: spacing.md,
  },
  cardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  bookInfo: {
    flex: 1,
    paddingRight: spacing.sm,
  },
  fab: {
    position: 'absolute',
    bottom: 36,
    right: spacing.xl,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
