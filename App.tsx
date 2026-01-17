import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { LandingScreen } from './src/components/LandingScreen';
import { HomeScreen } from './src/components/HomeScreen';

export default function App() {
  const [isReady, setIsReady] = useState(false);

  if (!isReady) {
    return <LandingScreen onReady={() => setIsReady(true)} />;
  }

  return (
    <>
      <HomeScreen />
      <StatusBar style="dark" />
    </>
  );
}
