function sendMessage(url_link){
        chrome.extension.sendMessage({
        action: "openNewTab",
        url: url_link
        // url: "toTag.html"
    });
}

function exportToFile(myString) {
    // var myString = "Lorem ipsum.";
    window.open('data:text/csv;charset=utf-8,' + escape(myString));
}

document.addEventListener('DOMContentLoaded', function() {
  var link = document.getElementById('urlbutton1');

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

// document.addEventListener('DOMContentLoaded', function() {
//   var link = document.getElementById('urlbutton2');
  
//   //Access data
//   chrome.storage.local.get("text", function(string){
//     // alert("Got it");
//     var textString = string.text; 
//     // console.log(textString)
//     //Event when tag button is clicked
//       link.addEventListener('click', function() {
//         exportToFile(textString);
//      });           
//   });
// });

document.addEventListener('DOMContentLoaded', function() {
  var link = document.getElementById('urlbutton4');
  chrome.storage.local.set(
            {'tagName1': "NULL",'tagLabel1':"NULL",
              'tagName2': "NULL",'tagLabel2':"NULL",
              'tagName3': "NULL",'tagLabel3':"NULL"}, function(){
            // alert("Success");
        });
  link.addEventListener('click', function() {
    var tagName1_ = encodeURIComponent(document.getElementById('tagName1').value);
    var tagLabel1_ = encodeURIComponent(document.getElementById('tagLabel1').value);
    var tagName2_ = encodeURIComponent(document.getElementById('tagName2').value);
    var tagLabel2_ = encodeURIComponent(document.getElementById('tagLabel2').value);
    var tagName3_ = encodeURIComponent(document.getElementById('tagName3').value);
    var tagLabel3_ = encodeURIComponent(document.getElementById('tagLabel3').value);
    // console.log(tagName1_);
    chrome.storage.local.set(
        {'tagName1': tagName1_, 'tagLabel1':tagLabel1_,
        'tagName2': tagName2_, 'tagLabel2':tagLabel2_,
        'tagName3': tagName3_, 'tagLabel3':tagLabel3_}, function(){
            // alert("Success");
      });
    });  
  
  
});

chrome.tabs.executeScript( {
    code: "window.getSelection().toString();"
    },  
    function(selection) {
        document.getElementById("output").innerHTML = selection[0];
        chrome.storage.local.set({'text': selection[0]}, function(){
            // alert("Success");
        });

          var link = document.getElementById('urlbutton2');
          link.addEventListener('click', function() {
          exportToFile(selection[0]);
       });
     });

