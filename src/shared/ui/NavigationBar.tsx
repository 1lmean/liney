import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Text } from './Text';
import { spacing, typography } from '@/shared/tokens';

interface NavigationBarProps {
  title?: string;
  tintColor?: string;
}

export function NavigationBar({ title, tintColor = '#FFFFFF' }: NavigationBarProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.inner}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Text style={[styles.backArrow, { color: tintColor }]}>←</Text>
        </TouchableOpacity>
        {title ? (
          <View style={styles.titleContainer}>
            <Text style={[styles.title, { color: tintColor }]}>{title}</Text>
          </View>
        ) : null}
        <View style={styles.rightPlaceholder} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
  },
  inner: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
  },
  backArrow: {
    fontSize: typography.size.xl,
    fontWeight: typography.weight.medium,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: typography.size.md,
    fontWeight: typography.weight.semibold,
  },
  rightPlaceholder: {
    width: 44,
  },
});
