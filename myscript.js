<script>
var seltext = null;
 
chrome.extension.onRequest.addListener(function(request, sender, sendResponse)
{
    switch(request.message)
    {
        case 'setText':
            window.seltext = request.data
        break;
         
        default:
            sendResponse({data: 'Invalid arguments'});
        break;
    }
});
 
 
function savetext(info,tab)
{
    var jax = new XMLHttpRequest();
    jax.open("POST","http://localhost/text/");
    jax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    jax.send("text="+seltext);
    jax.onreadystatechange = function() { if(jax.readyState==4) { alert(jax.responseText);  }}
}
 
var contexts = ["selection"];
for (var i = 0; i < contexts.length; i++)
{
    var context = contexts[i];
    chrome.contextMenus.create({"title": "Send to Server", "contexts":[context], "onclick": savetext}); 
}
 
</script>
- See more at: http://vikku.info/programming/chrome-extension/get-selected-text-send-to-web-server-in-chrome-extension-communicate-between-content-script-and-background-page.htm#sthash.UrtEhU8e.dpuf
