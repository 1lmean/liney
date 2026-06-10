import { View, TextInput, StyleProp, ViewStyle } from 'react-native';
import { useColorScheme } from 'react-native';
import { colors } from '@/tokens';
import { Text } from './Text';

interface InputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  keyboardType?: 'default' | 'numeric';
  style?: StyleProp<ViewStyle>;
  className?: string;
}

export function Input({
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType = 'default',
  style,
  className,
}: InputProps) {
  const scheme = useColorScheme() ?? 'light';
  const palette = colors[scheme];

  return (
    <View className={className} style={style}>
      {label && (
        <Text
          variant="caption"
          weight="bold"
          color={palette.inkMuted}
          className="mb-1.5 tracking-[0.8px]"
        >
          {label.toUpperCase()}
        </Text>
      )}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={palette.inkSubtle}
        keyboardType={keyboardType}
        className="rounded-[14px] border-[1.5px] px-3 py-[11px] text-[15px] font-medium"
        style={{
          backgroundColor: palette.bg,
          color: palette.ink,
          borderColor: palette.line,
        }}
      />
    </View>
  );
}
