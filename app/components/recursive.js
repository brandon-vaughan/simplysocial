'use strict';

/**
 * @ngdoc directive
 * @name Recursive
 * @module app
 * @restrict EACM
 * @description
 *
 * The Recursive directive is a simple wrapper that contains a recursive
 * directive and prevent the angular endless loop
 *
 */

angular
  .module('app')
  .directive('recursive', Recursive);

//////////////////////////////////////////

export default function Recursive($compile) {
  return {
    restrict: 'EACM',
    priority: 100000,
    compile: _compile
  };
}

function _compile(tElement, tAttr) {
  var contents = tElement.contents().remove();
  var compiledContents;

  return function(scope, iElement, iAttr) {
    if (!compiledContents) {
      compiledContents = $compile(contents);
    }

    iElement.append(compiledContents(scope, function(clone) {
      return clone;
    }));
  };
}
