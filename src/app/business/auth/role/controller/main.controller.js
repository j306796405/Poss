(function() {
  'use strict';

  angular
    .module('xcore.biz.auth')
    .controller('auth.role.MainController', mainController);

  mainController.$inject = [
    '$controller',
    '$state',
    '$scope',
    'comp.notification.notificationService',
    'auth.role.roleService'
  ];
  function mainController($controller, $state, $scope,  notificationService, roleService) {
    $controller('comp.ext.controller.PaginationDataGridController', {$scope: $scope});

    /** 进入 float view 时用于标记处理中的记录标识 */
    $scope.processingDataId = null;

    $scope.domainSelectOptions = [];
    $scope.domain = null;

    /** 实现抽象方法 */
    $scope.getCollection = getCollectionFunc;

    $scope.toCreateRole = toCreateRoleFunc;

    $scope.toRoleDetail = toRoleDetailFunc;

    // remove domain
    $scope.removeConfirm = removeConfirmFunc;
    $scope.removeData = removeDataFunc;

    _init();

    function _init() {
      // initialize the domain select options
      roleService.getNormalDomains().then(
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
      return roleService.getRoles($scope.domain.id, filterParam);
    }

    function toCreateRoleFunc() {
      $state.go('xcore.auth_role.role_create', {location: false});
      $scope.toFloatView();
    }

    function removeConfirmFunc(item) {
      $scope.processingData = item;
      $('#modal-alert').modal();
    }

    function removeDataFunc() {
      roleService.removeRole($scope.processingData.domain.id, $scope.processingData.id).then(
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

    function toRoleDetailFunc(item) {
      $scope.processingData = item;
      $state.go('xcore.auth_role.role_detail', {location: false});
      $scope.toFloatView();
    }

  }
})();
