'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

;(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['exports'], factory);
    } else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object' && typeof exports.nodeName !== 'string') {
        factory(exports);
    } else {
        factory(root);
    }
})(undefined || window, function (exports) {
    'use strict';

    var SortAlgorithms = function SortAlgorithms(visualizer) {

        var self = this;

        self.counter = 0;

        self.algorithmMap = new Map([['insertion', insertionSort], ['selection', selectionSort], ['bubble', bubbleSort], ['merge', mergeSort], ['quick', quickSort]]);

        function insertionSort(array) {
            array = array.slice();

            for (var i = 1; i < array.length; i++) {
                for (var j = i; j > 0 && array[j] < array[j - 1]; j--) {
                    self.counter++;
                    // console.log("insertionSort", self.counter);
                    self.utils.swap(array, j, j - 1);
                    visualizer(array.slice(), self.counter, 'insertion');
                }
            }
            return array;
        }

        function selectionSort(array) {
            array = array.slice();

            for (var i = 0; i < array.length - 1; i++) {
                var min = i;
                for (var j = i + 1; j < array.length; j++) {
                    self.counter++;
                    // console.log("selectionSort", self.counter);

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
            array = array.slice();

            var isSorted = false;
            var lastUnsorted = array.length - 1;

            while (!isSorted) {
                isSorted = true;
                for (var i = 0; i < lastUnsorted; i++) {
                    self.counter++;
                    if (array[i] > array[i + 1]) {
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
            var i,
                j,
                n = array.length,
                m = 1;
            // double the size each pass
            while (m < array.length) {
                i = j = 0;
                while (i < array.length) {
                    self.counter++;
                    j += merge(i, i += m, i += m);
                }
                if (!j) {
                    m <<= 1;
                }
                visualizer(array.slice(), self.counter, 'merge');
            }
            // Merges two adjacent sorted arrays in-place.
            function merge(start, middle, end) {
                middle = Math.min(array.length, middle);
                end = Math.min(array.length, end);
                for (; start < middle; start++) {
                    if (array[start] > array[middle]) {
                        var v = array[start];
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
            // TODO: fix quickSort visualizer

            return _quickSort(array.slice(), 0, array.length);

            function _quickSort(array, left, right) {
                visualizer(array.slice(), ++self.counter, 'quick');

                if (left < right - 1) {
                    var pivot = left + right >> 1;
                    pivot = partition(array, left, right, pivot);
                    _quickSort(array, left, pivot);
                    _quickSort(array, pivot + 1, right);
                }
            }

            function partition(array, left, right, pivot) {
                var pivotValue = array[pivot];
                self.utils.swap(array, pivot, --right);
                for (var i = left; i < right; ++i) {
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
            assertString: function assertString(string) {
                var isString = typeof string === 'string';
                if (!isString) throw new Error('Parameter needs to be a type of string: ' + string);
            },
            assertArray: function assertArray(array) {
                var isArray = array instanceof Array;
                if (!isArray) throw new Error('Parameter needs to be an instance of Array: ' + array);
            },
            swap: function swap(array, left, right) {
                var tmp = array[left];
                array[left] = array[right];
                array[right] = tmp;
            }
        },
        use: function use(algorithm) {
            this.utils.assertString(algorithm);
            this.counter = 0;
            return {
                sort: function (array) {
                    this.utils.assertArray(array);
                    return this.algorithmMap.get(algorithm.toLowerCase())(array);
                }.bind(this)
            };
        }
    };

    exports.default = exports.SortAlgorithms = SortAlgorithms;
});
'use strict';

var _slicedToArray = function () {
    function sliceIterator(arr, i) {
        var _arr = [];
        var _n = true;
        var _d = false;
        var _e = undefined;
        try {
            for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
                _arr.push(_s.value);
                if (i && _arr.length === i) break;
            }
        } catch (err) {
            _d = true;
            _e = err;
        } finally {
            try {
                if (!_n && _i["return"]) _i["return"]();
            } finally {
                if (_d) throw _e;
            }
        }
        return _arr;
    }

    return function (arr, i) {
        if (Array.isArray(arr)) {
            return arr;
        } else if (Symbol.iterator in Object(arr)) {
            return sliceIterator(arr, i);
        } else {
            throw new TypeError("Invalid attempt to destructure non-iterable instance");
        }
    };
}();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

;(function (root, factory) {
    "use strict";

    if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object' && typeof exports.nodeName !== 'string') {
        root.document ? factory(root, require('sort-algorithms'), true) : function (w) {
            if (!w.document) {
                throw new Error("Visualizer requires a window with a document");
            }
            return factory(w, require('sort-algorithms'));
        };
    } else {
        factory(root, root.SortAlgorithms);
    }
})(undefined || window, function (window, SortAlgorithms, noGlobal) {
    'use strict';

    var document = window.document;
    var timeouts = [],
        queue = [],
        duration = 2000;

    function clearTimeouts() {
        return new Promise(function (resolve, reject) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = timeouts.concat(queue)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var timeout = _step.value;

                    window.clearTimeout(timeout);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            (timeouts = []) && (queue = []) && resolve("complete");
        });
    }

    function clearGraphs(algorithmMap, resize) {
        return new Promise(function (resolve, reject) {
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = algorithmMap[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var _step2$value = _slicedToArray(_step2.value, 1),
                        algorithm = _step2$value[0];

                    var el = document.getElementsByClassName(algorithm)[0];
                    el.innerHTML = '';
                    resize && (el.style.height = '5px');
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            resize && resolve("resize") || resolve("complete");
        });
    }

    function reset(algorithmMap, reset) {
        return [clearTimeouts(), clearGraphs(algorithmMap, reset)];
    }

    function getSortingAlgorithms() {
        return new SortAlgorithms(visualizer);
    }

    function getArrayFromInput() {
        return document.getElementById('inputTextData').value.trim().split(',').reduce(function (previous, current) {
            if (!current || isNaN(current)) {
                return;
            }
            previous.push(Number(current));
            return previous;
        }, []);
    }

    function clearInput() {
        return document.getElementById('inputTextData').value = '';
    }

    function initializeGraphs(inputArray, algorithmMap) {
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
            for (var _iterator3 = algorithmMap[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var _step3$value = _slicedToArray(_step3.value, 1),
                    algorithm = _step3$value[0];

                var el = document.getElementsByClassName(algorithm)[0];
                visualizer(inputArray.slice(), 0, algorithm);
                el.style.height = Math.max(inputArray.length * 5 + 3, 100) + 'px';
            }
        } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                    _iterator3.return();
                }
            } finally {
                if (_didIteratorError3) {
                    throw _iteratorError3;
                }
            }
        }
    }

    function visualizer(array, counter, algorithm) {
        var timeout = void 0,
            start = void 0;

        // TODO: implement Promise height transition.
        (function (array, counter, algorithm) {
            start = setTimeout(function () {
                timeout = startAlgorithms(array, counter, algorithm);
                timeouts.push(timeout);
            }, timeouts.length ? 100 : 100 + duration);
            queue.push(start);
        })(array, counter, algorithm);

        function startAlgorithms(array, counter, algorithm) {
            return function (array, counter, algorithm) {
                return setTimeout(function () {
                    var dataUpdate = d3.select('.' + algorithm).selectAll('div').data(array);

                    var dataEnter = dataUpdate.enter().append('div');

                    dataUpdate.exit().remove();

                    dataUpdate.merge(dataEnter).style('height', '4px').style('width', function (d) {
                        return (d + 1) * 2 + '%';
                    }).style('border', '1px solid black').style('background', '#999').style('margin', '1px');
                }, 100 * counter);
            }(array, counter, algorithm);
        }
    }

    (function initializeButtonListener() {
        var startEl = document.getElementById('startButton'),
            clearEl = document.getElementById('clearButton');

        startEl.addEventListener('click', function (e) {
            var sortAlgorithms = getSortingAlgorithms(),
                inputArray = e.detail.reset || getArrayFromInput() || [];

            if (!inputArray.length || e.detail.reset) {
                return Promise.all(reset(sortAlgorithms.algorithmMap, e.detail.reset)).then(function (result) {
                    return result[1] === 'resize' ? true : alert('Please enter a comma separated list of numbers.');
                });
            }

            startEl.textContent = 'RESTART';

            return Promise.all(reset(sortAlgorithms.algorithmMap)).then(function (result) {
                initializeGraphs(inputArray, sortAlgorithms.algorithmMap);

                sortAlgorithms.use('insertion').sort(inputArray);

                sortAlgorithms.use('selection').sort(inputArray);

                sortAlgorithms.use('bubble').sort(inputArray);

                sortAlgorithms.use('merge').sort(inputArray);

                sortAlgorithms.use('quick').sort(inputArray);
            });
        });

        clearEl.addEventListener('click', function (e) {
            startEl.textContent = 'START';
            clearInput();
            startEl.dispatchEvent(new CustomEvent('click', {
                detail: {
                    reset: true
                }
            }));
        });
    })();
});
