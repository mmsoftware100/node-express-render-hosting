## To run the application, execute the following commands in sequence

```Javascript
1. yarn install
2. yarn start
```

## Socket Integration

$("#iChart-bodyLabels-cnt").text();
var previousText = "";
function myFunction() {
    console.log("myFunction");
    let text = $("#iChart-bodyLabels-cnt").text();
    if(previousText != text){
        console.log("Text changed");
        console.log(text);
        previousText = text;
    }
    else{
        console.log("same text");
    }
}

setTimeout(myFunction, 1000)


