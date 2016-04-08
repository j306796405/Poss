(function() {
  'use strict';

  angular
    .module('xcore.biz.auth')
    .directive('xcRoleAssignment', roleAssignment);


  roleAssignment.$inject = [
    'comp.auth.authorityService'
  ];
  function roleAssignment(authorityService) {

    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'app/business/auth/user/view/role-assignment.html',
      scope: {
        "roleArry": '=',
        "roleIds": '=',
        "callback": '='
      },
      link: linkFunc
    };

    function linkFunc(scope, element, attrs) {

      if (!scope.callback) {
        throw 'missing callback attr';
      }

      // 创建角色分配区域
      scope.callback.makeAssignmentArea = makeAssignmentAreaFunc;
      // 获取被选中的角色ID列表
      scope.callback.getSelectedRoleIds = getSelectedRoleIdsFunc;

      function makeAssignmentAreaFunc(readyCallback) {

        if (!scope.roleArry) {
          throw 'missing role-arry attr';
        }
        if (!scope.roleIds) {
          throw 'missing role-ids attr';
        }

    //  <li class="role-item" data-role-id="123">
    //<span class="role-name">测试角色</span>
    //    <span class="role-code">ROLE_TEST</span>
    //    </li>
    //

        var $unassignedList = $(element).find('#roleUnassignedList');
        var $assignedList = $(element).find('#roleAssignedList');

        $unassignedList.children('li').remove();
        $assignedList.children('li').remove();

        var assignedRoles = [];
        var unassignedRoles = [];

        for (var i = 0; i < scope.roleArry.length; i++) {
          var isAssigned = false;
          for (var j = 0; j < scope.roleIds.length; j++) {
            if (scope.roleArry[i].id == scope.roleIds[j]) {
              isAssigned = true;
              break;
            }
          }
          if (isAssigned) {
            assignedRoles.push(scope.roleArry[i]);
          } else {
            unassignedRoles.push(scope.roleArry[i]);
          }
        }


        for (var i = 0; i < assignedRoles.length; i++) {
          $assignedList.append(makeRoleLi(assignedRoles[i]));
        }

        for (var i = 0; i < unassignedRoles.length; i++) {
          $unassignedList.append(makeRoleLi(unassignedRoles[i]));
        }

        refreshBorder();

        if (readyCallback) {
          readyCallback();
        }

        function makeRoleLi(role) {

          var $roleLi = $('<li class="role-item"><span class="role-name"></span><span class="role-code"></span></li>');
          $roleLi.find('.role-name').text(role.name);
          $roleLi.find('.role-code').text(role.code);
          $roleLi.attr('data-role-id', role.id);

          $roleLi.click(function() {
            var $_this = $(this);
            var parentId = $_this.parent().attr('id');
            if (parentId == 'roleUnassignedList') {
              $.when($_this.fadeOut(50)).done(function() {
                $.when($_this.appendTo($assignedList)).done(function() {
                  refreshBorder();
                  $_this.fadeIn(50);
                });
              });
            } else {
              $.when($_this.fadeOut(50)).done(function() {
                $.when($_this.appendTo($unassignedList)).done(function() {
                  refreshBorder();
                  $_this.fadeIn(50);
                });
              });
            }

          });

          return $roleLi;

        }

        function refreshBorder() {
          $assignedList.children().removeClass('first');
          $unassignedList.children().removeClass('first');
          if ($assignedList.children().size() > 0) {
            $assignedList.find('li:first').addClass('first');
          }
          if ($unassignedList.children().size() > 0) {
            $unassignedList.find('li:first').addClass('first');
          }
        }


      }

      function getSelectedRoleIdsFunc() {
        var roleIds = [];
        var $assignedList = $(element).find('#roleAssignedList');

        $assignedList.children().each(function() {
          roleIds.push($(this).attr('data-role-id'));
        });

        return roleIds;
      }


    }


  }

})();
