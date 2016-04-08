(function() {
  'use strict';

  angular
    .module('xcore.biz.auth')
    .config(routerConfig);

  routerConfig.$inject = [
    '$stateProvider'
  ];
  function routerConfig($stateProvider) {

    var basePath = 'app/business/auth/role/';
    var baseState = 'xcore.auth_role.';
    var basePackage = 'auth.role.';

    $stateProvider
      .state(baseState + 'role_create', {
        templateUrl: basePath + 'view/role-create.html',
        controller: basePackage + 'RoleCreateController'
      })
      .state(baseState + 'role_detail', {
        templateUrl: basePath + 'view/role-detail.html',
        controller: basePackage + 'RoleDetailController'
      });
  }

})();
