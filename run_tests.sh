#!/usr/bin/env bash

npm install playwright@latest -- --quiet --install-deps
mv delta.spec.ts pom.ts tests
npx playwright test --headed

