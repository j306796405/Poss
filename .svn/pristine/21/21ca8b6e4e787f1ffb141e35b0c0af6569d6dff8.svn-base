(function() {
  'use strict';

  angular
    .module('xcore.biz.auth')
    .factory('auth.domain.domainService', domainService);

  domainService.$inject = [
    '$log',
    '$q',
    'comp.rest.restAccessor'
  ];
  function domainService($log, $q, restAccessor) {

    return {

      getDomains: getDomains,
      getDomain: getDomain,
      updateDomain: updateDomain,
      createDomain: createDomain,
      removeDomain: removeDomain

    };

    /**
     * retrieve domain collections
     *
     * @param filterParam
     * @returns {Promise}
     *  resolve: {total_count: 13, collections: [{...}]}
     *  reject: message
       */
    function getDomains(filterParam) {
      return restAccessor.get('/system/domains', null, filterParam).then(
        function(response) {
          return {
            total_count: response.headers['x-total-count'],
            collection: response.data
          }
        },
        function(errResponse) {
          return $q.reject(errResponse.data.message);
        }
      );
    }

      /**
       * 根据域标识符获取域详情
       *
       * @param domainId
       * @return {Promise}
       *  resolve: {Domain:object}
       *  reject: {errMsg:string}
       */
    function getDomain(domainId) {
      return restAccessor.get('/system/domains/:domainId', {domainId: domainId}).then(
        function(response) {
          return response.data;
        },
        function(errResponse) {
          return $q.reject(errResponse.data.message);
        }
      );
    }

    /**
     * create domain
     *
     * @param domain
     *  {
     *    "code": "marketing",  // str:m|域编码。只能包含小写字母数字及下划线，且必须以字母开头。
     *    "name": "市场部",  // str:m|域名称。只能包含字母数字及中文。
     *    "remark": "这个域包含了市场部相关的资源",  // str:o|备注
     *    "resources": [  // arry:o|资源标识符列表，若不存在或空数组则不绑定任何资源
     *      {
     *        "id": 1  // num:m|资源标识符。
     *      }
     *    ]
     *  }
     * @returns {Promise}
     *  resolve: {Domain}
     *  reject: message
       */
    function createDomain(domain) {
      return restAccessor.post('/system/domains', null, domain).then(
        function(response) {
          return response.data;
        },
        function(errResponse) {
          return $q.reject(errResponse.data.message);
        }
      );
    }

    /**
     * update domain
     *
     * @param domainId
     * @param domain
     */
    function updateDomain(domainId, domain) {
      return restAccessor.put('/system/domains/:domainId', {domainId: domainId}, domain).then(
        function(response) {
          return response.data;
        },
        function(errResponse) {
          return $q.reject(errResponse.data.message);
        }
      );
    }

    /**
     * 删除域
     *
     * @param domainId
     * @returns {Promise}
     *  resolve: {empty}
     *  reject: err message
       */
    function removeDomain(domainId) {
      return restAccessor.delete('/system/domains/:domainId', {domainId: domainId}, null).then(
        function(response) {

        },
        function(errResponse) {
          return $q.reject(errResponse.data.message);
        }
      );
    }

  }

})();
