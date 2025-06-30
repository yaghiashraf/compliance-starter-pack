# Compliance Starter Pack

A React-based web application that generates compliance documents (privacy policies, cookie banners, accessibility tools) for small businesses.

## Features

- 🛡️ Privacy Policy Generator
- 🍪 Cookie Banner & Management
- ♿ Accessibility Widget
- 📄 Professional PDF Generation
- 🌍 Multi-jurisdiction Support (GDPR, CCPA, etc.)
- 💳 Stripe Payment Integration ($6.99)
- 📱 Responsive Design

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **Animations**: Framer Motion
- **PDF Generation**: pdf-lib
- **File Handling**: JSZip + file-saver
- **Payments**: Stripe
- **Hosting**: Netlify

## Core Features

1.  **Simple Form**: Enter your business name, website URL, jurisdiction, and contact email.
2.  **Instant Generation**: On submission, the app generates four key files client-side:
    - `policy.html`: A combined Privacy Policy and Terms of Service.
    - `policy.pdf`: A PDF version of the policy document.
    - `cookie.js`: A lightweight, dependency-free cookie consent banner script.
    - `accessibility.js`: A vanilla JS accessibility widget for font resizing, high-contrast mode, and skip links.
    - `readme_install.html`: Clear instructions on how to embed these files into any website.
3.  **ZIP Download**: All generated files are bundled into a single `starter-pack.zip` for easy download.
4.  **Fully Offline**: Once the page is loaded, the entire generation process works offline. No data is ever sent to a server.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Environment Variables

Create a `.env` file:

```
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
```

## Deployment

This app is configured for Netlify deployment with automatic builds from GitHub.

## License

MIT License - Free for commercial use.
