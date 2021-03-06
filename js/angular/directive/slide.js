/**
 * @ngdoc directive
 * @name ionSlide
 * @parent ionic.directive:ionSlideBox
 * @module ionic
 *
 * @description
 * Displays a slide inside of a slidebox.
 *
 * For more complete examples, see {@link ionic.directive:ionSlideBox}.
 *
 * @usage
 * ```html
 * <ion-slide-box>
 *   <ion-slide>1</ion-slide>
 *   <ion-slide>2</ion-slide>
 * </ion-slide-box>
 * ```
 */
IonicModule
.directive('ionSlide', ['$timeout', function($timeout) {
  return {
    restrict: 'E',
    require: '^ionSlideBox',
    transclude: true,
    link: postLink
  };

  function postLink(scope, element, attr, slideBoxCtrl, transclude) {
    element.addClass('slider-slide');

    slideBoxCtrl.onAddSlide();

    var childScope = scope.$new();
    // Disconnect by default, will be reconnected if shown
    ionic.Utils.disconnectScope(childScope);

    transclude(childScope, function(contents) {
      element.append(contents);
    });

    scope.$on('$destroy', function() {
      slideBoxCtrl.onRemoveSlide();
      element.remove();
    });
  }
}]);
