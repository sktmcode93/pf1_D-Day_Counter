// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// background
window.addEventListener("load", () => {
    const bgMenu = document.querySelector(".bg-menu");
    for(let i=0; i<4 ; i++){
        const li = document.createElement("li");
        const img = document.createElement("img");
        img.src = "img/bg0" + (i+1) + ".jpg";
        img.onclick = ddbgClickEvent;
        li.appendChild(img);
        li.className = "bg-image";
        bgMenu.appendChild(li);
    }
});

const ddbgClickEvent = (e) => {
    const target = e.target.src;
    const index = target.indexOf("/img/");
    const number = target.substring(index);
    
    const countdown = document.querySelector(".countdown");
    setTimeout(() => {
        setTimeout(() => {
            countdown.style.backgroundImage = `url(..${number})`; 
            countdown.classList.remove("bg-active"); 
        }, 150)
        countdown.classList.add("bg-active");
    },150);
}

const ddbgToggleEvent = () => {
    const toggleBtn = document.querySelector(".bg span");
    const bgMenu = document.querySelector(".bg-menu");
    if(toggleBtn.innerText === "<"){
        toggleBtn.innerText = ">";
        bgMenu.classList.add("bg-menu-active");
    }else{
        toggleBtn.innerText = "<";
        bgMenu.classList.remove("bg-menu-active");
    }
}
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// clock
let startClock = setInterval(()=>{clock(new Date("2021-01-01 00:00"));},1000);
const clock = (date) => {
    const dDay = new Date(date);
    const data = new Date();
    const wholeTime = parseInt((dDay - data)/1000);
    const leftSecs = wholeTime%60;
    const leftMins = parseInt(wholeTime/60)%60;
    const leftHours = parseInt(wholeTime/3600)%24;
    const leftDays = parseInt(wholeTime/(3600*24));
    const days = document.querySelector(".clock .Ldays");
    const hours = document.querySelector(".clock .Lhours");
    const mins = document.querySelector(".clock .Lmins");
    const secs = document.querySelector(".clock .Lsecs");
    
    if(wholeTime >=0){
        printTime(leftSecs, secs);
        printTime(leftMins, mins);
        printTime(leftHours, hours);
        printTime(leftDays, days);
    }else{
        printPlusTime(Math.abs(leftSecs), secs, 1);
        printPlusTime(Math.abs(leftMins), mins, 1);
        printPlusTime(Math.abs(leftHours), hours, 1);
        printPlusTime(Math.abs(leftDays), days, 0);
    }
}

const printTime = (time, area) => {
    if(time > 9) area.innerText = time;
    else area.innerText = "0" + time;
}
const printPlusTime = (time, area, order) => {
    let plus;
    if(order === 0) plus = "+";
    else plus = "";
    if(time > 9) area.innerText = `${plus}${time}`;
    else area.innerText = `${plus}0${time}`;
}

const resetClock = (dDayInfo) => {
    clearInterval(startClock);
    startClock = setInterval(() => {clock(dDayInfo.dDay)}, 1000);
    document.querySelector(".sub-title").innerText = dDayInfo.title;
}
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//add
let dDayList = [];

const addDdayHandler = () => {
    const dName = document.querySelector(".popup-name");
    const dDate = document.querySelector(".popup-date");
    const dTime = document.querySelector(".popup-time");
    const dDay = dDate.value + " " + dTime.value;
    if(dName.value === "" || dDate.value === "" || dTime.value === ""){
        if(dName.value === ""){
            alert("디데이칸을 입력해주세요.");
            dName.focus();
            return;
        }
        if(dDate.value === "" ){
            alert("날짜를 입력해주세요.");
            dDate.focus();
            return;
        }
        if(dTime.value === ""){
            alert("시간을 입력해주세요.");
            dTime.focus();
            return;
        }
    }
    const dDayInfo = {"dDay" : dDay, "title" : dName.value};
    dDayList = [...dDayList, dDayInfo];
    ddclearList();
    ddprintList();
    dName.value = "";
    dDate.value = "";
    dTime.value = "";
    ddclearPopup();
    resetClock(dDayInfo);
    printDate(dDayInfo.dDay);
}

const ddlistClickHandler = (e) => {
    e.preventDefault();
    const dDayInfo = dDayList.filter(i => i.title === e.target.innerText)[0];
    if(!ddDeletion){
        resetClock(dDayInfo);
        printDate(dDayInfo.dDay);
    }else{
        if(confirm(dDayInfo.title + "을 지우시겠습니까?")){
            const filterList = dDayList.filter(i => i.title !== dDayInfo.title);
            dDayList = filterList;
            ddclearList();
            ddprintList();
            const resetDate = {"dDay" :"2021-01-01 00:00", "title" : "Happy NewYear"};
            resetClock(resetDate);
            printDate(resetDate.dDay);
        }else{
            return;
        }
    }
    
}

const ddclearList = () => {
    const dayList = document.querySelector(".day-list");
    let child = dayList.childNodes;
    while(child.length !== 0){
        dayList.removeChild(child[0]);
    }
}
const ddprintList = () => {
    const dayList = document.querySelector(".day-list");
    dDayList.forEach(i => {
        const li = document.createElement("li");
        const span = document.createElement("span");
        span.innerText = i.title;
        span.onclick = ddlistClickHandler;
        li.appendChild(span);
        li.classList.add("day-list-info");
        dayList.appendChild(li);
    })
}
const printDate = (wholeDate) => {
    const splitDate = wholeDate.split(" ");
    const date = splitDate[0].split("-");
    const time = splitDate[1].split(":");
    document.querySelector(".date-title").innerText = `${date[0]}년 ${date[1]}월 ${date[2]}일 ${time[0]}시 ${time[1]}분`;
}
const ddaddClickHandler = () => {
    const addPopup = document.querySelector(".add-popup");
    setTimeout(() => {
        setTimeout(() => {
            addPopup.classList.add("popup-active");
        },50);
        addPopup.style.display = "flex";
    },50);
}
const ddclearPopup = () => {
    const addPopup = document.querySelector(".add-popup");
    setTimeout(() => {
        setTimeout(() => {
            addPopup.style.display = "none";
        },250);
        addPopup.classList.remove("popup-active");
    },150);
}

// keyEvent
window.addEventListener("keydown", (e) => {
    if(e.keyCode === 13){
        if(document.querySelector(".add-popup").classList.contains("popup-active")) addDdayHandler();
    }
    if(e.keyCode === 27){
        if(document.querySelector(".add-popup").classList.contains("popup-active")) ddclearPopup();
    }
})

//sub
let ddDeletion = false;
const ddDeletionClick = () => {
    const description = document.querySelector(".countdown .sub-explain");
    const subBtn = document.querySelector(".countdown .sub-sub");
    const subText = document.querySelector(".countdown .sub-text");
    if(ddDeletion){
        ddDeletion = false;
        description.style.display = "none";
        subBtn.style.color = "black"
        subText.innerText = "삭제하기";
    }else{
        ddDeletion = true;
        description.style.display = "block";
        subBtn.style.color = "red"
        subText.innerText = "완료";
    }
}