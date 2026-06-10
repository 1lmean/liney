import { ActivityIndicator, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import { useColorScheme } from 'react-native';
import { colors, shadow } from '@/tokens';
import { Text } from './Text';

type Variant = 'dark' | 'soft' | 'white';

interface ButtonProps {
  label: string;
  variant?: Variant;
  onPress?: () => void;
  loading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  className?: string;
}

export function Button({
  label,
  variant = 'dark',
  onPress,
  loading = false,
  disabled = false,
  style,
  className,
}: ButtonProps) {
  const scheme = useColorScheme() ?? 'light';
  const palette = colors[scheme];

  const bgColor = {
    dark: palette.ink,
    soft: palette.bgSub,
    white: palette.surface,
  }[variant];

  const textColor = {
    dark: palette.bg,
    soft: palette.ink,
    white: palette.ink,
  }[variant];

  const shadowStyle = shadow.chip;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.75}
      className={[
        'flex-row items-center justify-center rounded-full px-5 py-3',
        disabled && 'opacity-40',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={[{ backgroundColor: bgColor, ...shadowStyle }, style]}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <Text variant="body" weight="bold" color={textColor}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
}
