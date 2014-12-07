define(function (require) {
  return function CircleChartFactory(d3, Private) {

    function CircleChart() {
    }

    CircleChart.prototype.draw = function (data, diameter) {
      var format = d3.format(',d');

      var pack = d3.layout.pack()
        .size([diameter - 4, diameter - 4])
        .value(function (d) {
          return d.size;
        });

      d3.select('.circle-vis').selectAll('svg').remove();

      var svg = d3.select('.circle-vis')
        .append('svg')
        .attr('width', diameter)
        .attr('height', diameter)
        .append('g')
        .attr('transform', 'translate(2,2)');

      d3.select(this.frameElement).style('height', diameter + 'px');

      var node = svg.datum(data).selectAll('.node')
        .data(pack.nodes)
        .enter().append('g')
        .attr('class', function (d) {
          return d.children ? 'node' : 'leaf node';
        })
        .attr('transform', function (d) {
          return 'translate(' + d.x + ',' + d.y + ')';
        });

      node.append('title')
        .text(function (d) {
          return d.name + (d.children ? '' : ': ' + format(d.size));
        });

      node.append('circle')
        .attr('class', 'circle')
        .attr('r', function (d) {
          return d.r;
        });

      node.filter(function (d) {
        return !d.children;
      }).append('text')
        .attr('dy', '.3em')
        .style('text-anchor', 'middle')
        .text(function (d) {
          return d.name.substring(0, d.r / 3);
        });
    };

    return CircleChart;
  };
});
