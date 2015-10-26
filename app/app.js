'use strict';

/**
 * Initialize App
 */

import angular from 'angular';
import ngSanitize from 'angular-sanitize';
import ngRoute from 'angular-route';

export default angular
  .module('app', [
    ngSanitize,
    ngRoute
  ]).name;
