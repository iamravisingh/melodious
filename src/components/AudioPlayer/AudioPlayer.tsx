import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

interface AudioPlayerProps {
  uri: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ uri }) => {
  // TODO: Implement audio player with expo-video or web audio
  return (
    <View style={styles.container}>
      <Text style={styles.placeholder}>Audio Player</Text>
      <Text style={styles.subtext}>(Coming Soon)</Text>
    </View>
  );
};

export default AudioPlayer;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 200,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderStyle: 'dashed',
  },
  placeholder: {
    fontFamily: 'monospace',
    fontSize: 16,
    color: '#6b7280',
  },
  subtext: {
    fontFamily: 'monospace',
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 4,
  },
});
