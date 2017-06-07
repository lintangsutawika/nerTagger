// chrome.extension.onRequest.addListener(onRequest);

function emptyElement(element) {
    var myNode = element;
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
}

chrome.storage.local.get("text", function(string){
    // alert("Got it");
    var textString = string.text; 
    console.log(textString)

    emptyElement(document.body)

    var injectable = document.createElement('div');
    injectable.innerHTML = textString;
    injectable.classList.add("editable");
    document.body.append(injectable);

    // document.body.insertBefore (injectable, document.body.firstChild);
    // var injectable  = document.createElement ("iframe");
    // injectable.src  = chrome.extension.getURL ("Embedded_Hello_world.htm");
    // document.body.insertBefore (injectable, document.body.firstChild);

    // var elements = document.querySelectorAll('*'),
    // editor = new MediumEditor(elements);
    var elements = document.querySelectorAll('.editable'),
    editor = new MediumEditor(elements, {
        toolbar: {
          buttons: ['tag1', 'tag2', 'tag3', 'tag4', 'tag5', 'tag6']
        },
        extensions: {
            // 'tag1':  new MediumButton({label:'PER', start:'&lt;', end:'&gt;'}),
            'tag1':  new MediumButton({label:'PER', start:'&lt;ENAMEX TYPE=\"PERSON\"&gt;', end:'&lt;/ENAMEX&gt;'}),
            'tag2':  new MediumButton({label:'LOC', start:'&lt;ENAMEX TYPE=\"LOCATION\"&gt;', end:'&lt;/ENAMEX&gt;'}),
            'tag3':  new MediumButton({label:'ORG', start:'&lt;ENAMEX TYPE=\"ORGANIZATION\"&gt;', end:'&lt;/ENAMEX&gt;'}),
            'tag4':  new MediumButton({label:'BRD', start:'&lt;ENAMEX TYPE=\"BRAND\"&gt;', end:'&lt;/ENAMEX&gt;'}),
            'tag5':  new MediumButton({label:'TYP', start:'&lt;ENAMEX TYPE=\"TYPE\"&gt;', end:'&lt;/ENAMEX&gt;'}),
            'tag6':  new MediumButton({label:'LVL', start:'&lt;ENAMEX TYPE=\"LEVEL\"&gt';, end:'&lt;/ENAMEX&gt;'}),
        }
    })
});


