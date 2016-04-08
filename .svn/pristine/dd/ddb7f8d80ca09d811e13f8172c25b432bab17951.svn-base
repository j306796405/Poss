(function() {
  'use strict';

  angular
    .module('xcore.biz.auth')
    .controller('auth.user.UserDetailController', UserDetailController);

  UserDetailController.$inject = [
    '$timeout',
    '$state',
    '$scope',
    'comp.notification.notificationService',
    'comp.auth.authorityService',
    'auth.user.userService'
  ];
  function UserDetailController($timeout, $state, $scope, notificationService, authorityService, userService) {

    /** 表单数据模型 */
    $scope.user = {
      login_name: '',
      name: '',
      password: '',
      type: '1',
      roles: [],
      remark: ''

    };

    /** 角色分配列表 相关模型 */
    $scope.roRoleArry = [];
    $scope.roRoleIds = [];
    $scope.roCallback = {};

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

      userService.getRoles($scope.processingData.domain.id).then(
        function(data) {

          $scope.roRoleArry = data;

          userService.getUser($scope.processingData.domain.id, $scope.processingData.id).then(
            function(data) {
              $scope.user = {
                login_name: data.login_name,
                name: data.name,
                type: data.type,
                remark: data.remark
              };
              var roleIds = [];
              for (var i = 0; i < data.roles.length; i++) {
                roleIds.push(data.roles[i].id);
              }
              $scope.roRoleIds = roleIds;
              $timeout(function() {
                $scope.roCallback.makeAssignmentArea(function() {
                  $scope.floatViewReady();
                });
                $scope.userDetailForm.validate();
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
      $state.go('xcore.auth_user', {location: false});
      $scope.toMainView();
    }

    function submitFunc() {
      if (!$scope.userDetailForm.isValid()) {
        return;
      }

      $scope.user.roles = [];
      var selectedRoleIds = $scope.roCallback.getSelectedRoleIds();
      for (var i = 0; i < selectedRoleIds.length; i++) {
        $scope.user.roles.push({id: selectedRoleIds[i]});
      }

      userService.updateUser($scope.processingData.domain.id, $scope.processingData.id, $scope.user).then(
        function(data) {
          notificationService.notify('成功', '更新用户[' + data.name + ']成功');
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
