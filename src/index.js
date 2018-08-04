/* ДЗ 2 - работа с массивами и объеектами */

/*
 Задание 1:
 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */
function forEach(array, fn) {
    for (var index = 0; index < array.length; index++) {
        fn(array[index], index, array);
    }
}

/*
 Задание 2:
 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */
function map(array, fn) {
    var _array = [];

    for (var index = 0; index < array.length; index++) {
        _array[index] = fn(array[index], index, array);
    }

    return _array;
}

/*
 Задание 3:
 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */
function reduce(array, fn, initial) {
    var _result = initial || array[0];
    var index = (!initial) ? 1 : 0;

    for (index ; index < array.length; index++) {
        _result = fn(_result, array[index], index, array)
    }

    return _result;
}

/*
 Задание 4:
 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива
 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {
    var _result = [];

    for (var title in obj) {
        if (obj.hasOwnProperty(title)) {
            _result.push(title.toUpperCase());
        }
    }

    return _result;
}

/*
 Задание 5 *:
 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */
function slice(array, from = 0, to = array.length) {
    var _result = [];

    if (from < 0 && from < -(array.length)) {
        from = 0;
    } else if (from < 0 && from < -(array.length)) {
        from = array.length + from;
    } else if (from > array.length) {
        from = array.length;
    }

    if (to < 0) {
        to = array.length + to;
    } else if (to > array.length) {
        to = array.length;
    }

    for (var i = from; i < to; i++) {
        _result.push(array[i]);
    }

    return _result;
}

/*
 Задание 6 *:
 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
    return new Proxy(obj, {
        set: function(target, prop, value) {
            target[prop] = value*value;

            return true;
        }
    });
}

export {
    forEach,
    map,
    reduce,
    upperProps,
    slice,
    createProxy
};
