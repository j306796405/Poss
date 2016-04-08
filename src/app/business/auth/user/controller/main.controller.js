(function() {
  'use strict';

  angular
    .module('xcore.biz.auth')
    .controller('auth.user.MainController', mainController);

  mainController.$inject = [
    '$controller',
    '$state',
    '$scope',
    'comp.notification.notificationService',
    'auth.user.userService'
  ];
  function mainController($controller, $state, $scope,  notificationService, userService) {
    $controller('comp.ext.controller.PaginationDataGridController', {$scope: $scope});

    $scope.domainSelectOptions = [];
    $scope.domain = null;

    /** 实现抽象方法 */
    $scope.getCollection = getCollectionFunc;

    $scope.toCreateUser = toCreateUserFunc;

    $scope.toDataDetail = toDataDetailFunc;

    // remove domain
    $scope.removeConfirm = removeConfirmFunc;
    $scope.removeData = removeDataFunc;

    _init();

    function _init() {
      // initialize the domain select options
      userService.getFullDomains().then(
        function(data) {
          $scope.domainSelectOptions = data;
          if (data && data.length > 0) {
            $scope.domain = data[0];
          }

        },
        function(errMsg) {
          notificationService.notify('异常', errMsg);
        }
      );
    }

    function getCollectionFunc(filterParam) {
      return userService.getUsers($scope.domain.id, filterParam);
    }

    function toCreateUserFunc() {
      $state.go('xcore.auth_user.user_create', {location: false});
      $scope.toFloatView();
    }

    function removeConfirmFunc(item) {
      $scope.processingData = item;
      $('#modal-alert').modal();
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

    function toDataDetailFunc(item) {
      $scope.processingData = item;
      $state.go('xcore.auth_user.user_detail', {location: false});
      $scope.toFloatView();
    }

  }

})();
