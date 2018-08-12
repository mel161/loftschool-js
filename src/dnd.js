/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
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
 Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 Функция НЕ должна добавлять элемент на страницу. На страницу элемент добавляется отдельно

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
 */
function createDiv() {
    var divsize = ((Math.random()*100) + 50).toFixed();
    var color = getRandomColor();

    var posx = (Math.random() * (document.body.offsetWidth - divsize)).toFixed();
    var posy = (Math.random() * (document.body.offsetHeight - divsize)).toFixed();

    const newDiv = document.createElement('div');

    newDiv.className = 'draggable-div';
    newDiv.style.width = divsize + 'px';
    newDiv.style.height = divsize + 'px';
    newDiv.style.backgroundColor = color;
    newDiv.style.position = 'absolute';
    newDiv.style.left = posx + 'px';
    newDiv.style.top = posy + 'px';

    return newDiv;
}

function getRandomColor() {
    const MAX_COLOR = 16777215;

    const intColor = Math.floor(Math.random() * (MAX_COLOR));

    const red = intColor >> 16;
    const green = intColor - (red << 16) >> 8;
    const blue = intColor - (red << 16) - (green << 8);

    return '#' + ((1 << 24) + (red << 16) + (green << 8) + blue).toString(16).slice(1);
}

function addListeners(target) {
    target.setAttribute('draggable', true);

    target.addEventListener('dragstart', handleDragStart, false);
    target.addEventListener('dragend', handleDrop, false);
    target.addEventListener('drop', handleDrop, false);
}

let _coordsX = 0;
let _coordsY = 0;

function handleDragStart(e) {
    e.dataTransfer.effectAllowed = 'move';

    _coordsX = e.clientX - e.target.offsetLeft;
    _coordsY = e.clientY - e.target.offsetTop;
}

function handleDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }

    e.preventDefault();

    e.target.style.left = e.clientX - _coordsX + 'px';
    e.target.style.top = e.clientY - _coordsY + 'px';

    e.classList.remove('drag');

    return false;
}

/*
 Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
   addListeners(newDiv);
 */

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function() {
    // создать новый div
    const div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации D&D
    addListeners(div);

    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
    createDiv
};
