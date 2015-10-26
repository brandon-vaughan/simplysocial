'use strict';

import MessageComments from './message-comments';

/**
 * @ngdoc directive
 * @name SocialMessage
 * @module app
 * @restrict E
 * @description
 *
 * The SocialMessage directive is a search field with a dropdown auto-suggest
 * similar to twitter
 *
 */

angular
  .module('app')
  .directive('socialMessage', SocialMessage);

// SocialMessage
export default function SocialMessage() {
  return {
    restrict: 'E',
    scope: {
      message: '=message'
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

  }

  toggleComments() {
    this.commentsIsOpen = !this.commentsIsOpen;
  }

  openModal() {
    this.modalIsOpen = true;
  }

}

// Template
function Template() {
  return `
    <div class="social-message">
      <header class="social-message__header">
        <div class="social-message__avatar">
          <img ng-src="{{vm.message.user.avatar}}" />
        </div>

        <nav class="social-message__actions">
          <button
            class="button button--action button--icon icon-reply"
            ng-click="vm.toggleComments()"
          ></button>
          <button
            class="button button--action button--icon icon-like"
            ng-click="vm.handleLike()"
          ></button>
          <span class="social-message__date button button--action">
            {{vm.message.created_at}}
          </span>
        </nav>

        <span class="social-message__author title">
          {{vm.message.user.name}}
        </span>
        <div class="social-message__text" ng-bind-html="vm.message.text"></div>

        <button
          class="button button--action--sub"
          ng-if="vm.message.comments.length"
          ng-class="{
            'icon-toggle-down': !vm.commentsIsOpen,
            'icon-toggle-up': vm.commentsIsOpen
          }"
          ng-click="vm.toggleComments()"
        >
          {{vm.commentsIsOpen && 'Collapse' || 'Expand'}}
        </button>
      </header>

      <message-comments
        ng-if="vm.commentsIsOpen"
        comments="vm.message.comments"></message-comments>

      <div
        class="social-message__photo"
        ng-if="vm.message.media && vm.message.media.type === 'photo'"
        ng-click="vm.openModal()">
        <img ng-src="{{vm.message.media.url}}" />
      </div>
      <div
        class="social-message__video icon-play"
        ng-if="vm.message.media && vm.message.media.type === 'video'"
        ng-click="vm.openModal()">
        <img ng-src="{{vm.message.media.url}}" />
      </div>

      <nav class="social-message__actions social-message__actions--footer">
        <button
          class="button button--action--sub"
          ng-if="vm.message.comments.length"
          ng-class="{
            'icon-toggle-down': !vm.commentsIsOpen,
            'icon-toggle-up': vm.commentsIsOpen
          }"
          ng-click="vm.toggleComments()"
        >
          {{vm.commentsIsOpen && 'Collapse' || 'Expand'}}
        </button>

        <button
          class="button button--action button--icon icon-reply"
          ng-click="vm.toggleComments()"
        ></button>
        <button
          class="button button--action button--icon icon-like"
          ng-click="vm.handleLike()"
        ></button>
        <span class="social-message__date button button--action">
          {{vm.message.created_at}}
        </span>
      </nav>
    </div>

    <!-- Modal -->
    <modal
      class="social-message--modal"
      open="vm.modalIsOpen"
      size="large"
      ng-if="vm.message.media">
      <div class="social-message">
        <div
          class="social-message__photo"
          ng-if="vm.message.media && vm.message.media.type === 'photo'">
          <img ng-src="{{vm.message.media.url}}" />
        </div>
        <div
          class="social-message__video icon-play"
          ng-if="vm.message.media && vm.message.media.type === 'video'">
          <img ng-src="{{vm.message.media.url}}" />
        </div>

        <header class="social-message__header">
          <div class="social-message__avatar">
            <img ng-src="{{vm.message.user.avatar}}" />
          </div>

          <nav class="social-message__actions">
            <button
              class="button button--action button--icon icon-reply"
              ng-click="vm.toggleComments()"
            ></button>
            <button
              class="button button--action button--icon icon-like"
              ng-click="vm.handleLike()"
            ></button>
            <span class="social-message__date button button--action">
              {{vm.message.created_at}}
            </span>
          </nav>

          <span class="social-message__author title">
            {{vm.message.user.name}}
          </span>
          <div class="social-message__text" ng-bind-html="vm.message.text"></div>
        </header>

        <message-comments
          comments="vm.message.comments"></message-comments>
      </div>
    </modal>
  `;
}
