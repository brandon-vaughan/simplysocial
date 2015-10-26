'use strict';

/**
 * Angular Route config
 */

const Resolves = {
  auth: {
    user: function(UserService) {
      return UserService.profile();
    }
  }
};

const Routes = {
  feed: {
    template: require('../views/social-feed.html'),
    resolve: Resolves.auth
  },
  profile: {
    template: require('../views/profile.html'),
    resolve: Resolves.auth
  },
  followers: {
    template: require('../views/profile.html'),
    resolve: Resolves.auth
  },
  following: {
    template: require('../views/profile.html'),
    resolve: Resolves.auth
  },
  settings: {
    template: require('../views/settings.html'),
    resolve: Resolves.auth
  }
};

const routes = [
  { path: '/', options: Routes.feed },
  { path: '/profile', options: Routes.profile },
  { path: '/followers', options: Routes.profile },
  { path: '/following', options: Routes.profile },
  { path: '/settings', options: Routes.settings }
];


angular
  .module('app')
  .config(routeConfig);

///////////////////////////////////


function routeConfig($locationProvider, $routeProvider) {
  // inject our dynamic routes
  routes.forEach(function (route) {
    if (route.path) {
      return $routeProvider.when(route.path, route.options);
    }
    $routeProvider.otherwise(route.options);
  });

  // Enable pushState support for our app.
  $locationProvider.html5Mode(true);
};
