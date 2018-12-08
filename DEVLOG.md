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

### Getting a bookmark favicon

The Chrome Bookmark API doesn't return the bookmark favicon.  
I investigated a bit and it looks like the two most common ways to grab it right now are:

1. Use the `chrome://favicon/` API (e.g.: `chrome://favicon/twitter.com`) to get the favicon icon, or...
2. Use the `https://www.google.com/s2/favicons?domain=foobar.com` Google service.

Well, guess what, both services return the 16x16 favicon, which looks crappy nowadays.

Thanks to a StackOverflow comment though I was able to discover [faviconkit.com](https://faviconkit.com) which looks amazing: you can fetch up to 144x144px icons and it uses an aggressive caching strategy (both in the browser and on the CDN) so it's incredibly fast.  
The website says that the project is in "free beta" but given how well it performs I suspect it wont' stay free for long.

I still don't know why the Bookmark API doesn't return the 32x32 favicon used in the Chrome bookmarks management (I tried taking a quick look at the Chromium source but I wasn't able to find anything related to that).
