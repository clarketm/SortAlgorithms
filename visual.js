;(function (root, factory) {
    "use strict";

    if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
        root.document ? factory(root, require('sort-algorithms'), true) : function (w) {
            if (!w.document) {
                throw new Error("Visualizer requires a window with a document");
            }
            return factory(w, require('sort-algorithms'));
        };
    } else {
        factory(root, root.SortAlgorithms);
    }
}(this || window, function (window, SortAlgorithms, noGlobal) {
        'use strict';

        const document = window.document;
        let timeouts = [],
            queue = [],
            duration = 2000;

        function clearTimeouts() {
            return new Promise((resolve, reject) => {
                for (let timeout of timeouts.concat(queue)) {
                    window.clearTimeout(timeout);
                }
                (timeouts = []) && (queue = []) && resolve("complete")
            });
        }

        function clearGraphs(algorithmMap, resize) {
            return new Promise((resolve, reject) => {
                for (let [algorithm] of algorithmMap) {
                    let el = document.getElementsByClassName(algorithm)[0];
                    el.innerHTML = '';
                    resize && (el.style.height = '5px');
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
            return document.getElementById('inputTextData').value.trim().split(',').reduce(
                function (previous, current) {
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
            for (let [algorithm] of algorithmMap) {
                let el = document.getElementsByClassName(algorithm)[0];
                visualizer(inputArray.slice(), 0, algorithm);
                el.style.height = `${Math.max(inputArray.length * 5 + 3, 100)}px`;
            }
        }

        function visualizer(array, counter, algorithm) {
            let timeout,
                start;

            // TODO: implement Promise height transition.
            (function (array, counter, algorithm) {
                start = setTimeout(() => {
                    timeout = startAlgorithms(array, counter, algorithm);
                    timeouts.push(timeout);
                }, timeouts.length ? 100 : 100 + duration);
                queue.push(start);
            })(array, counter, algorithm);

            function startAlgorithms(array, counter, algorithm) {
                return (function (array, counter, algorithm) {
                    return setTimeout(function () {
                        let dataUpdate = d3
                            .select(`.${algorithm}`)
                            .selectAll('div')
                            .data(array);

                        let dataEnter = dataUpdate
                            .enter()
                            .append('div');

                        dataUpdate
                            .exit()
                            .remove();

                        dataUpdate
                            .merge(dataEnter)
                            .style('height', '4px')
                            .style('width', d => (d + 1) * 2 + '%')
                            .style('border', '1px solid black')
                            .style('background', '#999')
                            .style('margin', '1px');
                    }, 100 * counter)
                })(array, counter, algorithm);
            }
        }

        (function initializeButtonListener() {
            let startEl = document.getElementById('startButton'),
                clearEl = document.getElementById('clearButton');

            startEl.addEventListener('click', function (e) {
                let sortAlgorithms = getSortingAlgorithms(),
                    inputArray = e.detail.reset || getArrayFromInput() || [];

                if (!inputArray.length || e.detail.reset) {
                    return Promise.all(reset(sortAlgorithms.algorithmMap, e.detail.reset)).then((result) => {
                        return result[1] === 'resize' ? true : alert('Please enter a comma separated list of numbers.');
                    });
                }

                startEl.textContent = 'RESTART';

                return Promise.all(reset(sortAlgorithms.algorithmMap))
                    .then((result) => {
                        initializeGraphs(inputArray, sortAlgorithms.algorithmMap);

                        sortAlgorithms
                            .use('insertion')
                            .sort(inputArray.slice());

                        sortAlgorithms
                            .use('selection')
                            .sort(inputArray.slice());

                        sortAlgorithms
                            .use('bubble')
                            .sort(inputArray.slice());

                        sortAlgorithms
                            .use('merge')
                            .sort(inputArray.slice());

                        sortAlgorithms
                            .use('quick')
                            .sort(inputArray.slice());
                    });
            });

            clearEl.addEventListener('click', function (e) {
                startEl.textContent = 'START';
                clearInput();
                startEl.dispatchEvent(
                    new CustomEvent('click', {
                        detail: {
                            reset: true
                        }
                    }));
            });
        })();
    }
));