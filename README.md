# React Chrome Extension Boilerplate

## Getting Started

1. `npm i` to install dependancies
2. `npm start` to start running the fast development mode Webpack build process that bundle files into the `dist` folder
3. `npm i --save-dev <package_name>` to install new packages

## Loading The Chrome Extension

1. Open Chrome and navigate to `chrome://extensions/`
2. Toggle on `Developer mode` in the top right corner
3. Click `Load unpacked`
4. Select the entire `dist` folder

# Important Initial Steps

1. `git init` to start a new git repo for tracking your changes, do an initial base commit with all the default files
2. Update `package.json`, important fields include `author`, `version`, `name` and `description`
3. Update `manifest.json`, important fields include `version`, `name` and `description`
4. Update `webpack.commmon.js`, the title in the `getHtmlPlugins` function should be your extension name

# Production Build

1. `npm run build` to generate a minimized production build in the `dist` folder
2. ZIP the entire `dist` folder (e.g. `dist.zip`)
3. Publish the ZIP file on the Chrome Web Store Developer Dashboard!

## Important Default Boilerplate Notes

- Folders get flattened, static references to images from HTML do not need to be relative (i.e. `icon.png` instead of `../static/icon.png`)
- Importing local ts/tsx/css files should be relative, since Webpack will build a dependancy graph using these paths
- Update the manifest file as per usual for chrome related permissions, references to files in here should also be flattened and not be relative

## Instructions
create a `chrome.tabs.query()` in popup, then create a listener in contentScript

- init setter and getter in storage.ts
- then in popup import the storage function and store it upon onSubmit
- then load it in contentScript to run the array

- Use this to wait for file to load
```
  function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
  }
```
then run
```
waitForElm('.some-class').then((elm) => {
    console.log('Element is ready');
    console.log(elm.textContent);
});
// or
const elm = await waitForElm('.some-class');
  
```

## Problems
- Unable to reload pages, cause will lose javascript
```
window.location.href = `https://www.tradingview.com/chart/nh4BJaqC/?symbol=${enteredSymbol}`;
```
- Unable to click on the symbols with the code
```
document.querySelector("div.wrap-G4AKrzja").click();
document.querySelector("div.wrap-G4AKrzja").firstChild.click();
document.querySelector("div.wrap-G4AKrzja").parentNode.click();

let targetButton = document.querySelector("div.wrap-G4AKrzja").firstChild;
let clickEvent = new MouseEvent('click');
targetButton.dispatchEvent(clickEvent);
```