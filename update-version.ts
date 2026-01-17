#!/usr/bin/env bun

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const packageJsonPath = join(process.cwd(), 'package.json');
const appJsonPath = join(process.cwd(), 'app.json');

const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
const version = packageJson.version;

// Update app.json with new version
const appJson = JSON.parse(readFileSync(appJsonPath, 'utf-8'));
appJson.expo.version = version;

writeFileSync(appJsonPath, JSON.stringify(appJson, null, 2) + '\n');

console.log(`Updated app version to ${version}`);
