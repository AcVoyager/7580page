function getHHAndMid(time_string) {
    let hhInfo = {};
    const delimiter = ":";
    let arr = time_string.split(delimiter);
    hhInfo.hh = Number(arr[0]);
    const midStartIndex = -2;
    hhInfo.mid = time_string.slice(midStartIndex);
    return hhInfo;
}

getMM = (time) => time.getMinutes();
getSS = (time) => time.getSeconds();

function rotateHand(hand, angle) {
    const px = "100px";
    const rotation = `translate(${px}) rotate(${angle}deg)`
    hand.style.transform = rotation;
}

const am = "AM", pm = "PM";

function changeMid(midDiv, curTime) {
    console.log(curTime.mid);
    if(curTime.mid === am){
        curTime.mid = pm;
    }
    else{
        curTime.mid = am;
    }
    midDiv.innerHTML = curTime.mid;
}

let pastSeconds = 0, pastMinutes = 0, pastHours = 0;
const base60 = 60, base12 = 12;
const deg6 = 6, deg30 = 30, anglePerMin = 0.5;
function CurrentTime() {
    this.hh = 0;
    this.mm = 0;
    this.ss = 0;
    this.mid = "";
};

function rotationHandler(handObj, curTime) {
    curTime.ss++;
    rotateHand(handObj.ss, curTime.ss * deg6);
    if(curTime.ss === base60) {
        curTime.ss = 0;
        curTime.mm++;
        rotateHand(handObj.mm, curTime.mm * deg6);
        rotateHand(handObj.hh, curTime.hh * deg30 + curTime.mm * anglePerMin);
    }
    if(curTime.mm === base60) {
        curTime.mm = 0;
        curTime.hh++;        
    }
    if(curTime.hh > base12) {
        curTime.hh = 1;
        changeMid(handObj.mid, curTime);
    }
}

const interval = 1000;
const cityToTZ = {
    seattle: "America/Los_Angeles",
    boston: "America/New_York",
};
const lang = "en-US";
const meridian = "am-pm";

function proceed(city, curTime) {
    let time = new Date();
    let timeStr = time.toLocaleTimeString(lang, {timeZone: cityToTZ[city]});
    let hhInfo = getHHAndMid(timeStr);
    let hh = hhInfo.hh, mid = hhInfo.mid;
    let mm = getMM(time), ss = getSS(time);

    let parentDiv = document.getElementById(city);
    let midDiv = parentDiv.getElementsByClassName(meridian)[0];
    midDiv.innerHTML = mid; // set AM or PM
    
    const hClass = "hand hour", mClass = "hand minute", sClass = "hand second";
    let hrHand = parentDiv.getElementsByClassName(hClass)[0];
    let minHand = parentDiv.getElementsByClassName(mClass)[0];
    let secHand = parentDiv.getElementsByClassName(sClass)[0];
    curTime.hh = hh;
    curTime.mm = mm;
    curTime.ss = ss;
    curTime.mid = mid;
    rotateHand(hrHand, curTime.hh * deg30 + curTime.mm * anglePerMin);
    rotateHand(minHand, curTime.mm * deg6);
    rotateHand(secHand, curTime.ss * deg6);
    const handObj = {
        hh: hrHand,
        mm: minHand,
        ss: secHand,
        mid: midDiv,
    };
    setInterval(rotationHandler, interval, handObj, curTime);
}

const sea = "seattle", bos = "boston";
proceed(sea, new CurrentTime());
proceed(bos, new CurrentTime());
