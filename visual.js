(function() {
    'use strict';

    let sortAlgorithms = new SortAlgorithms(visualizer);
    let testArray = [0, 3, 13, 6, 33, 3, 12, 1, 4, 6, 9, 22, 19, 14, 31, 7, 3, 0, 15, 10, 3, 12, 1, 4, 6, 9, 22, 19];

    document
        .getElementById('startButton')
        .addEventListener('click', function(event) {
            let inputText = document.getElementById('inputTextData');

            let arrayInput = inputText.value.trim().split(',').reduce(function(previous, curr) {
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

            if (arrayInput.length > 0) testArray = arrayInput.slice();

            inputText.placeholder = testArray.toString();

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
})();