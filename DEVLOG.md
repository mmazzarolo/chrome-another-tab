# DevLog

### Fixing the Content Security Policy issue

Latest versions of Chrome block inline scripts in Chrome extensions. Since create-react-app build in version 2 creates an inline script to run the app you might stumble upon an error message which is related to Content Security Policy (CSP) in the console. In the error message you will get a sha value which can be added to the manifest.json file to solve the problem.

### Enabling live reloading the extension

The development mode build seems to be loaded directly in memory. This means that to test our extension we have to always create a production build.
