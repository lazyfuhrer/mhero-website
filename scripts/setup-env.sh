#!/bin/bash

# Helper script to convert Google Service Account JSON to .env.local format

if [ "$#" -ne 2 ]; then
    echo "Usage: ./scripts/setup-env.sh <path-to-credentials.json> <google-sheet-id>"
    echo "Example: ./scripts/setup-env.sh ~/Downloads/mhero-credentials.json 1a2b3c4d5e6f7g8h9i0j"
    exit 1
fi

CREDENTIALS_FILE=$1
SHEET_ID=$2

if [ ! -f "$CREDENTIALS_FILE" ]; then
    echo "Error: Credentials file not found: $CREDENTIALS_FILE"
    exit 1
fi

# Check if jq is installed
if ! command -v jq &> /dev/null; then
    echo "Error: jq is required but not installed."
    echo "Install it with: sudo apt-get install jq (Linux) or brew install jq (Mac)"
    exit 1
fi

# Convert JSON to single-line escaped string
CREDENTIALS=$(cat "$CREDENTIALS_FILE" | jq -c . | sed 's/"/\\"/g')

# Create .env.local file
cat > .env.local << EOF
# Google Sheets API Configuration
# Generated on $(date)

GOOGLE_SERVICE_ACCOUNT_CREDENTIALS=$CREDENTIALS
GOOGLE_SHEET_ID=$SHEET_ID
EOF

echo "✓ Created .env.local file successfully!"
echo ""
echo "Next steps:"
echo "1. Make sure your Google Sheet is shared with the service account email"
echo "2. Restart your development server: pnpm dev"
echo "3. Test the form submission"
