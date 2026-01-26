// Western to Indian Classical Music notation mapping
// Standard chromatic scale mappings (C=Sa as reference)

export type NotationSystem = 'western' | 'indian';

export interface NoteMapping {
  western: string;
  indian: string;
  sargam: string;
}

// Sargam: Sa Re Ga Ma Pa Dha Ni
// Komal (flat): re, ga, dha, ni (lowercase in transliteration)
// Shuddha (natural): Re, Ga, Ma, Pa, Dha, Ni
// Tivra (sharp): Ma' (only Ma has tivra variant)

export const NOTE_MAPPINGS: NoteMapping[] = [
  { western: 'C', indian: 'Sa', sargam: 'स' },
  { western: 'C#', indian: 'Re komal', sargam: 'रे॒' },
  { western: 'D', indian: 'Re', sargam: 'रे' },
  { western: 'D#', indian: 'Ga komal', sargam: 'ग॒' },
  { western: 'E', indian: 'Ga', sargam: 'ग' },
  { western: 'F', indian: 'Ma', sargam: 'म' },
  { western: 'F#', indian: 'Ma tivra', sargam: 'म॑' },
  { western: 'G', indian: 'Pa', sargam: 'प' },
  { western: 'G#', indian: 'Dha komal', sargam: 'ध॒' },
  { western: 'A', indian: 'Dha', sargam: 'ध' },
  { western: 'A#', indian: 'Ni komal', sargam: 'नि॒' },
  { western: 'B', indian: 'Ni', sargam: 'नि' },
];

// Common Ragas and their scale patterns
export interface RagaPattern {
  name: string;
  aroha: string[]; // Ascending scale
  avaroha: string[]; // Descending scale
  vadi: string; // Most important note
  samvadi: string; // Second most important note
  time: string; // Time of day
}

export const COMMON_RAGAS: RagaPattern[] = [
  {
    name: 'Yaman',
    aroha: ['Sa', 'Re', 'Ga', 'Ma tivra', 'Pa', 'Dha', 'Ni'],
    avaroha: ['Ni', 'Dha', 'Pa', 'Ma tivra', 'Ga', 'Re', 'Sa'],
    vadi: 'Ga',
    samvadi: 'Ni',
    time: 'Evening (6-9 PM)',
  },
  {
    name: 'Bhairav',
    aroha: ['Sa', 'Re komal', 'Ga', 'Ma', 'Pa', 'Dha komal', 'Ni'],
    avaroha: ['Ni', 'Dha komal', 'Pa', 'Ma', 'Ga', 'Re komal', 'Sa'],
    vadi: 'Dha komal',
    samvadi: 'Re komal',
    time: 'Morning (6-9 AM)',
  },
  {
    name: 'Bhupali',
    aroha: ['Sa', 'Re', 'Ga', 'Pa', 'Dha'],
    avaroha: ['Dha', 'Pa', 'Ga', 'Re', 'Sa'],
    vadi: 'Ga',
    samvadi: 'Dha',
    time: 'Evening (6-9 PM)',
  },
];

export class IndianNotationService {
  static westernToIndian(westernNote: string): string {
    const mapping = NOTE_MAPPINGS.find(m => m.western === westernNote);
    return mapping?.indian || westernNote;
  }

  static westernToSargam(westernNote: string): string {
    const mapping = NOTE_MAPPINGS.find(m => m.western === westernNote);
    return mapping?.sargam || westernNote;
  }

  static getNotation(westernNote: string, system: NotationSystem): string {
    if (system === 'western') return westernNote;
    return this.westernToIndian(westernNote);
  }

  static detectPossibleRagas(notes: string[]): RagaPattern[] {
    // Simple raga detection based on note patterns
    return COMMON_RAGAS.filter(raga => {
      const ragaNotes = [...new Set([...raga.aroha, ...raga.avaroha])];
      return notes.every(note => ragaNotes.includes(note));
    });
  }
}

export default IndianNotationService;
