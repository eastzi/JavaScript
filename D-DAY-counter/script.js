/* <조건문>
const obj = {
    name: 'Jason',
    age: 25
};

if(obj.name === 'Jason' && obj.age >= 25) {
    console.log('안녕, ' + obj.name + '너의 나이는' + obj.age);
}else {
    console.log('u r not our member');
}*/
const messageContainer = document.querySelector('#d-day-message');
const container = document.querySelector('#d-day-container');
//localStorage 가져오기
const savedDate = localStorage.getItem('saved-date');
console.log(savedDate)
const intervalIdArr = [];

container.style.display = 'none';
messageContainer.textContent = 'D-DAY를 입력해주세요.';

const dateFormMaker = function () {
    const inputYear = document.querySelector('#target-year-input').value; 
    const inputMonth = document.querySelector('#target-month-input').value; 
    const inputDate = document.querySelector('#target-date-input').value;
    //const dateFormat = inputYear + '-' + inputMonth + '-' + inputDate;
    
    // `` 은 문자열을 정의할 수 있지만, ''와의 차이점은 문자열 안에서 데이터를 참조할 수 있음
    const dateFormat = `${inputYear}-${inputMonth}-${inputDate}`; //-> 템플릿 리터럴

    /*
    console.log(inputYear, inputMonth, inputDate);
    console.log(inputYear);
    console.log(inputMonth);
    console.log(inputDate);
    */

    return dateFormat;
};

const counterMaker = function (data) {
    if(data !== savedDate) {
        //localStorage
        localStorage.setItem('saved-date', data);
    }

    console.log(data);
    //console.log(messageContainer);
    //console.log(document.querySelector('#d-day-message'));

    //const targetDateInput = dateFormMaker();
    //console.log(targetDateInput);

    const nowDate = new Date();
    //new Date는 09시를 기준으로 날짜를 나타내므로 D-DAY 계산을 위해 자정을 기준으로 나타나도록 설정
    const targetDate = new Date(data).setHours(0, 0, 0, 0);
    
    //milliSecond로 나온 값을 1000으로 나누어 second 값으로 변환
    const remaining = (targetDate - nowDate) / 1000;
    
    // console.log(nowDate);
    // console.log(targetDate);
    // console.log(remaining === NaN);
    // console.log(isNaN(remaining), remaining);

    //만약, remaining이 0 이라면, 타이머가 종료되었습니다. 라고 출력하기
    if(remaining <= 0) {
        console.log('타이머가 종료되었습니다.');
        messageContainer.innerHTML = '<h3>타이머가 종료되었습니다.</h3>';
        messageContainer.style.display = 'flex';
        setClearInterval();
        return;
    } else if(isNaN(remaining)) {
        //else if(remaining === NaN) {
        //만약, 잘못된 날짜가 들어온 경우 유효한 시간대가 아닙니다. 라고 출력하기 
        console.log('유효한 시간대가 아닙니다.')
        container.style.display = 'none';
        messageContainer.innerHTML = '<h3>유효한 시간대가 아닙니다.</h3>'
        messageContainer.style.display = 'flex';
        setClearInterval();
        return;
    }

    //console.log('함수종료1');

    /*
    //남은 날짜
    const remainingDate = Math.floor(remaining / 3600 / 24);
    //남은 시간
    const remainingHours = Math.floor(remaining / 3600) % 24;
    //남은 분
    const remainingMin = Math.floor(remaining / 60) % 60;
    //남은 초
    const remainingSec = Math.floor(remaining) % 60;
    */
    
    //객체화를 통해 데이터 전송하기
    const remainingObj = {
        remainingDate: Math.floor(remaining / 3600 / 24),
        remainingHours: Math.floor(remaining / 3600) % 24,
        remainingMin: Math.floor(remaining / 60) % 60,
        remainingSec: Math.floor(remaining) % 60
    }

    //console.log('함수종료2');

    //[] 속 ''을 붙여 key값으로 인식함.
    //console.log(remainingObj['remainingDate']);
    //[] 속 ''를 붙이지 않아 변수로 인식함.
    //console.log(remainingObj[remainingDate]);

    /*
    const days = document.querySelector('#days');
    const hours = document.querySelector('#hours');
    const min = document.querySelector('#min');
    const sec = document.querySelector('sec');
    
    const days = document.getElementById('days');
    const hours = document.getElementById('hours');
    const min = document.getElementById('min');
    const sec = document.getElementById('sec');
    console.log(days, hours, min, sec);
    */

    const documentArr = ['days', 'hours', 'min', 'sec'];

    //반복문
    const timeKeys = Object.keys(remainingObj);
    //const docKeys = Object.keys(documentObj);
    //console.log(timeKeys);
    //console.log(docKeys);

    //출력되는 카운트다운 숫자 변경하기
    //남은 시간이 1자리 수인 경우 앞에 0을 붙임. -> 01, 02, 03...
    const format = function(time) {
        if(time < 10) {
            return '0' + time;
        }else {
            return time;
        }
    } 

    //for of
    let i = 0;
    for (let tag of documentArr) {
        const remainingTime = format(remainingObj[timeKeys[i]]);
        console.log(remainingTime);
        //console.log(tag);
        //document.getElementById(tag).textContent = remainingObj[timeKeys[i]];
        document.getElementById(tag).textContent = remainingTime;
        i++;
    }

    /*
    const documentObj = {
        days: document.getElementById('days'),
        hours: document.getElementById('hours'),
        min: document.getElementById('min'),
        sec: document.getElementById('sec')
    }
    */
    
    /*
    for(let i = 0; i < timeKeys.length; i = i + 1) {
        console.log(timeKeys);
        console.log(timeKeys[i]);
        console.log(documentObj[docKeys[i]]);
        documentObj[docKeys[i]].textContent = remainingObj[timeKeys[i]];
    }
    */

    /*for in
    let i = 0;
    for (let key in documentObj) {
        documentObj[key].textContent = remainingObj[timeKeys[i]];
        i++;
    }
    */
    
    /*
    days.textContent = remainingDate;
    hours.textContent = remainingHours;
    min.textContent = remainingMin;
    sec.textContent = remainingSec;
    
    days.textContent = remainingObj['remainingDate'];
    hours.textContent = remainingObj['remainingHours'];
    min.textContent = remainingObj['remainingMin'];
    sec.textContent = remainingObj['remainingSec'];
    */

    /*
    documentObj['days'].textContent = remainingObj['remainingDate'];
    documentObj['hours'].textContent = remainingObj['remainingHours'];
    documentObj['min'].textContent = remainingObj['remainingMin'];
    documentObj['sec'].textContent = remainingObj['remainingSec'];
    */

    //console.log(remaining);
    //console.log(remainingDate, remainingHours, remainingMin, remainingSec);
};

 //d-day-container message 가져오기
