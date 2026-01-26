import { useState, useEffect, useCallback } from 'react';
import PitchDetectionService, { PitchData } from '../services/audio/PitchDetectionService';

export const usePitchDetection = () => {
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [currentPitch, setCurrentPitch] = useState<PitchData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load model on mount
    const loadModel = async () => {
      try {
        await PitchDetectionService.loadModel();
        setIsModelLoaded(true);
      } catch (err) {
        setError('Failed to load pitch detection model');
        console.error(err);
      }
    };

    loadModel();

    // Cleanup on unmount
    return () => {
      PitchDetectionService.cleanup();
    };
  }, []);

  const detectPitch = useCallback(async (audioBuffer: Float32Array) => {
    if (!isModelLoaded) {
      console.warn('Model not loaded yet');
      return null;
    }

    try {
      const pitch = await PitchDetectionService.detectPitch(audioBuffer);
      setCurrentPitch(pitch);
      return pitch;
    } catch (err) {
      setError('Pitch detection failed');
      console.error(err);
      return null;
    }
  }, [isModelLoaded]);

  return {
    isModelLoaded,
    currentPitch,
    detectPitch,
    error,
  };
};
