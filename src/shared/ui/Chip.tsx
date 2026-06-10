import { TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import { useColorScheme } from 'react-native';
import { colors, shadow } from '@/shared/tokens';
import { Text } from './Text';

interface ChipProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  className?: string;
}

export function Chip({ label, selected = false, onPress, style, className }: ChipProps) {
  const scheme = useColorScheme() ?? 'light';
  const palette = colors[scheme];

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.75}
      className={['self-start rounded-full px-4 py-2', className].filter(Boolean).join(' ')}
      style={[
        selected
          ? { backgroundColor: palette.ink }
          : { backgroundColor: palette.surface, ...shadow.chip },
        style,
      ]}
    >
      <Text variant="tag" weight="bold" color={selected ? palette.bg : palette.ink}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}
