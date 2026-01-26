import { loadTensorflowModel } from "react-native-fast-tflite";
import IndianNotationService, { NotationSystem } from "./IndianNotationService";

export interface PitchData {
  frequency: number; // Hz
  note: string; // e.g., "C4", "A#3"
  indianNote?: string; // e.g., "Sa", "Re komal"
  sargam?: string; // e.g., "स", "रे॒"
  confidence: number; // 0-1
}

class PitchDetectionService {
  private model: any = null;
  private isLoaded = false;
  private notationSystem: NotationSystem = "western";

  setNotationSystem(system: NotationSystem): void {
    this.notationSystem = system;
  }

  async loadModel(): Promise<void> {
    if (this.isLoaded) return;

    try {
      console.log("Loading SPICE model...");
      // Use require() for bundled assets
      this.model = await loadTensorflowModel(
        require('../../../assets/models/spice.tflite')
      );
      this.isLoaded = true;
      console.log("Model loaded successfully");
    } catch (error) {
      console.error("Failed to load model:", error);
      throw error;
    }
  }

  async detectPitch(audioBuffer: Float32Array): Promise<PitchData | null> {
    if (!this.isLoaded || !this.model) {
      throw new Error("Model not loaded");
    }

    try {
      // TODO: Run inference with SPICE model
      // const output = await this.model.run(audioBuffer);
      // const frequency = this.extractFrequency(output);

      // Placeholder: return mock data
      const frequency = 440; // A4
      const westernNote = this.frequencyToNote(frequency);
      const indianNote = IndianNotationService.westernToIndian(
        westernNote.replace(/\d+$/, ""),
      );
      const sargam = IndianNotationService.westernToSargam(
        westernNote.replace(/\d+$/, ""),
      );

      return {
        frequency,
        note: westernNote,
        indianNote,
        sargam,
        confidence: 0.95,
      };
    } catch (error) {
      console.error("Pitch detection failed >>>>>>>", error);
      return null;
    }
  }

  private frequencyToNote(frequency: number): string {
    const noteNames = [
      "C",
      "C#",
      "D",
      "D#",
      "E",
      "F",
      "F#",
      "G",
      "G#",
      "A",
      "A#",
      "B",
    ];
    const a4 = 440;
    const c0 = a4 * Math.pow(2, -4.75);

    if (frequency === 0) return "—";

    const halfSteps = 12 * Math.log2(frequency / c0);
    const octave = Math.floor(halfSteps / 12);
    const noteIndex = Math.round(halfSteps % 12);

    return `${noteNames[noteIndex]}${octave}`;
  }

  cleanup(): void {
    this.model = null;
    this.isLoaded = false;
  }
}

export default new PitchDetectionService();
