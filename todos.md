# MigraDate App - Running & Deployment Guide

## Running Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (v14 or newer)
- npm (comes with Node.js)

### Running the App
1. Navigate to the app directory:
```bash
cd app
```

2. Start the development server:
```bash
npm start
```

3. View the app in your browser:
- The app will automatically open at `http://localhost:3000`
- You can also manually navigate to this URL in your browser

4. Using the app:
- Swipe right (or click the heart) for things you like
- Swipe left (or click the X) for things you don't like
- The cards will animate as you interact with them
- When you've gone through all cards, you can restart

## Deployment Options

Once your app is ready, you can deploy it to make it accessible online.

### GitHub Pages

1. Install gh-pages package:
```bash
cd app
npm install --save gh-pages
```

2. Add these lines to your `package.json` in the app directory:
```json
"homepage": "https://yourusername.github.io/migradate",
"scripts": {
  // other scripts...
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
```

3. Deploy:
```bash
npm run deploy
```

### Netlify

1. Create a production build:
```bash
cd app
npm run build
```

2. Deploy using Netlify's web interface:
   - Sign up/login to [Netlify](https://www.netlify.com/)
   - Drag and drop your `build` folder to Netlify's web interface
   - Or connect your GitHub repository for continuous deployment

### Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Navigate to the app directory and deploy:
```bash
cd app
vercel
```

Follow the prompts to complete the deployment.

---

For additional support or questions, please open an issue on the GitHub repository or contact the development team.