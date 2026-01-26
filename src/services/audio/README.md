# ML Model Setup

ML models are **not committed to git** due to size (~40MB).

## Model Download Strategy

Models are downloaded on first app launch and cached locally.

### SPICE (Pitch Detection)
- **Source**: TensorFlow Hub
- **URL**: https://tfhub.dev/google/lite-model/spice/1
- **Size**: ~40MB
- **Cache location**: Device FileSystem

## For Development

To test locally, manually download and place in `assets/models/spice.tflite`:

```bash
# Download SPICE model
curl -L -o assets/models/spice.tflite \
  https://tfhub.dev/google/lite-model/spice/1?lite-format=tflite

# Or use wget
wget -O assets/models/spice.tflite \
  https://tfhub.dev/google/lite-model/spice/1?lite-format=tflite
```

## .gitignore

Add to `.gitignore`:
```
assets/models/*.tflite
```

## Current Status

- ✅ Service layer architecture implemented
- ✅ Audio recording hook ready
- ✅ Pitch detection hook ready
- ⏳ SPICE model integration (pending model file)
- ⏳ Real-time audio processing
