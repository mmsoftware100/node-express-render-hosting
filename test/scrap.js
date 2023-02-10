
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

setTimeout(myFunction, 1000);