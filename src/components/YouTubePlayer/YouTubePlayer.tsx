import { WebView } from 'react-native-webview';
import { StyleSheet, View } from 'react-native';

interface YouTubePlayerProps {
  url: string;
}

export default function YouTubePlayer({ url }: YouTubePlayerProps) {
  const getYouTubeEmbedUrl = (videoUrl: string): string => {
    const videoIdMatch = videoUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/);
    const videoId = videoIdMatch ? videoIdMatch[1] : '';
    return `https://www.youtube.com/embed/${videoId}?autoplay=0&playsinline=1`;
  };

  return (
    <View style={styles.container}>
      <WebView
        style={styles.webview}
        source={{ 
          uri: getYouTubeEmbedUrl(url),
          headers: {
            'Referer': 'https://melodious.app'
          }
        }}
        allowsFullscreenVideo={true}
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        originWhitelist={['*']}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 200,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  webview: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});

