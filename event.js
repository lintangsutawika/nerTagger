/*
*  Hover inspect extension for Chrome
*  https://github.com/NV0/hover-inspect
*/

// A generic onclick callback function.
function genericOnClick(info, tab) {
  console.log("item was clicked");
  // console.log("item " + info.menuItemId + " was clicked");
  // console.log("info: " + JSON.stringify(info));
  // console.log("tab: " + JSON.stringify(tab));
}

// Create one test item for each context type.
// var contexts = ["page","selection","link","editable","image","video",
//                 "audio"];
// for (var i = 0; i < contexts.length; i++) {
//   var context = contexts[i];
//   var title = "Test '" + context + "' menu item";
//   var id = chrome.contextMenus.create({"title": title, "contexts":[context],
//                                        "onclick": genericOnClick});
//   console.log("'" + context + "' item:" + id);
// }

// Create a parent item and two children.
// var parent = chrome.contextMenus.create({"title": "Test parent item"});
// var child1 = chrome.contextMenus.create(
//   {"title": "Child 1", "parentId": parent, "onclick": genericOnClick});
// var child2 = chrome.contextMenus.create(
//   {"title": "Child 2", "parentId": parent, "onclick": genericOnClick});
// console.log("parent:" + parent + " child1:" + child1 + " child2:" + child2);


(function() {

    var radio1 = chrome.contextMenus.create({"title": "Click This",
                                             // "type": "radio",
                                             "onclick":radioOnClick});

    var tabs = {};

    var inspect = {
        activate: function(id) {

            this.id = id;
            chrome.tabs.executeScript(this.id, {
                file: 'prism.js'
            });
            chrome.tabs.executeScript(this.id, {
                file: 'hoverinspect.js'
            }, function() {
                chrome.tabs.sendMessage(this.id, {
                    action: 'activate'
                });
            }.bind(this));

            chrome.browserAction.setIcon({
                tabId: this.id,
                path: {
                    19: "icon_active.png"
                }
            });

            chrome.tabs.sendMessage(this.id, {
                action: "activate"
            }, function(response) {
                console.log(response.farewell);
                });
        },

        deactivate: function() {

            chrome.tabs.sendMessage(this.id, {
                action: 'deactivate'
            },function(response) {
                console.log(response.farewell);
            });

            chrome.browserAction.setIcon({
                tabId: this.id,
                path: {
                    // 19: "icon.png"
                    19: "img/pencil.png"
                }
            });
        }

    };

    function toggle(tab) {

        if (!tabs[tab.id]) {
            tabs[tab.id] = Object.create(inspect);
            tabs[tab.id].activate(tab.id);
        
        } else {
            tabs[tab.id].deactivate();
            for (var tabId in tabs) {
                if (tabId == tab.id) delete tabs[tabId];
            }
        }
    }

    // Create some radio items.
    function radioOnClick(info, tab) {
        // tabs[tab.id] = Object.create(inspect);
        // tabs[tab.id].activate(tab.id);
        console.log("radio item " + info.menuItemId +
                    " was clicked (previous checked state was "  +
                    info.wasChecked + ")");
        // chrome.runtime.sendMessage(tab.id, {greeting: "hello"}, function(response) {
        //     console.log(response.farewell);
        // });
    }

    chrome.browserAction.onClicked.addListener(toggle);



    // chrome.runtime.onMessage.addListener(
    //  function(request, sender, sendResponse) {
    //      console.log(sender.tab ?
    //                 "from a content script:" + sender.tab.url :
    //                 "from the extension");
    //      console.log(request.caughtText);
        // if (request.caughtText == "hello")
            // sendResponse({farewell: "goodbye"});
    // });

})();
