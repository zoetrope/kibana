define(function (require) {
  // 新しいグラフの種類を登録
  require('registry/vis_types').register(function (Private) {
    return Private(require('plugins/circle_vis/circle_vis'));
  });
});