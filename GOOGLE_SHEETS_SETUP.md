# Google Sheets API Setup Guide

## Prerequisites
- Google Cloud Platform (GCP) account
- A Google Sheet where you want to store form submissions

## Step 1: Create a Google Sheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name the first sheet "Sheet1" (or update the range in the API route)
4. Add headers in row 1: `Name`, `Email`, `Phone`, `Model`
5. Copy the Sheet ID from the URL: `https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit`

## Step 2: Create a Service Account
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Select or create a project
3. Navigate to **IAM & Admin** > **Service Accounts**
4. Click **Create Service Account**
5. Fill in the details:
   - Service account name: `mhero-form-submission`
   - Service account ID: (auto-generated)
   - Description: `Service account for form submissions`
6. Click **Create and Continue**
7. Skip role assignment (click **Continue**)
8. Click **Done**

## Step 3: Create and Download Credentials
1. Click on the service account you just created
2. Go to the **Keys** tab
3. Click **Add Key** > **Create new key**
4. Select **JSON** format
5. Click **Create** (this downloads the JSON file)

## Step 4: Enable Google Sheets API
1. Go to **APIs & Services** > **Library**
2. Search for "Google Sheets API"
3. Click on it and click **Enable**

## Step 5: Share Sheet with Service Account
1. Open your Google Sheet
2. Click **Share** button
3. Add the service account email (found in the JSON file as `client_email`)
4. Give it **Editor** permissions
5. Click **Send**

## Step 6: Configure Environment Variables
1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Open `.env.local` and update:
   - `GOOGLE_SERVICE_ACCOUNT_CREDENTIALS`: Paste the entire JSON content from the downloaded file as a single-line string (escape quotes properly)
   - `GOOGLE_SHEET_ID`: Paste your Sheet ID from Step 1

### Example `.env.local`:
```env
GOOGLE_SERVICE_ACCOUNT_CREDENTIALS={"type":"service_account","project_id":"my-project","private_key_id":"abc123","private_key":"-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n","client_email":"mhero-form@my-project.iam.gserviceaccount.com","client_id":"123456789","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"https://www.googleapis.com/robot/v1/metadata/x509/mhero-form%40my-project.iam.gserviceaccount.com"}

GOOGLE_SHEET_ID=1a2b3c4d5e6f7g8h9i0j
```

**Important**: The JSON must be on a single line with escaped quotes. You can use this command to convert the JSON file:
```bash
cat your-credentials.json | jq -c | sed 's/"/\\"/g'
```

## Step 7: Test the Integration
1. Start the development server:
   ```bash
   pnpm dev
   ```
2. Fill out the form and submit
3. Check your Google Sheet - the data should appear automatically

## Troubleshooting

### Error: "Missing Google Sheets configuration"
- Make sure `.env.local` exists and contains both variables
- Restart your development server after creating/updating `.env.local`

### Error: "Invalid credentials format"
- Ensure the JSON is properly escaped and on a single line
- Check that all quotes are escaped with backslashes

### Error: "The caller does not have permission"
- Make sure you've shared the Google Sheet with the service account email
- Verify the service account has Editor permissions

### Data not appearing in sheet
- Check that the sheet name matches "Sheet1" (or update the range in `src/app/api/submit/route.ts`)
- Verify the headers are in row 1: Name, Email, Phone, Model
- Check the browser console and server logs for errors
