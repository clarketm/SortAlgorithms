'use strict';

const sortingAlgorithms = {
    insertion: insertionSort,
    selection: selectionSort,
    bubble: bubbleSort,
    merge: mergeSort,
    quick: quickSort
};

function assertString(string) {
    const isString = typeof string === 'string';
    if (!isString) throw new Error(`Parameter needs to be a type of string: ${string}`);
}

function assertArray(array) {
    const notArray = !(array instanceof Array);
    if (notArray) throw new Error(`Parameter needs to be an instance of Array: ${array}`);
}

function insertionSort(array) {
    array = array.slice();
    if (array.length <= 1) return;

    let ptr = 1;
    let p1 = 1;
    let p2 = 0;

    while (ptr < array.length) {
        let key = array[ptr];
        while (p2 >= 0 && key < array[p2]) {
            array[p1] = array[p2];
            array[p2] = key;
            p1--;
            p2--;
        }
        ptr++;
        p1 = ptr;
        p2 = p1 - 1;
    }
    return array;
}

function selectionSort(array) {
    array = array.slice();
    let tmp;
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = i + 1; j < array.length; j++) {
            if (array[j] < array[i]) {
                // swap
                tmp = array[i];
                array[i] = array[j];
                array[j] = tmp;
            }
        }
    }
    return array;
}

function bubbleSort(array) {
    array = array.slice()
    let isSorted = false;
    let stoppingPoint = array.length;
    while (!isSorted) {
        isSorted = true;
        for (let current = 0, next = 1; next < stoppingPoint;) {
            if (array[current] > array[next]) {
                isSorted = false;
                let tmp = array[current];
                array[current] = array[next];
                array[next] = tmp;
            }
            current++;
            next++;
        }
        stoppingPoint--;
    }
    return array;
}

function mergeSort(array) {
    return divide(leftHalf(array), rightHalf(array));

    function divide(left, right) {
        if (left.length <= 1 && right.length <= 1) {
            return conquer(left, right);
        }

        return conquer(
            divide(leftHalf(left), rightHalf(left)),
            divide(leftHalf(right), rightHalf(right))
        );
    }

    function conquer(a, b) {
        let p1 = 0;
        let p2 = 0;

        let result = []; // new int[a.length + b.length];
        let i = 0;

        while (p1 < a.length && p2 < b.length) {
            if (a[p1] <= b[p2]) {
                result.push(a[p1]);
                p1++;
            } else {
                result.push(b[p2]);
                p2++;
            }
            i++;
        }

        while (p1 < a.length) {
            result.push(a[p1]);
            i++;
            p1++;
        }

        while (p2 < b.length) {
            result.push(b[p2]);
            i++;
            p2++;
        }

        return result;
    }

    function leftHalf(array) {
        let size = Math.floor(array.length / 2);
        let ptr = 0, i = 0;

        let result = [];
        while (ptr < size) {
            result.push(array[i]);
            ptr++;
            i++;
        }
        return result;
    }

    function rightHalf(array) {
        let size = array.length - (Math.floor(array.length / 2));
        let ptr = 0, i = Math.floor(array.length / 2);

        let result = [];
        while (ptr < size) {
            result.push(array[i]);
            ptr++;
            i++;
        }
        return result;
    }
}

// TODO DOES NOT WORK
function quickSort(array) {
    array = array.slice();
    if (array.length <= 1) {
        return array;
    }

    sort(array, 0, array.length - 1);
    return array;

    function sort(arr, left, right) {
        if (right - left < 1) return;
        let partitionIndex = partition(arr, left, right);

        sort(arr, left, partitionIndex - 1);
        sort(arr, partitionIndex + 1, right);
    }

    function partition(arr, left, right) {
        let ptr = 'RIGHT';
        let pivot = arr[left];

        while (left < right) {
            switch (ptr) {
                case 'RIGHT':
                    while (arr[right] > pivot) right--;
                    swap(arr, left, right);
                    left++;
                    ptr = 'LEFT';
                    break;
                case 'LEFT':
                    while (arr[left] < pivot) left++;
                    swap(arr, left, right);
                    right--;
                    ptr = 'RIGHT';
                    break;
                default:
                    throw new Error("pointer not specified");
            }
        }

        return right;
    }

    function swap(arr, left, right) {
        let temp = arr[left];
        arr[left] = arr[right];
        arr[right] = temp;
    }
}

function use(algorithm) {
    assertString(algorithm);
    return {
        sort: function(array) {
            assertArray(array);
            return sortingAlgorithms[algorithm.toLowerCase()](array)
        }
    };
}

module.exports = {
    use: use
};