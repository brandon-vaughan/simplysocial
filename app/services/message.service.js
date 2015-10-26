'use strict';

/**
 * @ngdoc service
 * @name MessageService
 * @module app
 * @description
 *
 * MessageService fetches message data from our api
 *
 */

angular
  .module('app')
  .service('MessageService', MessageService);

///////////////////////////////////////////

// Service
class Service {
  constructor($http) {
    this.$http = $http;
  }

  /**
   * get - Get a collection of messages based on custom query
   * @param  {obj} query custom query params
   * @return {array} message collection
   */
  get(query) {
    let url = ['/api/', query.type, '.json'].join('');
    return this.$http.get(url).then(result => result.data);
  }
}

// Initialize Service
function MessageService($http) {
  return new Service($http);
};
MessageService.$inject = ['$http'];
