# Contributing to Melodious

Thanks for your interest in contributing! This guide will help you get started.

## Getting Started

1. **Fork the repository**
2. **Clone your fork**
   ```bash
   git clone https://github.com/iamravisingh/melodious
   cd melodious
   ```
3. **Install dependencies**
   ```bash
   bun install
   ```
4. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Workflow

### Running the App

```bash
# Start Expo dev server
bun start

# Run on iOS
bun run ios

# Run on Android
bun run android
```

### Code Style

- Use TypeScript for all new files
- Follow existing code formatting
- Keep components minimal and focused
- Add types for all props and functions

### Commit Messages

Use clear, descriptive commit messages:
```
feat: add YouTube player component
fix: resolve audio recording issue
docs: update setup instructions
```

## Pull Request Process

1. **Update your branch** with the latest main
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```
2. **Test your changes** on iOS/Android
3. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```
4. **Open a Pull Request** with:
   - Clear description of changes
   - Screenshots/videos if UI changes
   - Reference any related issues

## Project Structure

```
melodious/
├── App.tsx           # Main app entry
├── screens/          # Screen components
├── components/       # Reusable components
├── utils/            # Helper functions
└── assets/           # Images, fonts, etc.
```

## Reporting Issues

- Check existing issues first
- Provide clear reproduction steps
- Include device/OS information
- Add screenshots if relevant

## Questions?

Open an issue with the `question` label or reach out to maintainers.

## License

By contributing, you agree your contributions will be licensed under the project's license.
