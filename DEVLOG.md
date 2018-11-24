### Initial setup (Create React App + TypeScript)

Creating a Chrome Extension seems to be way easier than expected.

Just create the app:

```bash
npx create-react-app chrome-another-tab --typescript
```

Add the Chrome API TypeScript types:

```bash
cd chrome-anoter-tab && yarn add @types/chrome
```

And update `public/manifest.json` like you'll do for a standard Chrome extension.  
Make sure to set the correct Content Security Policy (see below).

P.S.: Install and use Prettier 👙

### Fixing the Content Security Policy issue

Latest versions of Chrome block inline scripts in Chrome extensions. Since Create React App 2 creates an inline script to run the app you might stumble upon an error message which is related to Content Security Policy (CSP) in the console.  
In the error message you will get a SHA value which can be added to the `manifest.json` file to solve the problem.

### Wrapping the Chrome APIs

The Chrome APIs use a callback-last convention so I'll promisify and wrap them in [`chromeService`](./src/services/chromeService.ts).

### Enabling the extension live reload

The development mode build of Create React App (created by `webpack-dev-server`) seems to be stored directly in memory.  
This means that to test our extension we have to always create a production build.  
As a workaround I'll mock a the result of the Chrome API with a few fixtures while in development.  
See [`chromeService`](./src/services/chromeService.ts).
