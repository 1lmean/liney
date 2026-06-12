import { useRef, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, useColorScheme, Dimensions } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';

const SCREEN_WIDTH = Dimensions.get('window').width;
const CAMERA_HEIGHT = Math.round(SCREEN_WIDTH * (4 / 3));
import { useRouter } from 'expo-router';
import { NavigationBar } from '@/shared/ui';
import { Text } from '@/shared/ui';
import { colors, spacing } from '@/shared/tokens';

export default function ScanPage() {
  const scheme = useColorScheme() ?? 'light';
  const palette = colors[scheme];
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const [isCapturing, setIsCapturing] = useState(false);

  if (!permission) return <View style={[styles.fill, { backgroundColor: palette.bg }]} />;

  if (!permission.granted) {
    return (
      <View style={[styles.fill, styles.permissionContainer, { backgroundColor: palette.bg }]}>
        <NavigationBar title="촬영" tintColor={palette.ink} />
        <Text style={[styles.permissionText, { color: palette.inkMuted }]}>
          카메라 접근 권한이 필요합니다
        </Text>
        <TouchableOpacity
          style={[styles.permissionButton, { backgroundColor: palette.ink }]}
          onPress={requestPermission}
          activeOpacity={0.8}
        >
          <Text style={[styles.permissionButtonText, { color: palette.bg }]}>권한 허용</Text>
        </TouchableOpacity>
      </View>
    );
  }

  async function handleCapture() {
    if (isCapturing || !cameraRef.current) return;
    setIsCapturing(true);
    try {
      const photo = await cameraRef.current.takePictureAsync();
      if (photo) {
        router.push({
          pathname: '/select',
          params: { uri: photo.uri, width: String(photo.width), height: String(photo.height) },
        });
      }
    } finally {
      setIsCapturing(false);
    }
  }

  return (
    <View style={styles.container}>
      <NavigationBar title="촬영" />
      <View style={styles.topSpacer} />
      <CameraView ref={cameraRef} style={styles.camera} facing="back" />
      <View style={styles.controls}>
        <TouchableOpacity
          style={[styles.shutterRing, isCapturing && styles.shutterRingActive]}
          onPress={handleCapture}
          activeOpacity={0.85}
          disabled={isCapturing}
        >
          <View style={styles.shutterInner} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    width: SCREEN_WIDTH,
    height: CAMERA_HEIGHT,
  },
  permissionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.lg,
    paddingTop: 100,
  },
  permissionText: {
    fontSize: 15,
  },
  permissionButton: {
    paddingHorizontal: spacing.xxl,
    paddingVertical: spacing.md,
    borderRadius: 999,
  },
  permissionButtonText: {
    fontSize: 15,
    fontWeight: '600',
  },
  topSpacer: {
    flex: 1,
  },
  controls: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shutterRing: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shutterRingActive: {
    opacity: 0.6,
  },
  shutterInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
  },
});
