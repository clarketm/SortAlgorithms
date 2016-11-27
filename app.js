'use strict';

function video1() {
  document.body.innerHTML = `<h1>Hello from ${d3.version}</h1>`;
}

function video2() {
  const linearScale = d3.scaleLinear()
    .domain([0, 100])
    .range([0, 600]) //normalize all value thats passed into the scale that falls within 0 and 1
    .clamp(true);

  console.log(linearScale(-20));
  console.log(linearScale(50));
  console.log(linearScale(105));

  console.log(linearScale.invert(600));
}

function video3() {
  // initialize timeScale
  const timeScale = d3.scaleTime()
    .domain([new Date(2016, 0 , 1), new Date()])
    .range([0, 100]);

  // finding midpoint between now and january 1st of 2016
  console.log(timeScale.invert(50));
}

function video4() {
  // 0 - 100 gets mapped into three pieces
  const quantizeScale = d3.scaleQuantize()
    .domain([0, 100])
    .range(["red", "green", "white"]);

  console.log(quantizeScale(50));
  console.log(quantizeScale(69));
  console.log(quantizeScale(49));
  console.log(quantizeScale(12));

// computes all values that will map to white
  console.log(quantizeScale.invertExtent('white'));
}

function video5() {
  // maps inputs to specific outputs
  const ordinalScale = d3.scaleOrdinal()
    .domain(["poor", "good", "great"])
    .range(["red", "green", "white"]);

  console.log(ordinalScale("poor"));
  console.log(ordinalScale("good"));
  console.log(ordinalScale("great"));
}

function video6() {
  // selects elements on a page
  let div = d3.select('div');
  console.log(div.nodes());

  let divLinks = div.selectAll('a');
  console.log(divLinks.nodes());

  console.log(d3.selectAll('div a').nodes());
  console.log(d3.selectAll('.action').nodes());
}

function video7() {
  // selecting and modifying elements
  d3.selectAll('a:nth-child(2)')
    .attr('href', 'http://www.google.com')
    .classed('red', true)
    .html('Inventory');
}

function creatingDomElements() {
  d3.select('.title')
    .append('div')
    .style('color', 'red')
    .html('Inventory <b>SALE</b>');
}

function creatingChart() {
  const scores = [
    { name: 'Quicksort', score: 96 },
    { name: 'Billy', score: 83 },
    { name: 'Cindy', score: 91 },
    { name: 'David', score: 96 },
    { name: 'Emily', score: 88 }
  ];

  let update = d3.select('.chart')
    .selectAll('div')
    .data(scores, function(d) {
      return d ? d.name : this.innerText;
    })
    .style('color', 'blue');

  let enter = update.enter()
    .append('div')
    .text(function(d) {
      return d.name;
    })
    .style('color', 'green');

  update.exit().remove();

  update.merge(enter)
    .style('height', '50px')
    .style('width', d => d.score + 'px')
    .style('background', 'lightgreen')
    .style('border', '1px solid black');
}

const data = [ 0, 2, 5, 9, 1, 3, 2, 8, 3, 4, 2, 0, 6, 5, 2, 8, 6, 7, 8, 9, 1, 2 ];
let counter = 0;

bubbleSort(data);

function bubbleSort(array) {
  array = array.slice();
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
        (function(arr, _counter) {
          setTimeout(function() {
            let dataUpdate = d3
              .select('.visual')
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
        })(array.slice(), ++counter);
      }
      current++;
      next++;
    }
    stoppingPoint--;
  }
  return array;
}