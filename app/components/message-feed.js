'use strict';

/**
 * @ngdoc directive
 * @name MessageFeed
 * @module app
 * @restrict E
 * @description
 *
 * The MessageFeed directive is a feed of social messages with the option to
 * toggle the layout display.
 *
 */

import SocialMessage from './social-message';

angular
  .module('app')
  .directive('messageFeed', MessageFeed);

//////////////////////////////////////////

// MessageFeed
export default function MessageFeed() {
  return {
    restrict: 'E',
    scope: {
      layout: '=',
      feed: '='
    },
    template: Template(),
    controller: Controller,
    controllerAs: 'vm',
    bindToController: true
  }
}

// Controller
class Controller {
  constructor() {
    this.layout = this.filter || 'list';
  }
}

// Template
function Template() {
  return `
    <section
      class="section--message-feed message-feed message-feed--{{vm.layout}}"
      ng-class="{
        'layout-container': vm.layout === 'list',
        'layout-container--max': vm.layout === 'tile'
      }"
    >
      <social-message
        ng-repeat="message in vm.feed"
        message="message"
      ></social-message>
    </section>
  `;
}
