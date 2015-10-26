'use strict';

import MessageFeed from './message-feed';

/**
 * @ngdoc directive
 * @name UserProfile
 * @module app
 * @restrict E
 * @description
 *
 * The UserProfile directive displays the user profile feeds
 *
 */

angular
  .module('app')
  .directive('userProfile', UserProfile);

//////////////////////////////////////////

export default function UserProfile() {
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
  constructor(UserService, MessageService) {
    this.user = UserService.user;

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
Controller.$inject = ['UserService', 'MessageService'];

// Template
function Template() {
  return `
    <header class="user-profile__header section--header">
      <div class="layout--container">
        <div class="user-profile__card">
          <div class="avatar avatar--large">
            <img src="{{vm.user.avatar}}" />
          </div>

          <h1>{{vm.user.name}}</h1>
          <div ng-bind-html="vm.user.bio"></div>
          <a href="{{vm.user.website}}">{{vm.user.website}}</a>
        </div>

        <nav class="user-profile__nav nav">
          <button
            class="nav__item"
            ng-class="{'nav__item--active': vm.filter === 'profile-feed'}"
            ng-click="vm.fetchFeed('profile-feed')"
          >{{vm.user.firstname}}'s feed</button>

          <button
            class="nav__item"
            ng-class="{'nav__item--active': vm.filter === 'followers'}"
            ng-click="vm.fetchFeed('followers')"
          >2,542 followers</button>

          <button
            class="nav__item"
            ng-class="{'nav__item--active': vm.filter === 'following'}"
            ng-click="vm.fetchFeed('following')"
          >517 Following</button>
        </nav>
      </div>
    </header>

    <message-feed
      layout="vm.layout"
      feed="vm.feed"
    ></message-feed>
  `;
}
