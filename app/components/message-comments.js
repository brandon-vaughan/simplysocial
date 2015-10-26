'use strict';

/**
 * @ngdoc directive
 * @name MessageComments
 * @module app
 * @restrict E
 * @description
 *
 * The MessageComments directive displays all the comments it receives and
 * provides a reply message form
 *
 */

angular
  .module('app')
  .directive('messageComments', MessageComments);

/////////////////////////////////////////////////

// MessageComments
export default function MessageComments() {
  return {
    restrict: 'E',
    scope: {
      comments: '='
    },
    template: Template(),
    controller: Controller,
    controllerAs: 'vm',
    bindToController: true
  }
}

// Controller
class Controller {
  constructor() {}

  // @TODO: Post the reply message
  handleReply() {}
}

// Template
function Template() {
  return `
    <div class="comments section--well">
      <recursive>
        <social-message
          ng-repeat="message in vm.comments"
          message="message"
        ></social-message>
      </recursive>

      <form
        class="comments__reply"
        ng-submit="handleReply()"
      >
        <div
          class="comments__reply__field"
          contentEditable="true"
          data-placeholder="Reply..."
          ng-model="vm.replyMessage"
        ></div>
      </form>
    </div>
  `;
}
