(function() {
  'user strict';

  angular
    .module('xcore.biz.auth')
    .controller('auth.user.UserCreateController', UserCreateController);

  UserCreateController.$inject = [
    '$controller',
    '$timeout',
    '$state',
    '$scope',
    'comp.notification.notificationService',
    'comp.auth.authorityService',
    'auth.user.userService'
  ];
  function UserCreateController($controller, $timeout, $state, $scope, notificationService, authorityService, userService) {

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
      userService.getNormalDomains().then(
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


        $('.role-assignment-area ul').css('display', 'none');

        userService.getRoles(newValue.id).then(
          function(data) {

            $scope.roRoleArry = data;
            $timeout(function() {
              $scope.roCallback.makeAssignmentArea(function() {
                $('.role-assignment-area ul').fadeIn(50);
              });
              $scope.userCreateForm.validate();
            });
          },
          function(errMsg) {
            notificationService.notify('异常', errMsg);
          }
        );



      });

    }

    function toMainFunc() {
      $state.go('xcore.auth_user', {location: false});
      $scope.toMainView();
    }

    function submitFunc() {

      if (!$scope.userCreateForm.isValid()) {
        return;
      }

      $scope.user.roles = [];
      var roleIds = $scope.roCallback.getSelectedRoleIds();
      for (var i = 0; i < roleIds.length; i++) {
        $scope.user.roles.push({id: roleIds[i]});
      }

      userService.createUser($scope.domain.id, $scope.user).then(
        function(data) {
          notificationService.notify('成功', '创建用户[' + data.name + ']成功');
          $scope.toMain();
          $scope.listData();
        },
        function(errMsg) {
          notificationService.notify('失败', errMsg);
        }
      );

      //if (!$scope.roleCreateForm.isValid()) {
      //  return;
      //}
      //
      //$scope.role.resources = [];
      //var selectedResourceIds = $scope.artCallback.getSelectedResourceIds();
      //
      //for (var i = 0; i < selectedResourceIds.length; i++) {
      //  $scope.role.resources.push({id: selectedResourceIds[i]});
      //}
      //
      //roleService.createRole($scope.domain.id, $scope.role).then(
      //  function(data) {
      //    notificationService.notify('成功', '创建角色[' + data.name + ']成功');
      //    $scope.toMain();
      //    $scope.listData();
      //  },
      //  function(errMsg) {
      //    notificationService.notify('失败', errMsg);
      //  }
      //);

    }

  }

})();
