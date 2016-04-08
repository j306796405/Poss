(function() {
  'use strict';

  angular
    .module('xcore.biz.auth')
    .controller('auth.role.RoleDetailController', RoleDetailController);

  RoleDetailController.$inject = [
    '$timeout',
    '$state',
    '$scope',
    'comp.notification.notificationService',
    'comp.auth.authorityService',
    'auth.role.roleService'
  ];
  function RoleDetailController($timeout, $state, $scope, notificationService, authorityService, roleService) {

    /** 表单数据模型 */
    $scope.role = {
      code: '',
      name: '',
      remark: '',
      status: '1',
      resources: []
    };

    /** 权限树 相关模型 */
    $scope.artAuthArry = [];
    $scope.artResourceIds = [];
    $scope.artCallback = {};

    /** 提交保存域 */
    $scope.submit = submitFunc;

    /** 返回到域列表页 */
    $scope.toMain = toMainFunc;


    _init();

    /**
     * 初始化详情表单
     *
     * @private
       */
    function _init() {

      roleService.getDomain($scope.processingData.domain.id).then(
        function(data) {
          var resourceIds = [];
          for (var i = 0; i < data.resources.length; i++) {
            resourceIds.push(data.resources[i].id);
          }
          var authArry = authorityService.filterAuthoritiesWithResourceIds(resourceIds);

          $scope.artAuthArry = authArry;

          roleService.getRole($scope.processingData.domain.id, $scope.processingData.id).then(
            function(data) {
              $scope.role = {
                code: data.code,
                name: data.name,
                remark: data.remark,
                status: data.status
              };
              var resourceIds = [];
              for (var i = 0; i < data.resources.length; i++) {
                resourceIds.push(data.resources[i].id);
              }
              $scope.artResourceIds = resourceIds;
              $timeout(function() {
                $scope.artCallback.makeTree(function() {
                  $scope.floatViewReady();
                });
                $scope.roleDetailForm.validate();
              });
            },
            function(errMsg) {
              notificationService.notify('异常', errMsg);
            }
          );
        },
        function(errMsg) {
          notificationService.notify('异常', errMsg);
        }
      );


    }

    function toMainFunc() {
      $state.go('xcore.auth_role', {location: false});
      $scope.toMainView();
    }

    function submitFunc() {
      if (!$scope.roleDetailForm.isValid()) {
        return;
      }

      $scope.role.resources = [];
      var selectedResourceIds = $scope.artCallback.getSelectedResourceIds();
      for (var i = 0; i < selectedResourceIds.length; i++) {
        $scope.role.resources.push({id: selectedResourceIds[i]});
      }

      roleService.updateRole($scope.processingData.domain.id, $scope.processingData.id, $scope.role).then(
        function(data) {
          notificationService.notify('成功', '更新角色[' + data.name + ']成功');
          $scope.toMain();
          $scope.listData();
        },
        function(errMsg) {
          notificationService.notify('失败', errMsg);
        }
      );

    }

  }

})();
