#!/usr/bin/env bash

npm init playwright@latest -- --quiet --install-deps
rm tests/example.spec.ts
mv delta.spec.ts pom.ts tests
npx playwright test --headed

