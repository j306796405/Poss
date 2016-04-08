(function() {
  'use strict';

  angular
    .module('xcore.biz.auth')
    .controller('auth.domain.DomainDetailController', DomainDetailController);

  DomainDetailController.$inject = [
    '$timeout',
    '$state',
    '$scope',
    'comp.notification.notificationService',
    'comp.auth.authorityService',
    'auth.domain.domainService'
  ];
  function DomainDetailController($timeout, $state, $scope, notificationService, authorityService, domainService) {

    /** 域数据模型 */
    $scope.domain = {
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

      $scope.artAuthArry = authorityService.getFullAuthorities();

      domainService.getDomain($scope.processingDataId).then(
        function(data) {
          $scope.domain = {
            code: data.code,
            name: data.name,
            remark: data.remark,
            status: data.status,
            resources: data.resources
          };
          var resourceIds = [];
          for (var i = 0; i < data.resources.length; i++) {
            resourceIds.push(data.resources[i].id);
          }
          $scope.artResourceIds = resourceIds;
          $timeout(function() {
            $scope.domainDetailForm.validate();
            $scope.artCallback.makeTree(function() {
              $scope.floatViewReady();
            });
          });
        },
        function(errMsg) {
          notificationService.notify('异常', errMsg);
          $scope.toMainView();
        }
      );
    }

    function toMainFunc() {
      $state.go('xcore.auth_domain', {location: false});
      $scope.toMainView();
    }

    function submitFunc() {
      if (!$scope.domainDetailForm.isValid()) {
        return;
      }

      $scope.domain.resources = [];
      var selectedResourceIds = $scope.artCallback.getSelectedResourceIds();
      for (var i = 0; i < selectedResourceIds.length; i++) {
        $scope.domain.resources.push({id: selectedResourceIds[i]});
      }

      domainService.updateDomain($scope.processingDataId, $scope.domain).then(
        function(data) {
          notificationService.notify('成功', '更新域[' + data.name + ']成功');
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
