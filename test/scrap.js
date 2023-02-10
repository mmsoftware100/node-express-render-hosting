

function setLog(msg){
    $("#description").append("<li>" + msg + "</li>");
}

var previousText = "";
function myFunction() {
    let text = $("#iChart-bodyLabels-cnt").text();
    if(previousText != text){
        //setLog("Text changed");
        //setLog(text);
        previousText = text;
        setLog(previousText);
    }
    else{
        // setLog("same text");
    }
}
myFunction();

setInterval(myFunction, 1000);

/*
### console.log is disabled

var logger = function()
{
    var oldConsoleLog = null;
    var pub = {};

    pub.enableLogger =  function enableLogger() 
                        {
                            if(oldConsoleLog == null)
                                return;

                            window['console']['log'] = oldConsoleLog;
                        };

    pub.disableLogger = function disableLogger()
                        {
                            oldConsoleLog = console.log;
                            window['console']['log'] = function() {};
                        };

    return pub;
}();

console.log('hello');

        logger.disableLogger();
        console.log('hi', 'hiya');
        console.log('this wont show up in console');

        logger.enableLogger();
        console.log('This will show up!');

*/
