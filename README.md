# Rohit Parihar Portfolio

A clean and user-friendly single-page portfolio built from resume content.

## Run locally

### 1) Quick run (no API key required)

Open `index.html` directly in a browser.  
The chatbot works in local portfolio mode without any backend/API key.

### 2) Optional backend mode

If you later want OpenAI-powered responses, use backend mode.

### 3) Install dependencies

```powershell
npm install
```

### 4) Configure environment

Copy `.env.example` to `.env` and add your OpenAI API key:

```powershell
copy .env.example .env
```

Set `OPENAI_API_KEY` in `.env`.

### 5) Start app

```powershell
npm start
```

Open [http://localhost:3000](http://localhost:3000).

## Files

- `index.html` - page structure and content
- `styles.css` - layout and styling
- `script.js` - navigation, theme toggle, chatbot UI logic
- `server.js` - Express backend and OpenAI chatbot endpoint

## Resume download setup

Place your resume PDF at:

- `assets/Rohit_Parihar_Resume.pdf`

The **Download Resume** buttons in hero/contact will use this file.

## Deployment

### Vercel

1. Import this project in Vercel.
2. Framework preset: `Other`.
3. Deploy (uses `vercel.json` for SPA routing).

### Netlify

1. Import repository/site folder in Netlify.
2. Publish directory: project root (`.`).
3. Deploy (uses `netlify.toml` for SPA routing).

### GitHub Pages

1. Push project to GitHub.
2. Enable Pages from repository settings.
3. Select branch and root folder.
4. `.nojekyll` is included to avoid Jekyll processing.

## SEO notes

- Update `og:url` in `index.html` to your real deployed URL.
- Update JSON-LD `url` in `index.html` to the same URL.
