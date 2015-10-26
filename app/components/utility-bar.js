'use strict';

/**
 * @ngdoc directive
 * @name UtilityBar
 * @module app
 * @restrict E
 * @description
 *
 * The UtilityBar directive displays main header utility bar
 *
 */

import ComposeMessage from './compose-message';
import SearchBox from './search-box';
import UserDropdown from './user-dropdown';

angular
  .module('app')
  .directive('utilityBar', UtilityBar);

///////////////////////////////////////

export default function UtilityBar() {
  return {
    restrict: 'E',
    scope: {},
    template: Template(),
    controller: Controller,
    controllerAs: 'vm',
    bindToController: true
  };
};

// Controller
class Controller {
  constructor() { }

  openModal() {
    this.modalIsOpen = true;
  }
};

// Template
function Template() {
  return `
    <header class="utility-bar">
      <a
        href="/"
        class="icon-logo">
        <span class="accessibility">SimplySocial</span>
      </a>

      <div class="utility-bar__actions">
        <button
          class="utility-bar__button button icon-compose"
          ng-click="vm.openModal()"
        ></button>

        <search-box></search-box>
        <user-dropdown></user-dropdown>
      </div>
    </header>
    <modal open="vm.modalIsOpen">
      <compose-message></compose-message>
    </modal>
  `;
};
