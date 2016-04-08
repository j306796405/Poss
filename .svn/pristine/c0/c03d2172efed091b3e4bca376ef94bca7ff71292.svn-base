(function() {
  'use strict';

  angular
    .module('xcore.main')
    .directive('xcMainSideBar', sideBar);

  sideBar.$inject = [
    'comp.auth.authorityService',
    'main.codeConverterService',
    'comp.session.sessionService'
  ];
  function sideBar(authorityService, codeConverterService, sessionService) {
    var directive = {
      restrict: 'E',
      scope: false,
      templateUrl: 'app/main/view/sidebar.html',
      controller: controllerFunc,
      compile: compileFunc

    };

    return directive;

    function compileFunc(el) {

      var resourceIds = [];
      var session = sessionService.getSessionFromCache();
      for (var i = 0; i < session.resources.length; i++) {
        resourceIds.push(session.resources[i].id);
      }
      var authorities = authorityService.filterAuthoritiesWithResourceIds(resourceIds);

      var $menuUlElem = $(el).find('ul.nav');

      $.each(authorities, function(i, authorities) {
        recursiveProcessMenu(authorities, $menuUlElem);
      });

      return linkFunc;

    }

    function recursiveProcessMenu(menuData, $parentElem) {

      if (menuData.sub_menus && menuData.sub_menus.length > 0) {

        /**
         <li class="has-sub">
         <a href="javascript:;">
         <b class="caret pull-right"></b>
         <i class="icon-screen-desktop"></i>
         <span>Dashboard</span>
         </a>
         <ul class="sub-menu">
         <li><a href="index.html#ajax/index.html">Dashboard v1</a></li>
         <li><a href="index.html#ajax/index_v2.html">Dashboard v2</a></li>
         </ul>
         </li>
         */

        var $rParentElem = $parentElem.append($('<li class="has-sub"></li>'))
          .find('li:last')
          .append($('<a href="javascript:;"></a>'))
          .find('a')
          .append($('<b class="caret pull-right"></b>'))
          .append($('<i class="' + menuData.icon + '"></i>'))
          .append($('<span>' + menuData.name + '</span>'))
          .parent()
          .append('<ul class="sub-menu"></ul>')
          .find('ul');

        $.each(menuData.sub_menus, function(i, rMenuData) {
          recursiveProcessMenu(rMenuData, $rParentElem);
        });

      } else {

        /**
         <li><a href="index.html#ajax/index.html">Dashboard v1</a></li>
         */

        $parentElem.append($('<li></li>'))
          .find('li:last')
          .append($('<a href="javascript:;" ng-click="clickMenu($event, \'' + menuData.code + '\')">' +
            menuData.name + '</a>'));

      }

    }

    function linkFunc(scope, el) {

      $('.sidebar .nav > .has-sub > a').click(function() {
        var target = $(this).next('.sub-menu');
        var otherMenu = '.sidebar .nav > li.has-sub > .sub-menu';

        if ($('.page-sidebar-minified').length === 0) {
          $(otherMenu).not(target).slideUp(250, function() {
            $(this).closest('li').removeClass('expand');
          });
          $(target).slideToggle(250, function() {
            var targetLi = $(this).closest('li');
            if ($(targetLi).hasClass('expand')) {
              $(targetLi).removeClass('expand');
            } else {
              $(targetLi).addClass('expand');
            }
          });
        }
      });
      $('.sidebar .nav > .has-sub .sub-menu li.has-sub > a').click(function() {
        if ($('.page-sidebar-minified').length === 0) {
          var target = $(this).next('.sub-menu');
          $(target).slideToggle(250);
        }
      });

      $('.sidebar [data-scrollbar=true]').each( function() {
        var dataHeight = $(this).attr('data-height');
        dataHeight = (!dataHeight) ? $(element).height() : dataHeight;

        var scrollBarOption = {
          height: dataHeight,
          alwaysVisible: true
        };
        if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
          $(this).css('height', dataHeight);
          $(this).css('overflow-x','scroll');
        } else {
          $(this).slimScroll(scrollBarOption);
        }
      });

    }


    controllerFunc.$inject = [
      '$scope',
      '$state'
    ];
    function controllerFunc($scope, $state) {

      $scope.clickMenu = clickMenuFunc;

      function clickMenuFunc($event, code) {

        var menuState = codeConverterService.menuCode2State(code);

        if (!$state.get(menuState)) {
          alert(menuState + ' does not exist');
          return;
        }

        // clear active style
        $('ul.nav .active').removeClass('active');

        // set active styles
        var $menuLi = $($event.currentTarget).parent();
        $menuLi.addClass('active');
        var $parentUl = $menuLi.parent();
        while (!$parentUl.hasClass('nav')) {
          $parentUl.parent().addClass('active');
          $parentUl = $parentUl.parent().parent();
        }

        $state.go('xcore._blank', {location: false}).then(function() {
          $state.go(menuState, {location: false});
        });

        var activeMenu = authorityService.getAuthorityWithCode(code);
        $scope.activeMenu = {
          name: activeMenu.name
        };

      }


    }

  }

})();
