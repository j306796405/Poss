(function() {
  'use strict';

  angular
    .module('xcore.biz.auth')
    .config(routerConfig);

  routerConfig.$inject = [
    '$stateProvider'
  ];
  function routerConfig($stateProvider) {

    var basePath = 'app/business/auth/user/';
    var baseState = 'xcore.auth_user.';
    var basePackage = 'auth.user.';

    $stateProvider
      .state(baseState + 'user_create', {
        templateUrl: basePath + 'view/user-create.html',
        controller: basePackage + 'UserCreateController'
      })
      .state(baseState + 'user_detail', {
        templateUrl: basePath + 'view/user-detail.html',
        controller: basePackage + 'UserDetailController'
    });

  }

})();
