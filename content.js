function emptyElement(element) {
    var myNode = element;
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
}

// chrome.storage.local.get("text", function(string){
//     var tagName = string
// });

chrome.storage.local.get(
    ["text", 
    "tagName1", "tagLabel1",
    "tagName2", "tagLabel2",
    "tagName3", "tagLabel3",], 
    function(string){
        // alert("Got it");
        var textString = string.text; 
        var tagName1 = string.tagName1; var tagLabel1 = string.tagLabel1;
        var tagName2 = string.tagName2; var tagLabel2 = string.tagLabel2;
        var tagName3 = string.tagName3; var tagLabel3 = string.tagLabel3;
        
        emptyElement(document.body);

        var injectable = document.createElement('div');
        injectable.innerHTML = textString;
        injectable.classList.add("editable");
        document.body.append(injectable);

        var elements = document.querySelectorAll('.editable');
        // editor = new MediumEditor(elements);
        editor = new MediumEditor(elements, {
            toolbar: {
              buttons: ['tag1', 'tag2', 'tag3', 'tag4', 'tag5', 'tag6']
            },
            extensions: {
        //         // 'tag1':  new MediumButton({label:'PER', start:'&lt;', end:'&gt;'}),
                'tag1':  new MediumButton({label:'PER', start:'&lt;ENAMEX TYPE=\"PERSON\"&gt;', end:'&lt;/ENAMEX&gt;'}),
                'tag2':  new MediumButton({label:'LOC', start:'&lt;ENAMEX TYPE=\"LOCATION\"&gt;', end:'&lt;/ENAMEX&gt;'}),
                'tag3':  new MediumButton({label:'ORG', start:'&lt;ENAMEX TYPE=\"ORGANIZATION\"&gt;', end:'&lt;/ENAMEX&gt;'}),
                'tag4':  new MediumButton({label:tagLabel1, start:'&lt;ENAMEX TYPE=\"'+tagName1+'\"&gt;', end:'&lt;/ENAMEX&gt;'}),
                'tag5':  new MediumButton({label:tagLabel2, start:'&lt;ENAMEX TYPE=\"'+tagName2+'\"&gt;', end:'&lt;/ENAMEX&gt;'}),
                'tag6':  new MediumButton({label:tagLabel3, start:'&lt;ENAMEX TYPE=\"'+tagName3+'\"&gt;', end:'&lt;/ENAMEX&gt;'}),
            }
    });
});



