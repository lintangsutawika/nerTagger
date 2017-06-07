function sendMessage(url_link){
        chrome.extension.sendMessage({
        action: "openNewTab",
        url: url_link
        // url: "test.html"
    });
}

function exportToFile(myString) {
    // var myString = "Lorem ipsum.";
    window.open('data:text/csv;charset=utf-8,' + escape(myString));
}

document.addEventListener('DOMContentLoaded', function() {
  var link = document.getElementById('urlbutton1');
  
  //Access data
  chrome.storage.local.get("text", function(string){
    // alert("Got it");
    var textString = "<p>"+string.text+"</p>"; 
    console.log(textString)

    //Create editable class
    var injectable = document.createElement('div');
    injectable.innerHTML = textString;
    injectable.classList.add("editable");
    injectable.src = chrome.extension.getURL('toTag.html');
    // injectable.src = "toTag.html";
    document.getElementById('output').append(injectable);

    //Event when tag button is clicked
      link.addEventListener('click', function() {
        var tab = ""
        chrome.tabs.query({
          active: true,
          lastFocusedWindow: true
        }, function(tabs) {      
            // and use that tab to fill in out title and url
            tab = tabs[0];
            console.log(tab.url);
            sendMessage(tab.url);
        });
     });           
  });
});

document.addEventListener('DOMContentLoaded', function() {
  var link = document.getElementById('urlbutton2');
  
  //Access data
  chrome.storage.local.get("text", function(string){
    // alert("Got it");
    var textString = "<p>"+string.text+"</p>"; 
    console.log(textString)

    //Event when tag button is clicked
      link.addEventListener('click', function() {
        exportToFile(textString);
     });           
  });
});

chrome.tabs.executeScript( {
    code: "window.getSelection().toString();"
    },  
    function(selection) {
        document.getElementById("output").innerHTML = selection[0];
        chrome.storage.local.set({'text': selection[0]}, function(){
            // alert("Success")
        });
     });

