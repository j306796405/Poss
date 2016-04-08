(function() {
  'use strict';

  angular
    .module('xcore')
    .controller('main.MainController', MainController);

  MainController.$inject = [
    '$log',
    '$window',
    '$scope',
    'comp.notification.notificationService',
    'comp.session.sessionService'
  ];
  function MainController($log, $window, $scope, notificationService, sessionService) {
    var vm = this;

    vm.passwordModification = {
      originPassword: '',
      retypeOriginPassword: '',
      newPassword: ''
    };

    // sign out
    vm.signOut = signOutFunc;

    // modify password
    vm.openModifyPasswordDialog = openModifyPasswordDialogFunc;
    vm.modifyPassword = modifyPasswordFunc;

    function signOutFunc() {
      sessionService.destroySession().then(
        function() {
          $window.location.href = 'login.html';
        },
        function() {
          $window.location.href = 'login.html';
        }
      );
    }

    function openModifyPasswordDialogFunc() {
      vm.passwordModification.originPassword = '';
      vm.passwordModification.retypeOriginPassword = '';
      vm.passwordModification.newPassword = '';

      $('#modifyPasswordDialog').modal();
    }

    function modifyPasswordFunc() {
      $scope.passwordModifyForm.validate();
      if (!$scope.passwordModifyForm.isValid()) {
        return;
      }

      if (vm.passwordModification.originPassword != vm.passwordModification.retypeOriginPassword) {
        notificationService.notify('异常', '原密码两次输入不符');
        return;
      }

    }

    function removeDataFunc() {
      userService.removeUser($scope.processingData.domain.id, $scope.processingData.id).then(
        function() {
          $('#modal-alert').modal('hide');
          notificationService.notify('成功','删除成功');
          $scope.listData();
        },
        function(errMsg) {
          notificationService.notify('失败',errMsg);
        }
      );
    }

  }

})();
