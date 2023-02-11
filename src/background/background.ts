import { setStoredSymbols, setTempStoredSymbols } from "../../utils/storage"

// TODO: background script
chrome.runtime.onInstalled.addListener(() => {
  // TODO: on installed function
  setStoredSymbols(["DJI", "VIX", "DXY"])
  setTempStoredSymbols([])
})

// function handleCreated(item) {
//   chrome.downloads.search({
//     orderBy: ['-startTime'],
//     limit: 1
//   }, function (downloadedItem) {
//     console.log("Downloaded" + downloadedItem[0].filename);
//     chrome.downloads.removeFile(downloadedItem[0].id)
//     // for (var i =0; i < downloadedItem.length; i++){
//     //   console.log('URL is: ' + downloadedItem[i].filename);
//     // }
//   }); 
// }

// chrome.downloads.onCreated.addListener(handleCreated);

chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
  if (changeInfo.status != 'complete') return;
  chrome.tabs.sendMessage(tabId, {url: tab.url});
})
