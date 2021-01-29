function showTime() {
    let time = new Date();
    let curHr = time.getHours();
    let greeting;

    if(curHr > 6 && curHr <= 12) {
        greeting = "Morning";
    }
    else if(curHr > 12 && curHr <= 18) {
        greeting = "Afternoon";
    }
    else{
        greeting = "Evening";
    }

    let prefix = "Good ";
    let postfix = " !"
    document.getElementById("greeting").innerHTML = prefix + greeting + postfix;

    let curTime = time.toTimeString().split(' ')[0];
    document.getElementById("cur-time").innerHTML = curTime;

    // let curMin = time.getMinutes();
    // let curSec = time.getSeconds();

    // let temp =  curHr + ":" + curMin + ":" + curSec;
    // console.log(temp);

    // document.getElementById("cur-time").innerHTML = curHr + ":" + curMin + ":" + curSec;
}

showTime();
const interval = 1000;
setInterval(showTime, interval);