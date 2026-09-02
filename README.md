# Admish Portfolio

React + Vite + Tailwind CSS company portfolio site (Home, About, Services, Projects, Contact).

## Setup (Node.js required)

1. Install [Node.js](https://nodejs.org) (LTS version) if not already installed.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the dev server:

   ```bash
   npm run dev
   ```

4. Open the printed local URL (usually `http://localhost:5173`) in your browser.

## Build for production

```bash
npm run build
```

Output goes to the `dist/` folder — ready to deploy on Vercel, Netlify, or any static host.

## Customize

- Company details, text, projects: edit files in `src/components/`.
- Colors: `tailwind.config.js` (`brand` color palette).
- Contact info: `src/components/Contact.jsx`.
