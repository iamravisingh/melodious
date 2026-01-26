import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { LandingScreen } from './src/components/LandingScreen';
import { HomeScreen } from './src/components/HomeScreen';

const App: React.FC = () => {
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
};

export default App;
