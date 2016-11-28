(function() {
    'use strict';

    let sortAlgorithms = new SortAlgorithms(visualizer);
    let testArray = [];
    initializeGraphs();

    let inputText = document.getElementById('inputTextData');

    inputText.addEventListener('focusout', function(event) {
        testArray = getArrayFromInput();
        initializeGraphs();
    });

    document
        .getElementById('startButton')
        .addEventListener('click', function(event) {

            let arrayInput = getArrayFromInput();

            if (arrayInput.length > 0) testArray = arrayInput.slice();

            initializeGraphs();

            sortAlgorithms
                .use('insertion')
                .sort(testArray);

            sortAlgorithms
                .use('selection')
                .sort(testArray);

            sortAlgorithms
                .use('bubble')
                .sort(testArray);

            sortAlgorithms
                .use('merge')
                .sort(testArray);

            sortAlgorithms
                .use('quick')
                .sort(testArray);
        });

    function visualizer(array, counter, algorithm) {
        (function(arr, _counter, _algorithm) {
            setTimeout(function() {
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
            }, 80 * _counter);
        })(array.slice(), ++counter, algorithm);
    }

    function getArrayFromInput() {
        console.log(inputText);
        return inputText.value.trim().split(',').reduce(function(previous, curr) {
            if (curr.length <= 0) {
                return previous;
            }
            if (typeof curr === 'string' && !isNaN(curr)) {
                previous.push(Number(curr));
            } else {
                console.log('curr', curr);
                alert('please enter a valid comma separated numbers as input');
            }
            return previous;
        }, []);
    }

    function initializeGraphs() {
        visualizer(testArray.slice(), 0, 'insertion');
        visualizer(testArray.slice(), 0, 'selection');
        visualizer(testArray.slice(), 0, 'bubble');
        visualizer(testArray.slice(), 0, 'merge');
        visualizer(testArray.slice(), 0, 'quick');
    }
})();