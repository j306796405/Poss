(function() {
  'use strict';

  angular.module('xcore.comp')
    .factory('comp.notification.notificationService', notificationService);

  function notificationService() {

    return {

      notify: notifyFunc

    }


    function notifyFunc(title, message) {

      $.gritter.add({
        title: title,
        text: message
      });

    }


  }

})();
