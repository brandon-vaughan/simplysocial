'use strict';

import MessageFeed from './message-feed';

/**
 * @ngdoc directive
 * @name SocialFeed
 * @module app
 * @restrict E
 * @description
 *
 * The SocialFeed directive is a search field with a dropdown auto-suggest
 * similar to twitter
 *
 */

angular
  .module('app')
  .directive('socialFeed', SocialFeed);

// SocialFeed
export default function SocialFeed() {
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
  constructor(MessageService) {
    this.filter = 'all';
    this.layout = 'list';
    this.Service = MessageService;

    // Grab our initial feed;
    this.fetchFeed(this.filter);
  }

  setLayout(layout) {
    this.layout = layout;
  }

  fetchFeed(filter) {
    this.filter = filter;
    this.Service.get({type: filter})
      .then(this.setFeed.bind(this))
      .catch(this._handleNoFeed.bind(this));
  }

  setFeed(feed) {
    this.feed = feed;
  }

  _handleNoFeed(err) {
    this.error = err.message || 'Sorry we were not able to find any posts';
  }

}
Controller.$inject = ['MessageService'];

// Template
function Template() {
  return `
    <header class="social-feed__header section--header">
      <div class="layout--container">
        <compose-message></compose-message>

        <nav class="social-feed__nav nav">
          <button
            class="nav__item"
            ng-class="{'nav__item--active': vm.filter === 'all'}"
            ng-click="vm.fetchFeed('all')"
          >All Posts</button>

          <button
            class="nav__item"
            ng-class="{'nav__item--active': vm.filter === 'photos'}"
            ng-click="vm.fetchFeed('photos')"
          >Photos</button>

          <button
            class="nav__item"
            ng-class="{'nav__item--active': vm.filter === 'videos'}"
            ng-click="vm.fetchFeed('videos')"
          >Videos</button>

          <div class="nav__actions">
            <button
              class="button button--icon icon-list"
              ng-class="{'button--active': vm.layout === 'list'}"
              ng-click="vm.setLayout('list')"
            ></button>
            <button
              class="button button--icon icon-tile"
              ng-class="{'button--active': vm.layout === 'tile'}"
              ng-click="vm.setLayout('tile')"
            ></button>
          </div>
        </nav>
      </div>
    </header>

    <message-feed
      layout="vm.layout"
      feed="vm.feed"
    ></message-feed>
  `;
}