const starter = function (targetDateInput) {
    //console.log(targetDateInput);
    if(!targetDateInput) {
        //console.log(targetDateInput);
        //매개변수 재할당
        targetDateInput = dateFormMaker()
    }
    //const targetDateInput = dateFormMaker();

    container.style.display = 'flex';
    messageContainer.style.display = 'none';
    setClearInterval(); //새로운 일자 입력 후 시작버튼 클릭시 기존 일자는 삭제.
    counterMaker(targetDateInput); //0초 동작 1번을 위한 설정.
    const intervalId = setInterval(() => counterMaker(targetDateInput), 1000); //1초부터 동작이 실행됨
    intervalIdArr.push(intervalId);
    console.log(intervalIdArr);

    /*
    for(let i = 0; i < 100; i++) {
        setTimeout(() => { //setTimeout은 뒤에 설정한 시간만큼 함수의 속도를 늦춰줌.
            counterMaker();
        }, 1000 * i); //실행시간을 1초씩 늘려감.
    }
    */
};

const setClearInterval = function () {
    for(let i = 0; i < intervalIdArr.length; i++) {
        clearInterval(intervalIdArr[i]);
    }
};

const resetTimer = function () {
    localStorage.removeItem('saved-date');
    container.style.display = 'none';
    messageContainer.innerHTML = '<h3>D-DAY를 입력해주세요.</h3>';
    messageContainer.style.display = 'flex';
    setClearInterval();
};

//조건문과 데이터의 조합
if (savedDate) {
    starter(savedDate);
}else {
    //console.log('data null');
    container.style.display = 'none';
    messageContainer.innerHTML = '<h3>D-DAY를 입력해주세요.</h3>';
}