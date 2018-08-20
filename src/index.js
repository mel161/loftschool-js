/* ДЗ 6 - Асинхронность и работа с сетью */

/*
 Задание 1:

 Функция должна возвращать Promise, который должен быть разрешен через указанное количество секунду

 Пример:
   delayPromise(3) // вернет promise, который будет разрешен через 3 секунды
 */
function delayPromise(seconds) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, seconds * 1000);
    });
}

/*
 Задание 2:

 2.1: Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json

 2.2: Элементы полученного массива должны быть отсортированы по имени города

 Пример:
   loadAndSortTowns().then(towns => console.log(towns)) // должна вывести в консоль отсортированный массив городов
 */
function loadAndSortTowns() {
    const townsURL = 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json';

    return fetch(townsURL).then(function(response) {
        if (response.status !== 200) {
            // logging about problems
            return;
        }

        // Examine the text in the response
        return response.json().then(function(data) {
            return data.sort(function(a, b) {
                a = a.name.toLowerCase();
                b = b.name.toLowerCase();
                let result = 0;

                if (a < b) {
                    result = -1;
                } else if (a > b) {
                    result = 1;
                }

                return result;
            });
        });
    });
}

export { delayPromise, loadAndSortTowns };
