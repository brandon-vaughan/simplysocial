'use strict';

/**
 * @ngdoc directive
 * @name ComposeMessage
 * @module app
 * @restrict E
 * @description
 *
 * The ComposeMessage directive contains the new post message form
 *
 */

angular
  .module('app')
  .directive('composeMessage', ComposeMessage);

//////////////////////////////////////

export default function ComposeMessage() {
  return {
    restrict: 'E',
    scope: {},
    template: Template(),
    controller: Controller,
    controllerAs: 'vm',
    bindToController: true
  };
}

// Controller
class Controller {
  constructor() {}

  // Toggle add media field
  addMedia(type) {
    this.showMedia = type;
  }
};

// Template
function Template() {
  return `
    <form
      class="compose-message"
      ng-submit="vm.handleNewMessage"
    >
      <h1>Create new message</h1>
      <div
        class="compose-message__message form__textrea"
        contentEditable="true"
        data-placeholder="What's on your mind..."
        ng-model="vm.newMessage.message"
      ></div>
      <input
        type="text"
        name="photo"
        class="compose-message__media form__input"
        placeholder="http://example.com/photo"
        ng-if="vm.showMedia === 'photo'"
        ng-model="vm.newMessage.photo"
      />
      <input
        type="text"
        name="video"
        class="compose-message__media form__input"
        placeholder="http://example.com/video"
        ng-if="vm.showMedia === 'video'"
        ng-model="vm.newMessage.video"
      />
      <footer class="compose-message__footer">
        <button
          class="utility-bar__action button button--action icon-photo"
          ng-class="{'button--action--active': vm.showMedia === 'photo'}"
          ng-click="vm.addMedia('photo')"
        >Add Photo</button>
        <button
          class="utility-bar__action button button--action icon-video"
          ng-class="{'button--action--active': vm.showMedia === 'video'}"
          ng-click="vm.addMedia('video')"
        >Add Video</button>
        <button
          type="submit"
          class="button button--primary form__submit"
        >Post</button>
      </footer>
    </form>
  `;
};
