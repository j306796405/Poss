(function() {
  'use strict';

  angular
    .module('xcore.biz.auth')
    .config(routerConfig);

  routerConfig.$inject = [
    '$stateProvider'
  ];
  function routerConfig($stateProvider) {

    var basePath = 'app/business/auth/domain/';
    var baseState = 'xcore.auth_domain.';
    var basePackage = 'auth.domain.';

    $stateProvider
      .state(baseState + 'domain_create', {
        templateUrl: basePath + 'view/domain-create.html',
        controller: basePackage + 'DomainCreateController'
      })
      .state(baseState + 'domain_detail', {
        templateUrl: basePath + 'view/domain-detail.html',
        controller: basePackage + 'DomainDetailController'
      });
  }

})();
