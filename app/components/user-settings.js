'use strict';

/**
 * @ngdoc directive
 * @name UserSettings
 * @module app
 * @restrict E
 * @description
 *
 * The UserSettings directive displays the user settings form and handles updates
 *
 */

angular
  .module('app')
  .directive('userSettings', UserSettings);

//////////////////////////////////////////

export default function UserSettings() {
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
    // Get the current user
    this.user = UserService.user;

    this.notificationFields = [
      {
        field: 'favorites',
        label: 'email me when my posts are marked as favorites'
      },
      {
        field: 'mentions',
        label: 'email me when I\'m mentioned'
      },
      {
        field: 'replies',
        label: 'email me when I get a reply'
      },
      {
        field: 'follows',
        label: 'email me when someone follows me'
      }
    ];

    this.privacyTagOptions = [
      {
        value: 3,
        label: 'allow anyone to tag me'
      },
      {
        value: 2,
        label: 'only allow people I follow to tag me'
      },
      {
        value: 1,
        label: 'don\'t allow anyone to tag me'
      }
    ];

    this.privacyFields = [
      {
        field: 'location',
        label: 'add a location to my posts'
      },
      {
        field: 'email_address',
        label: 'let others find me by my email address'
      },
      {
        field: 'ads',
        label: 'tailor ads based on my information'
      }
    ];
  }

  // Submit handler for settings
  handleSaveSettings() {}

  // Toggle the model value boolean
  toggleValue(model) {
    return model = !model;
  }
}
Controller.$inject = ['UserService'];

// Template
function Template() {
  return `
  <form
    class="user-settings"
    ng-submit="vm.handleSaveSettings()"
  >
    <h2>Account</h2>
    <section class="user-settings__account block--avatar">

      <div class="account__avatar">
        <div class="avatar avatar--large">
          <img src="{{vm.user.avatar}}" />
        </div>
        <button
          class="button button--outline"
          ng-click="handleAvatarChange()"
        >Change</button>
      </div>

      <label class="form__field">
        <input class="form__field__input" type="text" ng-model="vm.user.name" />
        <span class="icon-user"></span>
      </label>

      <label class="form__field">
        <input class="form__field__input" type="email" ng-model="vm.user.email" />
        <span class="icon-email"></span>
      </label>

      <label class="form__field">
        <input required class="form__field__input form__field__input--pass" type="password" placeholder="&bullet;&bullet;&bullet;&bullet;&bullet;" ng-model="vm.user.password" />
        <span class="icon-password"></span>
      </label>

    </section>
    <hr />

    <h2>Notifications</h2>
    <label
      class="form__label"
      ng-repeat="nField in vm.notificationFields">
      <span
        class="form__toggle"
        ng-class="{
          'form__toggle--on': vm.user.notifications[nField.field],
          'form__toggle--off': !vm.user.notifications[nField.field]
        }"
        ng-click="vm.user.notifications[nField.field] = !vm.user.notifications[nField.field];"></span>
        {{nField.label}}
    </label>
    <hr />

    <h2>Privacy</h2>
    <label
      class="form__label"
      ng-repeat="tagOption in vm.privacyTagOptions">
      <span
        class="form__radio"
        ng-class="{
          'form__radio--on': vm.user.privacy.tag == tagOption.value,
          'form__radio--off': !vm.user.privacy.tag == tagOption.value
        }"
      >
        <input
          type="radio"
          class="form__radio__input"
          ng-model="vm.user.privacy.tag"
          value="{{tagOption.value}}" />

      </span>
      {{tagOption.label}}
    </label>

    <label
      class="form__label"
      ng-repeat="pField in vm.privacyFields">
      <span
        class="form__toggle"
        ng-class="{
          'form__toggle--on': vm.user.privacy[pField.Field],
          'form__toggle--off': !vm.user.privacy[pField.Field]
        }"
        ng-click="vm.user.privacy[pField.field] = !vm.user.privacy[pField.field];"></span>
        {{pField.label}}
    </label>
    <hr />

    <button
      type="submit"
      class="button button--primary">Save Changes</button>

  </form>
  `;
}
