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
                    visualizer(array.slice(), ++self.counter, 'insertion');
                }
                ptr++;
                p1 = ptr;
                p2 = p1 - 1;
            }
            return array;
        }

        function selectionSort(array) {
            array = array.slice();

            for (let i = 0; i < array.length - 1; i++) {
                for (let j = i + 1; j < array.length; j++) {
                    if (array[j] < array[i]) {
                        self.utils.swap(array, i, j);
                    }
                    visualizer(array.slice(), ++self.counter, 'selection');
                }
            }
            return array;
        }

        function bubbleSort(array) {
            array = array.slice();

            let isSorted = false,
                stoppingPoint = array.length;

            while (!isSorted) {
                isSorted = true;
                for (let current = 0, next = 1; next < stoppingPoint;) {
                    if (array[current] > array[next]) {
                        isSorted = false;
                        let tmp = array[current];
                        array[current] = array[next];
                        array[next] = tmp;
                        visualizer(array.slice(), ++self.counter, 'bubble');
                    }
                    current++;
                    next++;
                }
                stoppingPoint--;
            }
            return array;
        }

        function mergeSort(array) {

            let n = array.length, a0 = array, a1 = new Array(n), m, i;
            for (m = 1; m < n; m <<= 1) {
                for (i = 0; i < n; i += m << 1) {
                    let left = i,
                        right = Math.min(i + m, n),
                        end = Math.min(i + (m << 1), n);
                    merge(a0, a1, left, right, end);
                    visualizer(a1.slice(), ++self.counter, 'merge');
                }
                i = a0, a0 = a1, a1 = i;
            }
            if (array === a1) {
                for (let i = 0; i < n; ++i) {
                    array[i] = a0[i];
                }
            }

            function merge(a0, a1, left, right, end) {
                for (let i0 = left, i1 = right; left < end; ++left) {
                    if (i0 < right && (i1 >= end || a0[i0] <= a0[i1])) {
                        a1[left] = a0[i0++];
                    } else {
                        a1[left] = a0[i1++];
                    }
                }
            }
        }

        function quickSort(array) {
            // TODO: fix quickSort visualizer

            return _quickSort(array.slice(), 0, array.length);

            function _quickSort(array, left, right) {
                visualizer(array.slice(), ++self.counter, 'quick');

                if (left < right - 1) {
                    let pivot = left + right >> 1;
                    pivot = partition(array, left, right, pivot);
                    _quickSort(array, left, pivot);
                    _quickSort(array, pivot + 1, right);
                }
            }

            function partition(array, left, right, pivot) {
                let pivotValue = array[pivot];
                self.utils.swap(array, pivot, --right);
                for (let i = left; i < right; ++i) {
                    if (array[i] < pivotValue) {
                        self.utils.swap(array, i, left++);
                    }
                }
                self.utils.swap(array, left, right);
                return left;
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