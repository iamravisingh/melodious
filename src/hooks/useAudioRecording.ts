import { useEffect } from 'react';
import { useAudioRecorder, AudioModule, RecordingPresets } from 'expo-audio';
import * as Haptics from 'expo-haptics';

export const useAudioRecording = () => {
  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);

  const requestPermissionOnLoad = async () => {
      const status = await AudioModule.requestRecordingPermissionsAsync();
      if (!status.granted) {
        console.warn('Recording permission not granted');
      }
    }

  useEffect(() => {
    requestPermissionOnLoad()
  }, []);

  const startRecording = async (): Promise<void> => {
    try {
      await audioRecorder.prepareToRecordAsync();
      audioRecorder.record();
      // Haptic feedback on start
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } catch (error) {
      console.error('Failed to start recording >>>>', error);
      // Error haptic
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  };

  const stopRecording = async (): Promise<string | null> => {
    try {
      await audioRecorder.stop();
      const uri = audioRecorder.uri;
      // Success haptic on stop
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      return uri;
    } catch (error) {
      console.error('Failed to stop recording >>>>', error);
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      return null;
    }
  };

  return {
    isRecording: audioRecorder.isRecording,
    startRecording,
    stopRecording,
  };
};
