//おそらくこのカスタムディレクティブがselectコントローラーをしらないと思われる。
//ルーティングされてるcat.htmlはしっているコントローラーを。
app.directive('dir', function($compile, $parse) {
  return {
    restrict: 'E',
    controller:'selectController',
    link: function(scope, element, attr) {
      scope.$watch(attr.content, function() {
        var getter = $parse(attr.content);
        var treeEl = getter(scope);
        element.html(treeEl);
        var linkFn = $compile(element.contents());
        linkFn(scope);
      }, true);
    }
  }
});
