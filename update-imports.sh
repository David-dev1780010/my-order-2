#!/bin/bash
find src -type f -name "*.tsx" -exec sed -i '' 's/@\/lib\/utils/@\/utils/g' {} + 