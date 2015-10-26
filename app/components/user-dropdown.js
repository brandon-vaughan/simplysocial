'use strict';

/**
 * @ngdoc directive
 * @name UserDropdown
 * @module app
 * @restrict E
 * @description
 *
 * The UserDropdown directive displays a user avatar and navigation items
 *
 */

angular
  .module('app')
  .directive('userDropdown', UserDropdown);

//////////////////////////////////////////

export default function UserDropdown() {
  return {
    restrict: 'E',
    scope: {},
    template: Template(),
    controller: Controller,
    controllerAs: 'vm',
    bindToController: true
  }
}

// Controller
class Controller {
  constructor(UserService) {

    this.user = UserService.user;

    // User drodown pages
    this.pages = [
      {path: '/profile', title: 'Profile'},
      {path: '/followers', title: 'Followers'},
      {path: '/following', title: 'Following'},
      {path: '/settings', title: 'Settings'},
    ]

    this.dropdownIsOpen = false;
  }

  toggleDropdown() {
    this.dropdownIsOpen = !this.dropdownIsOpen;
  }
}
Controller.$inject = ['UserService'];

// Template
function Template() {
  return `
    <section class="user-dropdown">
      <span
        class="user-dropdown__avatar icon-toggle-down"
        ng-click="vm.toggleDropdown()"
      >
        <img src="{{vm.user.avatar}}" />
      </span>

      <div
        class="dropdown"
        ng-if="vm.dropdownIsOpen">
        <a
          class="dropdown__item button button--text"
          href="{{page.path}}"
          ng-repeat="page in vm.pages"
        >
          {{page.title}}
        </a>
      </div>
    </section>
  `;
}
