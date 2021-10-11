
// Getting the web client's size
// GetSize()[0] -> Width
// GetSize()[1] -> Height
function GetSize()
{
    var R = [0, 0];

    R[0] = (window.innerWidth  || document.body.clientWidth);   // Width
    R[1] = (window.innerHeight || document.body.clientHeight);  // Height

    return R;
}

// function that will tell wether the user uses a phone or not
function DetectPhone()
{
    if (navigator.userAgent.toLocaleLowerCase().match(/mobile/i))
        return true;
    else
        return false;
}

// function that will tell wht kind of web browser the user is using
function TestBrowser()
{
    if (navigator.userAgent.indexOf('Firefox') != -1 && parseFloat(navigator.userAgent.substring(navigator.userAgent.indexOf('Firefox') + 8)) >= 3.6)
        return "Firefox";
    else if (navigator.userAgent.indexOf('Chrome') != -1 && parseFloat(navigator.userAgent.substring(navigator.userAgent.indexOf('Chrome') + 7).split(' ')[0]) >= 15)
        return "Chrome";
    else if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Version') != -1 && parseFloat(navigator.userAgent.substring(navigator.userAgent.indexOf('Version') + 8).split(' ')[0]) >= 5)
        return "Safari"
    else
        return "NULL";
}