define(function (require) {
  var _ = require('lodash');

  // moduleサービスを取得
  var module = require('modules').get('kibana/circle_vis', ['kibana']);

  // moduleにコントローラを登録
  module.controller('circleVisController', function ($scope, Private) {

    var CircleChart = Private(require('plugins/circle_vis/circle_chart'));
    var chart = new CircleChart();

    // ユーザーが入力したAggregationsの情報を取得
    var metricId = $scope.vis.aggs.bySchemaGroup.metrics[1].id;
    var bucketIds = $scope.vis.aggs.bySchemaGroup.buckets;

    // Elasticsearchのレスポンスの変化を監視
    $scope.$watch('esResponse', function (resp) {
      if (resp) {
        // D3.jsで描画するときに扱いやすいように、Elasticsearchのレスポンスを加工する
        var createChildren = function (data, index) {
          return _.map(data[bucketIds[index].id].buckets, function (v) {
            var child = {'name': v.key};
            if (v[metricId]) child['size'] = v[metricId].value;
            if (bucketIds[index + 1] && v[bucketIds[index + 1].id]) child['children'] = createChildren(v, index + 1);
            return child;
          });
        };
        var res = {
          'name': 'root',
          'children': createChildren(resp.aggregations, 0)
        };

        // グラフの描画をおこなう
        chart.draw(res, $scope.vis.params.diameter);
      }
    });
  });
});