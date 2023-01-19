const todoInput = document.querySelector('#todo-input');
const todoList = document.querySelector('#todo-list');

//문자열(JSON)로 저장된 객체 데이터를 다시 객체형태로 변환
const savedTodoList = JSON.parse(localStorage.getItem('saved-items'));
console.log(typeof savedTodoList);

//완료여부 체크
const createTodo = function (storageData) {
    let todoContents = todoInput.value;

    if(storageData) {
        todoContents = storageData.contents
    }

    // 1. DON 노드 생성하기
    console.log(todoInput);
    const newLi = document.createElement('li');
    const newSpan = document.createElement('span');
    console.log(todoInput, newLi, newSpan);
    const newBtn = document.createElement('button');
    console.log(newBtn);

    newBtn.addEventListener('click', () => {
        //버튼 클릭시 li태그에 complete라는 클래스 속성 추가
        newLi.classList.toggle('complete');
        saveItemsFn();
    });

    //ToDoList 삭제하기
    newLi.addEventListener('dblclick', () => {
        //console.log('check dbclick');
        newLi.remove();
        //리스트 삭제 storage에 저장하기
        saveItemsFn();
    });

    //취소한 리스트(complete) storage에 저장하기
    if(storageData?.complete) {
        newLi.classList.add('complete');
    }

    // 2. 데이터 담기
    //newSpan.textContent = todoInput.value;
    newSpan.textContent = todoContents;
    newLi.appendChild(newBtn);
    //해당 태그 내부에 하위태그를 생서해주는 메소드
    newLi.appendChild(newSpan);

    console.log(newLi);
    //해당 태그를 인식하는지 체크
    //console.log(todoList);

    // 3. 조립하기
    todoList.appendChild(newLi);

    // 4. 마무리 - input박스 비우기
    todoInput.value = '';
    saveItemsFn();
}

const keyCodeCheck = function () {
    if (window.event.keyCode === 13 && todoInput.value.trim() !== '') {
        createTodo();
    }
};

//전체삭제
const deleteAll = function () {
    const liList = document.querySelectorAll('li');
    console.log(liList);
    console.log(liList[0]);
    for(let i = 0; i < liList.length; i++) {
        console.log(liList[i]);
        liList[i].remove();
    }
    saveItemsFn();
};

const saveItemsFn = function () {
    const saveItems = [];
    //console.log(todoList.children[0].querySelector('span').textContent);
    for(let i = 0; i < todoList.children.length; i++) {
        const todoObj = {
            contents: todoList.children[i].querySelector('span').textContent,
            complete: todoList.children[i].classList.contains('complete')
        };
        saveItems.push(todoObj);
    }

    //삼항연산자로 if문 표현
    saveItems.length === 0 ? localStorage.removeItem('saved-items') 
    : localStorage.setItem('saved-items', JSON.stringify(saveItems));

    /*
    if(saveItems.length === 0) {
        localStorage.removeItem('saved-items');
    }else {
        localStorage.setItem('saved-items', JSON.stringify(saveItems));
    }
    */
    
    // console.log(String(123));
    // console.log(String(saveItems));
    // console.log(typeof JSON.stringify(saveItems));
    //localStorage.setItem('saved-items', JSON.stringify(saveItems));
};

//호이스팅으로 인해 createTodo를 호출하기 위해 선언 순서 변경
if(savedTodoList) {
    for(let i = 0; i < savedTodoList.length; i++) {
        createTodo(savedTodoList[i]);
    }
}

const weatherDataActive = function({location, weather}) {
    const weatherMainList = [
        'Clear',
        'Clouds',
        'Drizzle',
        'Rain',
        'Snow',
        'thunderstorm',
    ];
    const locationNameTag = document.querySelector('#location-name-tag');
    console.log(locationNameTag);
    locationNameTag.textContent = location;
}

const weatherSearch = function ({latitude, longitude}) {
    fetch(

    )
        .then((res) => {
            return res.json();
        })
        .then((json) => {
            console.log(json.name, json.weahter[0].main)
            const weatherData = {
                location: json.name,
                weather: json.weather[0].main
            }
            weatherDataActive(weatherData);
        })
        .catch((err) => {
            console.log(err);
        });
};

//geolocation을 이용한 해당 위치 받아오기
//구조분해할당 적용
const accessToGeo = function ({coords}) {
    console.log(position)
    const{latitude, longitude} = coords;
    // shorthand property
    const positionObj = {
        latitude,
        longitude,
    };

    weatherSearch(positionObj);
}

//현재 위치를 가져오는 메소드
const askForLocation = function () {
    navigator.geolocation.getCurrentPosition(accessToGeo, (err) => {
        console.log(err);
    });
};

askForLocation();