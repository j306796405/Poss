(function() {
  'use strict';

  var bizModuleDependencies = /**/['xcore.biz.product','xcore.biz.channel','xcore.biz.auth']/**/;

  var modul

  angular
    .module('xcore.main', compositeArry(bizModuleDependencies, [
      'xcore.comp',
      'xcore',
      'ui.router'
    ]));

  function compositeArry(a, b) {
    Array.prototype.push.apply(a, b);
    return a;
  }

})();
