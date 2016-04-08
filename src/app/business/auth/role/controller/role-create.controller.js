(function() {
  'use strict';

  angular
    .module('xcore.biz.auth')
    .controller('auth.role.RoleCreateController', RoleCreateController);

  RoleCreateController.$inject = [
    '$controller',
    '$timeout',
    '$state',
    '$scope',
    'comp.notification.notificationService',
    'comp.auth.authorityService',
    'auth.role.roleService'
  ];
  function RoleCreateController($controller, $timeout, $state, $scope, notificationService, authorityService, roleService) {

    // inherit from Main-float controller
    $controller('comp.ext.controller.MainFloatController', {$scope: $scope});


    /** 表单数据模型 */
    $scope.role = {
      code: '',
      name: '',
      remark: '',
      resources: []
    };

    /** 权限树 相关模型 */
    $scope.artAuthArry = [];
    $scope.artResourceIds = [];
    $scope.artCallback = {};

    /** 所属域 */
    $scope.domainSelectOptions = [];
    $scope.domain = null;

    /** 提交保存 */
    $scope.submit = submitFunc;

    /** 返回列表页 */
    $scope.toMain = toMainFunc;

    _init();

    function _init() {

      // initialize the domain select options
      roleService.getNormalDomains().then(
        function(data) {
          $scope.domainSelectOptions = data;

          if (data && data.length > 0) {
            $scope.domain = data[0];
          }

          $scope.floatViewReady();

        },
        function(errMsg) {
          notificationService.notify('异常', errMsg);
        }
      );

      // add watch for $scope.domain
      $scope.$watch('domain', function(newValue, oldValue, scope) {
        if (!newValue) {
          return;
        }

        var resourceIds = [];
        for (var i = 0; i < newValue.resources.length; i++) {
          resourceIds.push(newValue.resources[i].id);
        }

        var authArry = authorityService.filterAuthoritiesWithResourceIds(resourceIds);

        $scope.artAuthArry = authArry;

        $timeout(function() {
          $scope.artCallback.makeTree();
          $scope.roleCreateForm.validate();
        });
      });

    }

    function toMainFunc() {
      $state.go('xcore.auth_role', {location: false});
      $scope.toMainView();
    }

    function submitFunc() {

      if (!$scope.roleCreateForm.isValid()) {
        return;
      }

      $scope.role.resources = [];
      var selectedResourceIds = $scope.artCallback.getSelectedResourceIds();

      for (var i = 0; i < selectedResourceIds.length; i++) {
        $scope.role.resources.push({id: selectedResourceIds[i]});
      }

      roleService.createRole($scope.domain.id, $scope.role).then(
        function(data) {
          notificationService.notify('成功', '创建角色[' + data.name + ']成功');
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
