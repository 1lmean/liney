import { View, StyleProp, ViewStyle } from 'react-native';
import { useColorScheme } from 'react-native';
import { colors, shadow } from '@/tokens';

interface CardProps {
  children: React.ReactNode;
  bgColor?: string;
  style?: StyleProp<ViewStyle>;
  className?: string;
}

export function Card({ children, bgColor, style, className }: CardProps) {
  const scheme = useColorScheme() ?? 'light';
  const palette = colors[scheme];

  return (
    <View
      className={['rounded-[22px] p-5', className].filter(Boolean).join(' ')}
      style={[
        {
          backgroundColor: bgColor ?? palette.surface,
          ...shadow.card,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}
