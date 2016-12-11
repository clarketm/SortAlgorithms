;(function (root, factory) {
    "use strict";

    if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
        root.document ? factory(root, require('sortalgorithms'), true) : function (w) {
            if (!w.document) {
                throw new Error("Visualizer requires a window with a document");
            }
            return factory(w, require('sortalgorithms'));
        };
    } else {
        factory(root, root.SortAlgorithms);
    }
}(this || window, function (window, SortAlgorithms, noGlobal) {
        'use strict';

        const document = window.document;

        function getSortingAlgorithms() {
            return new SortAlgorithms(visualizer);
        }

        function getArrayFromInput() {
            return document.getElementById('inputTextData').value.trim().split(',').reduce(
                function (previous, curr) {
                    if (curr.length <= 0) {
                        return previous;
                    }
                    if (typeof curr === 'string' && !isNaN(+curr)) {
                        previous.push(Number(curr));
                    } else {
                        alert('please enter a valid comma separated numbers as input');
                    }
                    return previous;
                }, []);
        }

        function initializeGraphs(inputArray) {
            visualizer(inputArray.slice(), 0, 'insertion');
            visualizer(inputArray.slice(), 0, 'selection');
            visualizer(inputArray.slice(), 0, 'bubble');
            visualizer(inputArray.slice(), 0, 'merge');
            visualizer(inputArray.slice(), 0, 'quick');
        }

        function visualizer(array, counter, algorithm) {
            (function (arr, _counter, _algorithm) {
                setTimeout(function () {
                    let dataUpdate = d3
                        .select(`.${_algorithm}`)
                        .selectAll('div')
                        .data(arr);

                    let dataEnter = dataUpdate
                        .enter()
                        .append('div')
                        .style('color', 'green');

                    dataUpdate
                        .exit()
                        .remove();

                    dataUpdate
                        .merge(dataEnter)
                        .style('height', '10px')
                        .style('width', d => (d + 1) * 5 + 'px')
                        .style('background', 'lightgreen')
                        .style('border', '1px solid black');
                }, 100 * _counter);
            })(array.slice(), ++counter, algorithm);
        }

        (function initializeButtonListener() {
            document
                .getElementById('startButton')
                .addEventListener('click', function (event) {

                    let sortAlgorithms = getSortingAlgorithms(),
                        inputArray = getArrayFromInput() || [];

                    initializeGraphs(inputArray);

                    sortAlgorithms
                        .use('insertion')
                        .sort(inputArray);

                    sortAlgorithms
                        .use('selection')
                        .sort(inputArray);

                    sortAlgorithms
                        .use('bubble')
                        .sort(inputArray);

                    sortAlgorithms
                        .use('merge')
                        .sort(inputArray);

                    sortAlgorithms
                        .use('quick')
                        .sort(inputArray);
                });
        })();

    }
));