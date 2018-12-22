## Nov 23, 2018

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

## Dec 8, 2018

### Getting a bookmark favicon

The Chrome Bookmark API doesn't return the bookmark favicon.  
I investigated a bit and it looks like the two most common ways to grab it right now are:

1. Use the `chrome://favicon/` API (e.g.: `chrome://favicon/twitter.com`) to get the favicon icon, or...
2. Use the `https://www.google.com/s2/favicons?domain=foobar.com` Google service.

Well, guess what, both services return the 16x16 favicon, which looks crappy nowadays.

Thanks to a StackOverflow comment though I was able to discover [faviconkit.com](https://faviconkit.com) which looks amazing: you can fetch up to 144x144px icons and it uses an aggressive caching strategy (both in the browser and on the CDN) so it's incredibly fast.  
The website says that the project is in "free beta" but given how well it performs I suspect it wont' stay free for long.

I still don't know why the Bookmark API doesn't return the 32x32 favicon used in the Chrome bookmarks management (I tried taking a quick look at the Chromium source but I wasn't able to find anything related to that).

## Dec 15, 2018

### Chrome API

I really like the the shape of the bookmark tree returned by the Chrome API.  
Since it's a tree it might look scary at first but once you get the pattern it just "click", and you can easily iterate trough it using recursion (see `./src/utils/parseBookmarkTree.ts` as an example).

Shoutout to the `@types/chrome` type-definitions: they are immensively helpful for exploring the Chrome APIs.

## Dec 22, 2018

### Styled-Components

Not much to say here, I added styled-components.  
Why styled-components instead of any other library? Well, it's an easy choice for me: it's one of the most used CSS in JS libraries and I like its API (especially in the latest versions).

### State management

Since I'm planning to add a few features that need to share a global state between different components I had (wanted) to pick a state management library.  
Initially I thought about just using the `Context` API, maybe in conjuntion with the `useReducer` hook, but since in [my last project](https://github.com/mmazzarolo/just-tap) I fell in love (again) with Redux + TypeScript (and a few other related libraries) I decided to use them here as well.  
The libraries I'm planning to use are:

- Redux
- Redux-Saga
- Typesafe-Actions
- Redux-React-Hook
- Immer

Yes, I know: so many libraries to handle the state when I could have go for MobX ot other smaller libraries...  
Well, there are a few reason why I really dig this setup:

- **Top-notch TypeScript integration.** Everything is type-checked, auto-importable and I feel like I can trust TypeScript to be able to catch even the more subtle error. The only margin of improvement that I can see is a better typing support for Redux-Saga.
- **Small boilerplate.** The boilerplate is way smaller than what you'd expect from a standard Redux setup: Typesafe-Actions allows you to define the actions in a simple way, while Immer takes care of the reducer complexities. And also...
- **Hooks.** Redux-React-Hook and a [small custom hook makes](./src/hooks/useMappedActions.ts) the connection between Redux and React components simple, clear and strongly typed.

The main drawback here (which might be a deal-braker for someone) is that you'll need to learn the API of 5 different libraries...

### Hide-show bookmarks

Added an option to show/hide bookmarks.  
Finding a way to handle the show/hide flow has been really interesting.  
My initial idea was adding an "Edit mode" that, once activated, allowed the user to hide/show the bookmarks and in the future rename/move them.  
After creating a stub of it and playing around though it seemed a bit too clunky for my use cases so I changed the pattern: I'm showing the "hide" options as a floating button that appears on a bookmark after hovering it.  
This also allowed me to experiment a bit with the hovering micro-interaction... since the option was showing up every time you hovered on a bookmark (which is a common action) I added a small delay before showing it, so it won't show up while you're moving between the bookmarks.  
The "hide/show" option icon is small enough to allow me to add another option in the future (if needed).  
I also took the chance to add a custom made persistence/rehydration logic (redux-persist seemed overkill, so I'm just using two small sagas for that) and a button to show/hide the hidden bookmarks.
