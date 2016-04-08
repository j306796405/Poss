(function() {
  'use strict';

  angular
    .module('xcore.main')
    .config(routerConfig);

  routerConfig.$inject = [
    '$stateProvider',
    '$urlRouterProvider',
    'xcore.auth_settings_map',
    'main.codeConverterService'
  ];
  function routerConfig($stateProvider, $urlRouterProvider, authSettingsMap, codeConverterService) {

    $stateProvider
      .state('xcore', {
        url: '/',
        templateUrl: 'app/main/view/main.html',
        controller: 'main.MainController',
        controllerAs: 'main',
        resolve: {
          initAuth: initAuth
        }
      })
      .state('xcore._blank', {
      template: '<div></div>'
    });

    initAuth.$inject = [
      'comp.auth.authorityService'
    ];
    function initAuth(authorityService) {
      return authorityService.init();
    }

    $urlRouterProvider.otherwise('/');

    for (var code in authSettingsMap) {
      if (!authSettingsMap.hasOwnProperty(code)) {
        continue;
      }
      if (!authSettingsMap[code].sub_menus) {
        $stateProvider
          .state(codeConverterService.menuCode2State(code), {
            templateUrl: 'app/business/' + codeConverterService.menuCode2Path(code) + '/view/main.html'
          });
      }
    }


  }

})();
