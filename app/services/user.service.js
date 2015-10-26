'use strict';

/**
 * @ngdoc service
 * @name UserService
 * @module app
 * @description
 *
 * UserService fetches user data from our api
 *
 */

angular
  .module('app')
  .service('UserService', UserService);

///////////////////////////////////////////

// Service
class Service {
  constructor($http) {
    this.$http = $http;
  }

  /**
   * profile Get the current logged in user profile
   * @return {obj} user profile object
   */
  profile() {
    return this.$http.get('/api/profile.json').then(_handleProfile.bind(this));

    // Bind the result to the service current user
    function _handleProfile(result) {
      this.user = result.data;
      return result.data;
    }
  }
}

// Initialize Service
function UserService($http) {
  return new Service($http);
};
UserService.$inject = ['$http'];
