# Netlify Deployment Instructions

## Quick Fix for 404 Errors

Your BMI Calculator app has been configured to work with Netlify deployments. The 404 errors you encountered were due to missing deployment configuration for React Router SPA (Single Page Application).

## What Was Fixed

1. **Added `homepage` field to package.json** - Ensures the app works from any domain
2. **Created proper `_redirects` file** - Routes all requests to index.html for client-side routing
3. **Fixed hardcoded URLs in index.html** - Made SEO tags domain-agnostic
4. **Configured netlify.toml** - Proper build and deployment settings

## Deployment Options

### Option 1: Auto-Deploy from Git (Recommended)
1. Connect your repository to Netlify
2. Netlify will automatically use the `netlify.toml` configuration
3. Build settings are already configured in the file

### Option 2: Manual Deploy from Local Build
1. Run the build locally:
   ```bash
   cd frontend
   yarn install
   yarn build
   ```
2. Drag and drop the `frontend/build` folder to Netlify deploy area

### Option 3: Netlify CLI Deploy
1. Install Netlify CLI: `npm install -g netlify-cli`
2. Build the project: `cd frontend && yarn build`
3. Deploy: `netlify deploy --prod --dir=frontend/build`

## Configuration Files

- **`/netlify.toml`** - Main deployment configuration
- **`/frontend/public/_redirects`** - SPA routing rules (copied to build)
- **`/frontend/package.json`** - Contains `homepage: "."` for correct base URL

## Expected Build Settings

If configuring manually in Netlify dashboard:
- **Build Command:** `yarn install && yarn build`
- **Publish Directory:** `build` (relative to base directory)
- **Base Directory:** `frontend`
- **Node.js Version:** `20` (required for react-router-dom v7+)

## Verification

After deployment, test these routes to ensure they work:
- `/` (home page)
- `/history`
- `/goals`
- `/privacy-policy`
- `/terms-of-service`
- `/contact`

All routes should load without 404 errors and show the correct page content. The React Router will handle navigation client-side.

## Troubleshooting

### If you still see 404 errors:
1. Check that the `_redirects` file exists in your deployed build
2. Verify the build directory structure matches expectations
3. Ensure the build command completed successfully in Netlify logs

### If build fails with Node.js version errors:
- The `netlify.toml` specifies Node.js v20 (required for React Router v7+)
- If you see compatibility errors, the Node version should automatically be used
- Verify in build logs that Node v20+ is being used

### If build fails with dependency errors:
1. Check that `yarn.lock` file is committed to your repository
2. Ensure all dependencies are compatible with Node.js v20
3. Clear Netlify cache and retry deploy

### Common Build Issues:
- **"No build steps found"** → Ensure `netlify.toml` is in repository root
- **"react-router-dom incompatible"** → Node.js version must be 20+
- **"404 on routes"** → Ensure `_redirects` file is included in build output

Contact support if issues persist after following these steps.