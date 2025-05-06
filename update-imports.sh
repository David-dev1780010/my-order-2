#!/bin/bash
find src -type f \( -name "*.tsx" -o -name "*.ts" \) -print0 | xargs -0 sed -i '' 's/@\/lib\/utils/@\/utils/g' 