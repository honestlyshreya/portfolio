#!/bin/bash
mkdir -p dist
cp index.html dist/
cp styles.css dist/
cp script.js dist/
cp -r public dist/ 2>/dev/null || true
echo "Build completed successfully!"
