console.log('hello background page');
chrome.runtime.onInstalled.addListener(()=>{
    chrome.runtime.openOptionsPage();
});