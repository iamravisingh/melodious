import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import strings from '../../constants/strings.json';
import { YouTubePlayer } from '../YouTubePlayer';
import AudioPlayer from '../AudioPlayer';
import { useAudioRecording } from '../../hooks/useAudioRecording';
import { usePitchDetection } from '../../hooks/usePitchDetection';

type MediaType = 'youtube' | 'audio' | null;

const HomeScreen: React.FC = () => {
  const [url, setUrl] = useState('');
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mediaType, setMediaType] = useState<MediaType>(null);

  const { isRecording, startRecording, stopRecording } = useAudioRecording();
  const { isModelLoaded, currentPitch } = usePitchDetection();

  // Detect media type from URL input
  const detectMediaType = (input: string): MediaType => {
    const trimmed = input.trim().toLowerCase();
    if (trimmed.includes('youtube.com') || trimmed.includes('youtu.be')) {
      return 'youtube';
    }
    if (trimmed.includes('spotify.com') || trimmed.includes('music.youtube.com') || 
        trimmed.endsWith('.mp3') || trimmed.endsWith('.wav') || trimmed.endsWith('.m4a')) {
      return 'audio';
    }
    return 'youtube'; // default
  };

  // Load media based on detected type
  const handleLoadVideo = () => {
    if (url.trim()) {
      setIsLoading(true);
      const type = detectMediaType(url);
      setMediaType(type);
      setTimeout(() => {
        setVideoLoaded(true);
        setIsLoading(false);
      }, 500);
    }
  };

  // Toggle recording state
  const toggleRecording = async () => {
    if (isRecording) {
      const uri = await stopRecording();
      if (uri) {
        console.log('✓ Recording saved:', uri);
        // TODO: Process audio file and detect pitch
        // Simulate pitch detection
        setTimeout(() => {
          console.log('Pitch detected: A4 (440 Hz)');
        }, 500);
      }
    } else {
      await startRecording();
      console.log('● Recording started...');
    }
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
        
        {!videoLoaded && (
          <TouchableOpacity 
            style={[styles.loadButton, (!url.trim() || isLoading) && styles.buttonDisabled]} 
            onPress={handleLoadVideo}
            disabled={!url.trim() || isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#374151" />
            ) : (
              <Text style={styles.loadButtonText}>{strings.home.loadButton}</Text>
            )}
          </TouchableOpacity>
        )}
      </View>

      {videoLoaded && (
        <>
          <View style={styles.videoContainer}>
            {mediaType === 'youtube' ? (
              <YouTubePlayer url={url} />
            ) : (
              <AudioPlayer uri={url} />
            )}
          </View>

          <View style={styles.analysisContainer}>
            <View style={styles.analysisRow}>
              <View style={styles.analysisColumn}>
                <Text style={styles.analysisLabel}>{strings.home.trackLabel}</Text>
                <View style={styles.dataRow}>
                  <View style={styles.dataItem}>
                    <Text style={styles.dataLabel}>{strings.home.noteLabel}</Text>
                    <Text style={styles.dataValue}>{strings.home.noDataLabel}</Text>
                  </View>
                  <View style={styles.dataItem}>
                    <Text style={styles.dataLabel}>{strings.home.pitchLabel}</Text>
                    <Text style={styles.dataValue}>{strings.home.noDataLabel}</Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.analysisRow}>
              <View style={styles.analysisColumn}>
                <Text style={styles.analysisLabel}>{strings.home.yourVoiceLabel}</Text>
                <View style={styles.dataRow}>
                  <View style={styles.dataItem}>
                    <Text style={styles.dataLabel}>{strings.home.noteLabel}</Text>
                    <Text style={styles.dataValue}>{currentPitch?.note || strings.home.noDataLabel}</Text>
                  </View>
                  <View style={styles.dataItem}>
                    <Text style={styles.dataLabel}>{strings.home.pitchLabel}</Text>
                    <Text style={styles.dataValue}>
                      {currentPitch ? `${Math.round(currentPitch.frequency)} Hz` : strings.home.noDataLabel}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          <TouchableOpacity 
            style={[styles.recordButton, isRecording && styles.recordingButton]} 
            onPress={toggleRecording}
          >
            <Text style={styles.recordButtonText}>
              {isRecording ? strings.home.stopButton : strings.home.recordButton}
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default HomeScreen;

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
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    fontFamily: 'monospace',
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    paddingRight: 40,
    flex: 1,
  },
  clearButton: {
    position: 'absolute',
    right: 12,
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
    marginBottom: 12,
  },
  loadButton: {
    backgroundColor: '#f3f4f6',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  loadButtonText: {
    fontFamily: 'monospace',
    color: '#374151',
    fontSize: 14,
    fontWeight: '600',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  recordButton: {
    backgroundColor: '#374151',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  recordButtonText: {
    fontFamily: 'monospace',
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  recordingButton: {
    backgroundColor: '#dc2626',
  },
  videoContainer: {
    marginTop: 20,
  },
  analysisContainer: {
    marginTop: 20,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  analysisRow: {
    marginBottom: 0,
  },
  analysisColumn: {
    flex: 1,
  },
  analysisLabel: {
    fontFamily: 'monospace',
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  dataRow: {
    flexDirection: 'row',
    gap: 16,
  },
  dataItem: {
    flex: 1,
  },
  dataLabel: {
    fontFamily: 'monospace',
    fontSize: 11,
    color: '#6b7280',
    marginBottom: 4,
  },
  dataValue: {
    fontFamily: 'monospace',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  divider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 12,
  },
});
