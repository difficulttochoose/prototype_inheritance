'use strict';

//Реализовать функцию конструктор MyArray.
//
// Реализовать следующие методы функции конструктора:
// MyArray.isMyArray();  // подсказка: instanceof
function MyArray() {
    this.length = 0;
    this.isMyArray = function isMyArray() {
        return this instanceof MyArray;
    }
}

// Реализовать прототип для создаваемых коллекций,
const myArrayProto = new MyArray();

// со следующими методами:
// MyArray.prototype.push();
myArrayProto.push = function push() {
    for (let i = 0; i < arguments.length; ++i) {
        this[this.length] = arguments[i];
        this.length++;
    }
    return this.length;
}

// MyArray.prototype.find();
myArrayProto.find = function find(callback) {
    for (let i = 0; i < this.length; ++i) {
        if (callback(this[i])) {
            return this[i];
        }
    }
}

// MyArray.prototype.includes();
myArrayProto.includes = function includes(x, pos = 0) {
    let flag = false;
    for (let i = pos; i < this.length; ++i) {
        if (this[i] === x) {
            flag = true;
            break;
        }
    }
    return flag;
}

// MyArray.prototype.join();
myArrayProto.join = function join(separator = '') {
    let str = '';
    for (let i = 0; i < this.length; ++i) {
        str += `${this[i]}${i < this.length - 1 ? separator : ''}`;
    }
    return str;
}

// MyArray.prototype.filter();
myArrayProto.filter = function filter(callback) {
    let arr = new MyArray();
    for (let i = 0; i < this.length; ++i) {
        if (callback(this[i])) {
            arr.push(this[i]);
        }
    }
    return arr;
}

// MyArray.prototype.map();
myArrayProto.map = function map(callback) {
    let arr = new MyArray();
    for (let i = 0; i < this.length; ++i) {
        arr.push(callback(this[i]));
    }
    return arr;
}

//MyArray.prototype.reduce();
myArrayProto.reduce = function reduce(callback, initialValue) {
    let result = initialValue ? initialValue : this[0];
    let i = initialValue ? 0 : this[1];
    for (i; i < this.length; ++i) {
        result = callback(result, this[i], i, this);
    }
    return result;
};

function reducer(accumulator, currentValue, index, array) {
    return accumulator + currentValue;
}

// MyArray.prototype.flat(); // tip: recursion
myArrayProto.flat = function flat(depth = 1) {
    let newArr = new MyArray;
    for (let i = 0; i < this.length; ++i) {
        if (this[i].isMyArray) {
            for (let j = 0; j < this[i].length; j++) {
                newArr.push(this[i][j]);
            }
        } else {
            newArr.push(this[i]);
        }
    }
    if (depth > 1) {
        newArr = newArr.flat(--depth);
    }

    return newArr;
}

// MyArray.prototype.pop(); // tip: delete
myArrayProto.pop = function pop() {
    let deleted = this[this.length - 1];
    delete this[this.length - 1];
    this.length--;
    return deleted;
}

MyArray.prototype = myArrayProto;
