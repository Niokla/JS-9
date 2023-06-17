// Напишите код приложения, который содержит в себе 2 инпута и кнопку,, при нажатии происходит следующее:
// Если число не совпадает от 100 до 300 — выводить ниже текст «число вне диапазона от 100 до 500»
// Если число попадает в диапазон от 100 до 300 — сделать запрос c помощью XHR по URL https://loremflickr.com/json/g/320/240/all, где get-параметр 320 и 240 — это введённые числа..
// Пример: если пользователь ввёл 320 и 240, то запрос будет вида https://loremflickr.com/json/g/320/240/all.После получения данных вывести ниже картинку на экран.
const button = document.querySelector('button');
const par = document.querySelector('p');
function checkNumAndMakeRequest() {
    const xhr = new XMLHttpRequest();
    let inputNum1 = document.querySelector('.inp1').value;
    let inputNum2 = document.querySelector('.inp2').value;

    if ((inputNum1 > 300 || inputNum1 < 100) || (inputNum2 > 300 || inputNum2 < 100)) {
        par.style.display = 'block';
        setTimeout(() => {        // через 5 сек убирает подсказку
            par.style.display = 'none';
        }, 5000)
        return
    }

    // const reqUrl = `https://loremflickr.com/json/g/${inputNum1}/${inputNum2}/all`; 
    // ссылка выше на 20 строке не работает-а точнее возвращает не обьект json, а картинку поэтому src картинки получаю не из JSON объекта , а напрямую получаю по ссылке
    const reqUrl = `https://picsum.photos/${inputNum1}/${inputNum2}`;
    xhr.open('GET', reqUrl);
    xhr.onload = function () {
        if (xhr.status != 200) {
            console.log(`Статус : ${xhr.status}`)
        } else {
            const finalPicture = document.createElement('img');
            finalPicture.setAttribute('src', reqUrl);
            document.querySelector('body').appendChild(finalPicture);
        }
        xhr.onerror = () => {
            console.log('Something wrong!')
        }
    }
    xhr.send();
    document.querySelector('.inp1').value = '';//очищаю строку ввода
    document.querySelector('.inp2').value = '';//очищаю строку ввода
}
button.addEventListener('click', checkNumAndMakeRequest)

