'use strict';

/**
 * @ngdoc directive
 * @name Modal
 * @module app
 * @restrict E
 * @description
 *
 * The Modal directive is a simple wrapper that contains a close button and
 * exposes a factory for handling the open/close of the modal;
 *
 */

angular
  .module('app')
  .directive('modal', Modal);

//////////////////////////////////////////

export default function Modal() {
  return {
    restrict: 'E',
    scope: {
      open: '=',
      size: '@size'
    },
    transclude: true,
    template: Template(),
    controller: Controller,
    controllerAs: 'vm',
    bindToController: true
  }
}

// Controller
class Controller {
  constructor() {
    this.size = this.size || 'medium';
  }

  close() {
    this.open = false;
  }
}

// Template
function Template() {
  return `
    <div
      class="modal modal--{{vm.size}}"
      ng-if="vm.open"
      ng-click="vm.close()">
      <div
        class="modal__container"
        ng-click="$event.stopPropagation()">
        <button
          class="button button--close icon-close"
          ng-click="vm.close()"></button>
        <div ng-transclude></div>
      </div>
    </div>
  `;
}

