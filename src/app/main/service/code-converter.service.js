(function() {
  'use strict';

  angular
    .module('xcore.main')
    .constant('main.codeConverterService', {

      menuCode2State: menuCode2State,
      menuCode2Path: menuCode2Path

    });

  /**
   * 根据传入的菜单编码(menu code)转换成菜单状态.
   * e.g.
   *  xsystem.user.aaa => xcore.xsystem_user_aaa
   *
   * @param menuCode {String}
   * @return {String}
   */
  function menuCode2State(menuCode) {

    return 'xcore.' + menuCode.replace(/\./g, '_');

  }

  /**
   * 根据传入的菜单编码(menu code)转换成该菜单所指向的目录.
   * 该目录从 src/app/business 起开始,并且不带斜杠开头
   * e.g.
   *  xsystem.user.aaa => xsystem/user/aaa
   *
   * @param menuCode
   * @return {String}
   */
  function menuCode2Path(menuCode) {

    return menuCode.replace(/\./g, '/');

  }

})();
