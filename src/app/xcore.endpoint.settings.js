(function() {

  'use strict';

  angular
    .module('xcore')
    .constant('settings', {

      backend: {
        system: 'http://localhost:8088',
        integral: 'http://10.2.8.58:8089'
      }

    });


})();
