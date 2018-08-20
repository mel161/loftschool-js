/*
 Страница должна предварительно загрузить список городов из
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 и отсортировать в алфавитном порядке.

 При вводе в текстовое поле, под ним должен появляться список тех городов,
 в названии которых, хотя бы частично, есть введенное значение.
 Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.

 Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 После окончания загрузки городов, надпись исчезает и появляется текстовое поле.

 Разметку смотрите в файле towns-content.hbs

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер

 *** Часть со звездочкой ***
 Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 При клике на кнопку, процесс загруки повторяется заново
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

/*
 Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 */
function loadTowns() {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        let towns = new Object();
        let path = 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json';

        xhr.open('GET', path, true);

        xhr.onload = function () {
            if (this.status == 200) {
                towns = JSON.parse(xhr.responseText);
                resolve(sortTowns(towns));
            } else {
                reject('Не удалось загрузить города');
            }
        };

        xhr.send();
    });
}

function sortTowns(objectTowns) {
    let result = objectTowns.sort((a, b) => {
        if (a.name > b.name) {
            return 1;
        }

        if (a.name < b.name) {
            return -1;
        }

        return 0;
    });

    // let result  = (a.name > b.name) ? 1 : (a.name < b.name) ? -1 : 0;

    return result;
}

/*
 Функция должна проверять встречается ли подстрока chunk в строке full
 Проверка должна происходить без учета регистра символов

 Пример:
   isMatching('Moscow', 'moscow') // true
   isMatching('Moscow', 'mosc') // true
   isMatching('Moscow', 'cow') // true
   isMatching('Moscow', 'SCO') // true
   isMatching('Moscow', 'Moscov') // false
 */
function isMatching(full, chunk) {
    return full.toLowerCase().includes(chunk.toLowerCase());
}

/* Блок с надписью "Загрузка" */
const loadingBlock = homeworkContainer.querySelector('#loading-block');
/* Блок с текстовым полем и результатом поиска */
const filterBlock = homeworkContainer.querySelector('#filter-block');
/* Текстовое поле для поиска по городам */
const filterInput = homeworkContainer.querySelector('#filter-input');
/* Блок с результатами поиска */
const filterResult = homeworkContainer.querySelector('#filter-result');
/* Блок с ошибкой и кнопкой перезагрузки */
const errorBlock = homeworkContainer.querySelector('#error-block');
/* Кнопка перезагрузки данных */
// const reloadBtn = homeworkContainer.querySelector('#reload-input');

let reloadBtn = document.createElement('button');
reloadBtn.textContent = 'Повторить';
reloadBtn.style.display = 'none';;

reloadBtn.addEventListener('click', () => {
    initTowers();
});
homeworkContainer.appendChild(reloadBtn);

let towns;

initTowers();

filterInput.addEventListener('keyup', function() {
    showMathes(this.value);
});

function initTowers() {
    loadTowns()
        .then(result => {
            loadingBlock.style.display = 'none';
            filterBlock.style.display = 'block';
            towns = result;
        })
        .catch(() => {
            loadingBlock.textContent = 'Не удалось загрузить города';
            reloadBtn.style.display = 'block';
        });
}

function showMathes(value) {
    filterResult.innerHTML = '';

    for (let town of towns) {
        if (filterInput.value.length > 0 && isMatching(town.name, value)) {
            let innerDiv = document.createElement('div');

            innerDiv.textContent = town.name;
            filterResult.appendChild(innerDiv);
        }
        filterInput.focus();
    }
}

export { loadTowns, isMatching };
