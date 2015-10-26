'use strict';

/**
 * @ngdoc directive
 * @name SearchBox
 * @module app
 * @restrict E
 * @description
 *
 * The SearchBox directive is a search field with a dropdown auto-suggest
 * similar to twitter
 *
 */

angular
  .module('app')
  .directive('searchBox', SearchBox);

//////////////////////////////////////////

export default function SearchBox() {
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
  constructor() {}

  // Submit search query for results in feed
  handleSearch() {
  }

  // Auto suggest users based on query
  suggest() {

  }
}

// Template
function Template() {
  return `
    <div class="search-box">
      <form class="search-box__field">
        <input
          class="search-box__field__input form--input"
          ng-model="vm.query"
        />
        <button
          type="submit"
          class="button button--icon icon-search">
          <span class="accessibility">Search</span>
        </button>
      </form>

      <!-- @TODO: Implement suggestions -->
      <div
        class="dropdown"
        ng-if="vm.suggestions.lenth"
      ></div>
    </div>
  `;
}
