(function() {
    'use strict';

    let sortAlgorithms = new SortAlgorithms(visualizer);
    let testArray = [0, 1, 4, 3, 9, 6, 7, 3, 0];

    sortAlgorithms
        .use('insertion')
        .sort(testArray);

    sortAlgorithms
        .use('selection')
        .sort(testArray);

    sortAlgorithms
        .use('bubble')
        .sort(testArray);

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
                    .merge(dataEnter)
                    .style('height', '10px')
                    .style('width', d => (d + 1) * 5 + 'px')
                    .style('background', 'lightgreen')
                    .style('border', '1px solid black');
            }, 80 * _counter);
        })(array.slice(), ++counter, algorithm);
    }
})();