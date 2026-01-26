import { useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import strings from '../../constants/strings.json';

const LandingScreen: React.FC<{ onReady: () => void }> = ({ onReady }) => {
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      onReady();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.logo, { opacity: fadeAnim }]}>
        {strings.landing.title}
      </Animated.Text>
    </View>
  );
};

export default LandingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontFamily: 'monospace',
    fontSize: 48,
    fontWeight: 'bold',
    color: '#1f2937',
  },
});
