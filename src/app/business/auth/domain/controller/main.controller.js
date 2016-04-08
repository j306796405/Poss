(function() {
  'use strict';

  angular
    .module('xcore.biz.auth')
    .controller('auth.domain.MainController', mainController);

  mainController.$inject = [
    '$log',
    '$controller',
    '$scope',
    '$state',
    'comp.notification.notificationService',
    'auth.domain.domainService'
  ];
  function mainController($log, $controller, $scope, $state, notificationService, domainService) {

    $controller('comp.ext.controller.PaginationDataGridController', {$scope: $scope});

    /** 进入 float view 时用于标记处理中的记录标识 */
    $scope.processingData = null;

    $scope.assist = {
      confirmDelete: ''
    };

    /** 实现 PaginationDataGridController 的抽象方法 */
    $scope.getCollection = getCollectionFunc;


    $scope.toCreateDomain = toCreateDomainFunc;


    // remove domain
    $scope.removeConfirm = removeConfirmFunc;
    $scope.removeData = removeDataFunc;

    // change state for domain detail
    $scope.toDomainDetail = toDomainDetailFunc;

    function getCollectionFunc(filterParam) {
      return domainService.getDomains(filterParam);
    }

    function toDomainDetailFunc(dataId) {
      $scope.processingDataId = dataId;
      $state.go('xcore.auth_domain.domain_detail', {location: false});
      $scope.toFloatView();
    }

    function toCreateDomainFunc() {
      $state.go('xcore.auth_domain.domain_create', {location: false});
      $scope.toFloatView();
    }


    function removeConfirmFunc(dataId) {
      $scope.processingDataId = dataId;
      $scope.assist.confirmDelete = '';
      $('#modal-alert').modal();
    }

    function removeDataFunc() {
      if ($scope.assist.confirmDelete != 'DELETE') {
        return;
      }
      domainService.removeDomain($scope.processingDataId).then(
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
