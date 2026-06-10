import { View, Image, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import { useColorScheme } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, shadow } from '@/shared/tokens';
import { Text } from './Text';

interface AvatarProps {
  size?: number;
  uri?: string;
  fallback?: string;
  editable?: boolean;
  onEditPress?: () => void;
  style?: StyleProp<ViewStyle>;
  className?: string;
}

export function Avatar({
  size = 72,
  uri,
  fallback = '?',
  editable = false,
  onEditPress,
  style,
  className,
}: AvatarProps) {
  const scheme = useColorScheme() ?? 'light';
  const palette = colors[scheme];

  const editSize = Math.round(size * 0.35);
  const editOffset = Math.round(size * 0.01);

  return (
    <View style={[{ width: size, height: size }, style]} className={className}>
      {/* 아바타 원형 */}
      <View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: palette.highlight,
          overflow: 'hidden',
        }}
      >
        {uri ? (
          <Image source={{ uri }} style={{ width: size, height: size }} resizeMode="cover" />
        ) : (
          <View
            style={{
              width: size,
              height: size,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text variant="title" color={palette.inkMuted} style={{ fontSize: size * 0.38 }}>
              {fallback.slice(0, 1).toUpperCase()}
            </Text>
          </View>
        )}
      </View>

      {/* 수정 버튼 */}
      {editable && (
        <TouchableOpacity
          onPress={onEditPress}
          activeOpacity={0.8}
          style={{
            position: 'absolute',
            bottom: editOffset,
            left: editOffset,
            width: editSize,
            height: editSize,
            borderRadius: editSize / 2,
            backgroundColor: palette.surface,
            alignItems: 'center',
            justifyContent: 'center',
            ...shadow.chip,
          }}
        >
          <Feather name="edit-2" size={editSize * 0.48} color={palette.ink} />
        </TouchableOpacity>
      )}
    </View>
  );
}
