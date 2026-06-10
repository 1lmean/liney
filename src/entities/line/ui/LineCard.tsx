import { View, TouchableOpacity, Pressable, StyleSheet, useColorScheme } from 'react-native';
import { colors, shadow, spacing, radius } from '@/shared/tokens';
import { Text } from '@/shared/ui';
import { formatCardDate } from '@/shared/utils/date';
import type { Line } from '../model/line.types';

interface LineCardProps {
  line: Line;
}

export function LineCard({ line }: LineCardProps) {
  const scheme = useColorScheme() ?? 'light';
  const palette = colors[scheme];

  return (
    <Pressable style={[styles.card, { backgroundColor: palette.surface, ...shadow.card }]}>
      <TouchableOpacity
        style={styles.menuBtn}
        hitSlop={8}
        onPress={() => console.log('menu', line.id)}
      >
        <Text style={{ fontSize: 16, color: palette.inkSubtle, letterSpacing: 1 }}>···</Text>
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
  );
}

const styles = StyleSheet.create({
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
    fontSize: 20,
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
});
