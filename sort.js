;(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['exports'], factory);
    } else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
        factory(exports);
    } else {
        factory(root);
    }
}(this || window, function (exports) {
    'use strict';

    let SortAlgorithms = function (visualizer) {

        let self = this;

        self.counter = 0;

        self.algorithmMap = new Map([
            ['insertion', insertionSort],
            ['selection', selectionSort],
            ['bubble', bubbleSort],
            ['merge', mergeSort],
            ['quick', quickSort]
        ]);

        function insertionSort(array) {
            for (let i = 1; i < array.length; i++) {
                for (let j = i; j > 0 && array[j] < array[j - 1]; j--) {
                    self.counter++;
                    self.utils.swap(array, j, j - 1);
                    visualizer(array.slice(), self.counter, 'insertion');
                }
            }
            return array;
        }

        function selectionSort(array) {
            for (let i = 0; i < array.length - 1; i++) {
                let min = i;
                for (let j = i + 1; j < array.length; j++) {
                    self.counter++;
                    if (array[j] < array[min]) {
                        min = j;
                    }
                }
                self.utils.swap(array, i, min);
                visualizer(array.slice(), self.counter, 'selection');
            }
            return array;
        }

        function bubbleSort(array) {
            let isSorted = false;
            let lastUnsorted = array.length - 1;

            while (!isSorted) {
                isSorted = true;
                for (let i = 0; i < lastUnsorted; i++) {
                    if (array[i] > array[i + 1]) {
                        self.counter++;
                        self.utils.swap(array, i, i + 1);
                        isSorted = false;
                        visualizer(array.slice(), self.counter, 'bubble');
                    }
                }
                lastUnsorted--;
            }
            return array
        }

        function mergeSort(array) {

            let i, j, m = 1;

            while (m < array.length) {
                i = j = 0;
                while (i < array.length) {
                    self.counter++;
                    visualizer(array.slice(), self.counter, 'merge');
                    j += merge(i, i += m, i += m);
                }
                !j && (m <<= 1);
                visualizer(array.slice(), self.counter, 'merge');
            }

            function merge(start, middle, end) {
                middle = Math.min(array.length, middle);
                end = Math.min(array.length, end);
                for (; start < middle; start++) {
                    if (array[start] > array[middle]) {
                        let v = array[start];
                        array[start] = array[middle];
                        insert(middle, end, v);
                        return true;
                    }
                }
                return false;
            }

            function insert(start, end, v) {
                while (start + 1 < end && array[start + 1] < v) {
                    self.utils.swap(array, start, start + 1);
                    start++;
                }
                array[start] = v;
            }
        }

        function quickSort(array) {

            return recurse(0, array.length);

            function partition(left, right, pivot) {
                self.counter++;
                let v = array[pivot];
                swap(pivot, --right);
                for (let i = left; i < right; ++i) {
                    self.counter++;
                    if (array[i] <= v) {
                        swap(i, left++);
                    }
                }
                swap(left, right);
                return left;
            }

            function swap(i, j) {
                self.utils.swap(array, i, j);
                visualizer(array.slice(), self.counter, 'quick');
            }

            function recurse(left, right) {
                self.counter++;
                visualizer(array.slice(), self.counter, 'quick');
                if (left < right - 1) {
                    let pivot = partition(left, right, (left + right) >> 1);
                    recurse(left, pivot);
                    recurse(pivot + 1, right);
                }
                return array;
            }
        }

        return self;
    };


    SortAlgorithms.prototype = {
        utils: {
            assertString: function (string) {
                const isString = typeof string === 'string';
                if (!isString) throw new Error(`Parameter needs to be a type of string: ${string}`);
            },
            assertArray: function (array) {
                const isArray = array instanceof Array;
                if (!isArray) throw new Error(`Parameter needs to be an instance of Array: ${array}`);
            },
            swap: function swap(array, left, right) {
                let tmp = array[left];
                array[left] = array[right];
                array[right] = tmp;
            }
        },
        use: function (algorithm) {
            this.utils.assertString(algorithm);
            this.counter = 0;
            return {
                sort: function (array) {
                    this.utils.assertArray(array);
                    return this.algorithmMap.get(algorithm.toLowerCase())(array)
                }.bind(this)
            }
        }
    };

    exports.default = exports.SortAlgorithms = SortAlgorithms;
}));