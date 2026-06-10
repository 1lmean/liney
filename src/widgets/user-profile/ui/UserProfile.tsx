import { View, StyleSheet, useColorScheme } from 'react-native';
import { colors, spacing } from '@/shared/tokens';
import { Text, Avatar } from '@/shared/ui';
import { useLineStore } from '@/entities/line';

export function UserProfile() {
  const scheme = useColorScheme() ?? 'light';
  const palette = colors[scheme];
  const lines = useLineStore((s) => s.lines);

  return (
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
        size={80}
        fallback="선"
        editable
        onEditPress={() => console.log('edit')}
        style={{ alignSelf: 'center' }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
    paddingBottom: spacing.xxl,
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.lg,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
});
