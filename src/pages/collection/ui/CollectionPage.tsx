import { ScrollView, StyleSheet, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/shared/tokens';
import { UserProfile } from '@/widgets/user-profile';
import { LineGrid, LineGridFab } from '@/widgets/line-grid';

export default function CollectionPage() {
  const scheme = useColorScheme() ?? 'light';
  const palette = colors[scheme];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: palette.bg }} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <UserProfile />
        <LineGrid />
      </ScrollView>
      <LineGridFab />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 120,
  },
});
