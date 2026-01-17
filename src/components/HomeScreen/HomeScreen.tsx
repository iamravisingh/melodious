import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import strings from '../../constants/strings.json';
import { YouTubePlayer } from '../YouTubePlayer';

export default function HomeScreen() {
  const [url, setUrl] = useState('');
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const handleLoadVideo = () => {
    if (url.trim()) {
      setIsLoading(true);
      setTimeout(() => {
        setVideoLoaded(true);
        setIsLoading(false);
      }, 500);
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{strings.home.title}</Text>
      
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder={strings.home.urlPlaceholder}
            value={url}
            onChangeText={setUrl}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {url.length > 0 && (
            <TouchableOpacity 
              style={styles.clearButton} 
              onPress={() => {
                setUrl('');
                setVideoLoaded(false);
              }}
            >
              <Text style={styles.clearButtonText}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
        <Text style={styles.helper}>{strings.home.urlHelper}</Text>
      </View>

      <TouchableOpacity 
        style={[styles.button, (!url.trim() || isLoading) && styles.buttonDisabled]} 
        onPress={handleLoadVideo}
        disabled={!url.trim() || isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>{strings.home.loadButton}</Text>
        )}
      </TouchableOpacity>

      {videoLoaded && (
        <>
          <View style={styles.videoContainer}>
            <YouTubePlayer url={url} />
          </View>

          <TouchableOpacity 
            style={[styles.button, styles.recordButton, isRecording && styles.recordingButton]} 
            onPress={toggleRecording}
          >
            <Text style={styles.buttonText}>
              {isRecording ? strings.home.stopButton : strings.home.recordButton}
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontFamily: 'monospace',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputWrapper: {
    position: 'relative',
    marginBottom: 8,
  },
  input: {
    fontFamily: 'monospace',
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    paddingRight: 40,
  },
  clearButton: {
    position: 'absolute',
    right: 12,
    top: '50%',
    transform: [{ translateY: -12 }],
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearButtonText: {
    fontFamily: 'monospace',
    fontSize: 18,
    color: '#6b7280',
  },
  helper: {
    fontFamily: 'monospace',
    fontSize: 12,
    color: '#6b7280',
  },
  button: {
    backgroundColor: '#2563eb',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#9ca3af',
  },
  buttonText: {
    fontFamily: 'monospace',
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  recordButton: {
    backgroundColor: '#10b981',
    marginTop: 20,
  },
  recordingButton: {
    backgroundColor: '#ef4444',
  },
  videoContainer: {
    marginTop: 20,
  },
});
