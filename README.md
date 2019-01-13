&nbsp;

# Another Tab - Chrome Extension <img src="./.github/logo.svg" width="40" align="left">

An open source Chrome extension that shows your bookmarks when you open a new tab.  
Built with Create React App and TypeScript.

&nbsp;

<p align="center" margin-bottom="0">
  <a href="https://github.com/mmazzarolo/chrome-another-tab" target="_blank">
    <img alt="Another Tab" width="auto" height="auto" src="./.github/2019-01-13-screenshot-dark.png">
  </a>
</p>

<p align="center">
  <a href="https://chrome.google.com/webstore/detail/oaaeanlgefipegfcbgpgnhhnpengdjld">
    <img alt="Another Tab" width="auto" height="32" src="./.github/chrome-web-store-icon.png">
    Download Another Tab from the Chrome Web Store
  </a>
</p>
<p align="center">
  <a href="https://mmazzarolo.github.io/chrome-another-tab/">
    ...or try it live!
  </a>
</p>


## Overview

I initially built this extension just for personal use and for trying building a Chrome extension, so it has just the feature that I need for now...  
PRs are welcome!  
[Check the DEVLOG to see the history of the project](./DEVLOG.md).

### Features

- Shows your bookmarks in the new tab page
- Bookmarks filtering/search
- Keyboard navigation support
- Bookmark folders visibility toggle
- Themes support

### Stack

- React (using Create React App) and hooks
- TypeScript
- Styled-Components
- Redux, Redux-Saga and Typesafe-Actions

## Contributing

### Feature request

I already created a few [issues](https://github.com/mmazzarolo/chrome-another-tab/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc) with some features that I feel like would be really welcomed addition, and I'm open to any other additional suggestion... especially if you already have an idea to implement it's UI/UX.  

### Developing locally

This is a standard Create React App, so you can easily start working on it by simply cloning the project and running `yarn` to install all its dependencies.   
To develop the app locally you can run `yarn start`, I already included some fake bookmarks to simulate the production behaviour of the extension.  

### Development tips

This app uses TypeScript, React Hooks, Redux and Styled-Components, so you might need to be confortable with these technologies to completely understand the codebase.  
The app is still pretty simple, doesn't have too many components and most of the logic is just in the Chrome Bookmarks parsing and in the Redux sagas.  
If you feel intimidated by the codebase **please just open an issue/send a PR**, I'm open to discussion and tips.  
Also, if you're not confortable with hooks feel free to use class components.

### Chrome Web Store deployment

I setup a [semi-automated Chrome Web Store deployment using CircleCI](./circleci/config.yml).     
It currently runs only when the `production` branch receives a new push, but I still haven't automated the version number bumping (so I still have to do it manually).  
It would be great making the publishing step manipulate the `manifest.json` so that it reflects the `package.json` version and/or a git tag.  

### Live example deployment

The "live example" is just a customized version of the production build of the app deployed on GitHub Pages. 
If you check the `gh-pages` script in the `package.json` you'll see that I'm setting a `REACT_APP_IS_LIVE_EXAMPLE` environment variable before running the GitHub Pages deployment: this will allow the build to use the fake bookmarks instead of trying to get them from the Chrome API (like if it was an extension running in the browser).   

### GitHub organization?

If the app starts getting contributions I'll gladly create a new ad-hoc organization for it, instead of keeping it in my personal profile.  

