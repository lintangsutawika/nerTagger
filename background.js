chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse)
    { 
        if (request.action == "openNewTab")
            chrome.tabs.create({ url: request.url });
    }
);

