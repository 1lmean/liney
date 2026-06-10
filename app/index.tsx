import { View, ScrollView, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, shadow, spacing } from '@/tokens';
import { Text } from '@/components/ui/Text';
import { Avatar } from '@/components/ui/Avatar';

export default function CollectionScreen() {
  const scheme = useColorScheme() ?? 'light';
  const palette = colors[scheme];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: palette.bg }} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 유저 섹션 */}
        <View style={styles.userSection}>
          <View style={styles.userInfo}>
            {/* 유저명 */}
            <Text variant="display" style={{ marginBottom: spacing.lg }}>
              선밈
            </Text>

            {/* 서브텍스트 */}
            <Text variant="body" color={palette.inkMuted} style={{ marginBottom: spacing.xs }}>
              종이책도 좋고, 기록도 좋지만 글씨 쓰기는 싫은 사람
            </Text>

            {/* 통계 */}
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text variant="body" weight="bold">
                  0
                </Text>
                <Text variant="body" color={palette.inkMuted}>
                  {' '}
                  줄
                </Text>
              </View>
              <View style={styles.statItem}>
                <Text variant="body" weight="bold">
                  0
                </Text>
                <Text variant="body" color={palette.inkMuted}>
                  {' '}
                  권
                </Text>
              </View>
            </View>
          </View>

          {/* 아바타 */}
          <Avatar size={100} fallback="선" editable onEditPress={() => console.log('edit')} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  topActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: spacing.sm,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  topBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
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
});
