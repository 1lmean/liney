import { useState, useEffect } from 'react';
import {
  View,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TextRecognition, { TextRecognitionScript } from '@react-native-ml-kit/text-recognition';
import { NavigationBar, Text } from '@/shared/ui';
import { colors, spacing, typography } from '@/shared/tokens';

interface RecognizedLine {
  text: string;
  frame: { left: number; top: number; width: number; height: number };
}

export default function SelectPage() {
  const {
    uri,
    width: wParam,
    height: hParam,
  } = useLocalSearchParams<{
    uri: string;
    width: string;
    height: string;
  }>();
  const scheme = useColorScheme() ?? 'light';
  const palette = colors[scheme];
  const insets = useSafeAreaInsets();

  const imageWidth = Number(wParam) || 1;
  const imageHeight = Number(hParam) || 1;

  const [lines, setLines] = useState<RecognizedLine[]>([]);
  const [addedIndices, setAddedIndices] = useState<Set<number>>(new Set());
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [debugInfo, setDebugInfo] = useState<string>('');

  useEffect(() => {
    if (!uri) {
      setIsLoading(false);
      return;
    }
    TextRecognition.recognize(uri, TextRecognitionScript.KOREAN)
      .then((result) => {
        const allLines = result.blocks.flatMap((b) => b.lines);
        const firstFrame = allLines[0]?.frame;

        console.log('[OCR] blocks:', result.blocks.length, 'lines:', allLines.length);
        console.log('[OCR] imageParams w×h:', wParam, '×', hParam);
        console.log('[OCR] firstFrame:', JSON.stringify(firstFrame));
        console.log('[OCR] fullText:', result.text.slice(0, 200));

        setDebugInfo(
          `params: ${wParam}×${hParam}\n` +
            `blocks:${result.blocks.length} lines:${allLines.length}\n` +
            `frame[0]: ${firstFrame ? `L${firstFrame.left} T${firstFrame.top} ${firstFrame.width}×${firstFrame.height}` : 'none'}\n` +
            `text: ${result.text.slice(0, 60)}…`,
        );

        // ML Kit ignores EXIF orientation — returns raw landscape coords.
        // When camera params are portrait (W < H), raw space is landscape (W=imgH, H=imgW).
        // Transform: 90° CW landscape → portrait
        const needsRotation = imageWidth < imageHeight;

        const extracted: RecognizedLine[] = allLines
          .filter((l) => l.text.trim().length > 1 && l.frame != null)
          .map((l) => {
            const f = l.frame!;
            if (needsRotation) {
              return {
                text: l.text.trim(),
                frame: {
                  left: imageWidth - f.top - f.height,
                  top: f.left,
                  width: f.height,
                  height: f.width,
                },
              };
            }
            return { text: l.text.trim(), frame: f };
          });
        setLines(extracted);
      })
      .catch((e) => {
        console.error('[OCR] error:', e);
        setDebugInfo(`error: ${e?.message}`);
      })
      .finally(() => setIsLoading(false));
  }, [uri]);

  function handleSelectLine(index: number) {
    if (addedIndices.has(index)) return;
    setAddedIndices((prev) => new Set(prev).add(index));
    setText((prev) => (prev ? `${prev}\n${lines[index].text}` : lines[index].text));
  }

  const scale =
    containerSize.width > 0
      ? Math.max(containerSize.width / imageWidth, containerSize.height / imageHeight)
      : 0;
  const renderedW = imageWidth * scale;
  const renderedH = imageHeight * scale;
  const offsetX = (containerSize.width - renderedW) / 2;
  const offsetY = (containerSize.height - renderedH) / 2;

  const canSubmit = text.trim().length > 0;

  return (
    <KeyboardAvoidingView
      style={styles.fill}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Image + OCR overlay */}
      <View
        style={styles.imageContainer}
        onLayout={(e) => {
          const { width, height } = e.nativeEvent.layout;
          setContainerSize({ width, height });
        }}
      >
        {uri ? <Image source={{ uri }} style={styles.fill} resizeMode="cover" /> : null}

        {scale > 0 &&
          lines.map((line, i) => {
            const added = addedIndices.has(i);
            return (
              <TouchableOpacity
                key={i}
                activeOpacity={0.7}
                onPress={() => handleSelectLine(i)}
                style={[
                  styles.highlight,
                  {
                    left: offsetX + line.frame.left * scale,
                    top: offsetY + line.frame.top * scale,
                    width: line.frame.width * scale,
                    height: Math.max(line.frame.height * scale, 20),
                    backgroundColor: added
                      ? 'rgba(251, 191, 36, 0.45)'
                      : 'rgba(255, 255, 255, 0.15)',
                    borderColor: added ? 'rgba(251, 191, 36, 0.9)' : 'rgba(255, 255, 255, 0.4)',
                  },
                ]}
              />
            );
          })}

        {isLoading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator color="#fff" size="large" />
            <Text style={styles.loadingText}>문장 인식 중...</Text>
          </View>
        )}

        {/* {__DEV__ && !isLoading && debugInfo ? (
          <View style={styles.debugPanel}>
            <Text style={styles.debugText}>{debugInfo}</Text>
          </View>
        ) : null} */}
      </View>

      {/* Bottom panel */}
      <View
        style={[
          styles.bottomPanel,
          { backgroundColor: palette.surface, paddingBottom: insets.bottom + spacing.md },
        ]}
      >
        <TextInput
          style={[
            styles.textarea,
            { color: palette.ink, borderColor: palette.line, backgroundColor: palette.bgSub },
          ]}
          multiline
          placeholder="사진에서 문장을 선택하세요"
          placeholderTextColor={palette.inkSubtle}
          value={text}
          onChangeText={setText}
          textAlignVertical="top"
        />
        <TouchableOpacity
          style={[styles.submitButton, { backgroundColor: canSubmit ? palette.ink : palette.line }]}
          disabled={!canSubmit}
          activeOpacity={0.85}
          onPress={() => console.log('submit', text)}
        >
          <Text style={[styles.submitText, { color: canSubmit ? palette.bg : palette.inkSubtle }]}>
            저장하기
          </Text>
        </TouchableOpacity>
      </View>

      <NavigationBar title="문장 선택" />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    backgroundColor: '#000',
    overflow: 'hidden',
  },
  highlight: {
    position: 'absolute',
    borderWidth: 1.5,
    borderRadius: 3,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  loadingText: {
    color: '#fff',
    fontSize: typography.size.sm,
  },
  bottomPanel: {
    paddingTop: spacing.lg,
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  textarea: {
    minHeight: 96,
    maxHeight: 140,
    borderWidth: 1,
    borderRadius: 12,
    padding: spacing.md,
    fontSize: typography.size.base,
    lineHeight: typography.size.base * 1.6,
  },
  submitButton: {
    height: 50,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitText: {
    fontSize: typography.size.base,
    fontWeight: '600',
  },
  debugPanel: {
    position: 'absolute',
    bottom: spacing.sm,
    left: spacing.sm,
    right: spacing.sm,
    backgroundColor: 'rgba(0,0,0,0.75)',
    borderRadius: 8,
    padding: spacing.sm,
  },
  debugText: {
    color: '#0f0',
    fontSize: 10,
    fontFamily: 'monospace',
  },
});
