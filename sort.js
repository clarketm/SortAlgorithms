(function() {
    'use strict';

    const utils = {
        assertString: function(string) {
            const isString = typeof string === 'string';
            if (!isString) throw new Error(`Parameter needs to be a type of string: ${string}`);
        },

        assertArray: function(array) {
            const notArray = !(array instanceof Array);
            if (notArray) throw new Error(`Parameter needs to be an instance of Array: ${array}`);
        }
    };

    function SortAlgorithms(visualizer) {
        const sortingAlgorithms = {
            insertion: insertionSort,
            selection: selectionSort,
            bubble: bubbleSort,
            merge: mergeSort,
            quick: quickSort
        };

        let counter = 0;

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
                    visualizer(array.slice(), ++counter, 'insertion');
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
                        visualizer(array.slice(), ++counter, 'selection');
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
                        visualizer(array.slice(), ++counter, 'bubble');
                    }
                    current++;
                    next++;
                }
                stoppingPoint--;
            }
            return array;
        }

        // TODO Add visualizer
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

                let result = [];
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

        // TODO Add visualizer
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
            utils.assertString(algorithm);
            counter = 0;
            return {
                sort: function(array) {
                    utils.assertArray(array);
                    return sortingAlgorithms[algorithm.toLowerCase()](array)
                }
            };
        }

        return {
            use: use
        };
    }

    if (typeof define === 'function' && define.amd) {
        define(function() {
            return SortAlgorithms;
        });
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = SortAlgorithms;
    } else {
        window.SortAlgorithms = SortAlgorithms;
    }

})();