import { View, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, shadow, spacing } from '@/shared/tokens';
import { Text } from '@/shared/ui';
import { useLineStore, LineCard } from '@/entities/line';

export function LineGrid() {
  const lines = useLineStore((s) => s.lines);

  return (
    <View style={styles.grid}>
      {lines.map((line) => (
        <LineCard key={line.id} line={line} />
      ))}
    </View>
  );
}

export function LineGridFab() {
  const scheme = useColorScheme() ?? 'light';
  const palette = colors[scheme];
  const router = useRouter();

  return (
    <TouchableOpacity
      style={[styles.fab, { backgroundColor: palette.ink, ...shadow.fab }]}
      activeOpacity={0.85}
      onPress={() => router.push('/scan')}
    >
      <Text style={{ fontSize: 28, color: palette.bg, lineHeight: 32 }}>+</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
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
