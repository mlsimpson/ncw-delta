#!/usr/bin/env bash

npm install playwright@latest -- --quiet --install-deps
mv *.ts tests
npx playwright test --headed

