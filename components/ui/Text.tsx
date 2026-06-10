import { Text as RNText, StyleProp, TextStyle } from 'react-native';
import { useColorScheme } from 'react-native';
import { colors } from '@/tokens';

type Variant = 'display' | 'wordmark' | 'title' | 'body' | 'bodySerif' | 'tag' | 'caption';
type Weight = 'regular' | 'medium' | 'semibold' | 'bold' | 'extrabold';

interface TextProps {
  variant?: Variant;
  weight?: Weight;
  color?: string;
  style?: StyleProp<TextStyle>;
  className?: string;
  children: React.ReactNode;
}

const variantClassName: Record<Variant, string> = {
  display: 'text-[32px] font-extrabold tracking-[-1px] leading-[41px]',
  wordmark: 'font-serif text-[30px] font-bold italic',
  title: 'text-[23px] font-extrabold tracking-[-0.5px]',
  body: 'text-[15px] font-medium leading-[23px]',
  bodySerif: 'font-serif text-[15px] italic leading-[29px]',
  tag: 'text-sm font-semibold',
  caption: 'text-xs font-semibold',
};

const weightClassName: Record<Weight, string> = {
  regular: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
  extrabold: 'font-extrabold',
};

function cn(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(' ');
}

export function Text({ variant = 'body', weight, color, style, className, children }: TextProps) {
  const scheme = useColorScheme() ?? 'light';
  const palette = colors[scheme];

  return (
    <RNText
      className={cn(variantClassName[variant], weight && weightClassName[weight], className)}
      style={[{ color: color ?? palette.ink }, style]}
    >
      {children}
    </RNText>
  );
}
