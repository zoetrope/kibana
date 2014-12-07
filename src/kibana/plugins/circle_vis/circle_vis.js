define(function (require) {
  // 利用するCSSとControllerを読み込む
  require('css!plugins/circle_vis/circle_vis.css');
  require('plugins/circle_vis/circle_vis_controller');

  return function (Private) {
    var TemplateVisType = Private(require('plugins/vis_types/template/template_vis_type'));
    var Schemas = Private(require('plugins/vis_types/_schemas'));

    return new TemplateVisType({
      // グラフを一意に示す名前
      name: 'circle',
      // 画面に表示される名前
      title: 'Circle',
      // アイコン(Font Awesomeのアイコン名を指定)
      icon: 'fa-circle-o',
      // このグラフのテンプレートファイル
      template: require('text!plugins/circle_vis/circle_vis.html'),
      // このグラフ特有のパラメータ
      params: {
        // パラメータのデフォルト値
        defaults: {
          // 一番外側の円の直径
          diameter: 960
        },
        // パラメータ入力画面(画面左のサイドバーに表示される)
        editor: require('text!plugins/circle_vis/circle_vis_params.html')
      },
      // Elasticsearchに投げるクエリのAggregationsの定義
      schemas: new Schemas([
        {
          // 円のサイズを決めるための項目
          group: 'metrics',
          name: 'metric',
          title: 'Metric',
          min: 2,
          max: 2,
          defaults: [
            { schema: 'metric', type: 'count' }
          ]
        },
        {
          // グルーピングの項目。複数入力可能
          group: 'buckets',
          name: 'segment',
          title: 'Grouping',
          min: 1
        }
      ])
    });
  };
});
