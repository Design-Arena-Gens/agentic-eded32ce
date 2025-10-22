# AI Photo Caption & Email Agent

## Live Application
🚀 **Deployed at:** https://agentic-eded32ce.vercel.app

## Features
- Upload photos and provide text context
- AI generates compelling captions using GPT-4 Vision
- Automatic thumbnail generation (400x400)
- Email delivery with both thumbnail and original photo
- Beautiful, responsive UI built with Next.js and Tailwind CSS

## Setup Instructions

### Environment Variables Required
To make the AI agent fully functional, set these environment variables in Vercel:

1. Go to: https://vercel.com/arcada-agentic-models/agentic-eded32ce/settings/environment-variables

2. Add the following variables:
   - `OPENAI_API_KEY` - Your OpenAI API key (get from https://platform.openai.com/api-keys)
   - `SMTP_HOST` - SMTP server (e.g., smtp.gmail.com)
   - `SMTP_PORT` - SMTP port (e.g., 587)
   - `SMTP_USER` - Your email address
   - `SMTP_PASS` - Your email app password (for Gmail: https://myaccount.google.com/apppasswords)
   - `EMAIL_FROM` - Sender email address

3. After adding environment variables, redeploy the application

### Gmail Setup (Recommended)
For Gmail users:
1. Enable 2-factor authentication on your Google account
2. Generate an App Password: https://myaccount.google.com/apppasswords
3. Use the generated 16-character password as `SMTP_PASS`

### Local Development
```bash
npm install
cp .env.example .env.local
# Edit .env.local with your actual credentials
npm run dev
```

Visit http://localhost:3000

## How It Works
1. User uploads a photo and provides text context
2. Backend generates a thumbnail using Sharp
3. AI analyzes the image and context to create a caption
4. Email is sent with thumbnail, original photo, and caption
5. User receives confirmation on the web interface

## Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **AI:** OpenAI GPT-4 Vision API
- **Image Processing:** Sharp
- **Email:** Nodemailer
- **Deployment:** Vercel

## Security Notes
- Never commit .env files
- Use environment variables for all sensitive data
- Vercel automatically encrypts environment variables
- App passwords are more secure than regular passwords for SMTP
