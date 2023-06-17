const button = document.querySelector('button');
const label = document.querySelector('.label');

function checkNumAndMakeRequest() { // В зависимости от дл
    const xhr = new XMLHttpRequest();
    const inputNum = document.querySelector('input').value;
    if (inputNum > 10 || inputNum < 1) {
        label.style.display = 'block';//подсказка что число вне диапазон 0-10
        setTimeout(() => {        // через 5 сек убирает подсказку
            label.style.display = 'none';
        },5000)
        return
    }
    const  reqUrl = `https://picsum.photos/v2/list?limit=${inputNum}`;//ограничивает  
    // get-параметр limit в зависимости от введёного числа
    xhr.open('GET',reqUrl);

    xhr.onload = function (){
        if (xhr.status != 200) {
            console.log(`Статус : ${xhr.status}`);
        }else{
            console.log('Результат :' ,JSON.parse(xhr.response));
            const result = JSON.parse(xhr.response);
            createImages(result);
        }
    }
    xhr.onprogress = function(evt) {
        console.log(`Загружено ${evt.loaded} из ${evt.total}`);
    }
    xhr.onerror = function() {
        console.log(`Ошибка! статус ответа:${xhr.status}`);
    }   
    xhr.send();
    document.querySelector('input').value = '';//очищаю строку ввода
}
button.addEventListener('click',checkNumAndMakeRequest);
function createImages(arr){ // рендерит новые картинки в документе(используется на 24 стр.)
    for (let i=0 ; i<arr.length;i++) {
          let picture = document.createElement('img');
          picture.setAttribute('src',`${arr[i].download_url
          }`);
          picture.classList = 'picture';
          document.querySelector('body').appendChild(picture);
    }              
}