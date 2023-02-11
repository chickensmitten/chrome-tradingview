// TODO: content script
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import {
  getStoredSymbols,
  getTempStoredSymbols,
  setTempStoredSymbols,
} from '../../utils/storage';
import './contentScript.css';

const root = document.createElement('div');
document.body.appendChild(root);

const App: React.FC<{}> = () => {
  function waitForElm(selector) {
    return new Promise((resolve) => {
      if (document.querySelector(selector)) {
        return resolve(document.querySelector(selector));
      }

      const observer = new MutationObserver((mutations) => {
        if (document.querySelector(selector)) {
          resolve(document.querySelector(selector));
          observer.disconnect();
        }
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });
    });
  }

  const handleMessages = async (request, sender, sendResponse) => {
    const symbols = await getTempStoredSymbols();
    console.log('Loading this page: ' + request.url);
    let url = request.url.split('?')[0] + `?symbol=${symbols[0]}`;
    if (symbols.length > 0 && request.url != url) {
      console.log('Going to: ' + url);
      return window.location.replace(url);
    }
    if (symbols.length > 0) {
      console.log('Running Dropdown');
      let dropdown = (await waitForElm(
        'div[data-name="save-load-menu"]'
      )) as HTMLElement;
      dropdown.click();

      console.log('Running MenuBar');
      let inner_menu = (await waitForElm(
        'div[data-name="menu-inner"]'
      )) as HTMLElement;
      const export_menu = inner_menu.childNodes[5] as HTMLElement;
      export_menu.click();

      console.log('Running ExportDialog');
      let export_dialog = (await waitForElm(
        'div[data-name="chart-export-dialog"]'
      )) as HTMLElement;
      const export_button = export_dialog.querySelector(
        'button[data-name="submit-button"]'
      ) as HTMLElement;
      export_button.click();
      console.log('Export Finished');

      symbols.shift();
      console.log('This is new set of symbols: ' + symbols);
      setTempStoredSymbols(symbols);
      if (symbols.length > 0) {
        let url = request.url.split('?')[0] + `?symbol=${symbols[0]}`;
        return window.location.replace(url);
      } else {
        console.log('All work done with data export, now removing files');
        const storedSymbols = await getStoredSymbols()
        const count = storedSymbols.length  

        // chrome.downloads.search({
        //   orderBy: ['-startTime'],
        //   limit: count
        // }, function (downloadedItems) {
        //   console.log(downloadedItems)
        //   for (var i =0; i < downloadedItems.length; i++){
        //     console.log('Removing File: ' + downloadedItems[i].filename);
        //     chrome.downloads.removeFile(downloadedItems[i].id)
        //   }
        // });
 
        return;
      }
    } else {
      console.log('There are no Symbols in temporary storage. All work done');
    }
    sendResponse({ farewell: 'goodbye' });
  };

  chrome.runtime.onMessage.addListener(handleMessages);

  return <></>;
};

ReactDOM.render(<App />, root);
