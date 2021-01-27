function getTimeGreeting() {
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
    return prefix + greeting + postfix;
}

document.getElementById("greeting-time").innerHTML = getTimeGreeting();