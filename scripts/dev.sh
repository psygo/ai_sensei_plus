#!/bin/bash

vite build --config vite.config.ts
printf "\n✓ 1. Built with Vite\n"

cp manifest.json dist/
echo "✓ 2. Copied Manifest"
