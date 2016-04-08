(function() {
  'use strict';

  angular
    .module('xcore.biz.auth')
    .factory('auth.role.roleService', roleService);

  roleService.$inject = [
    '$log',
    '$q',
    'comp.rest.restAccessor'
  ];
  function roleService($log, $q, restAccessor) {

    return {

      getRoles: getRoles,
      getRole: getRole,
      createRole: createRole,
      updateRole: updateRole,
      removeRole: removeRole,
      getNormalDomains: getNormalDomains,
      getFullDomains: getFullDomains,
      getDomain: getDomain

    };

    /**
     * retrieve role collections
     *
     * @param filterParam
     * @returns {Promise}
     *  resolve: {total_count: 13, collections: [{...}]}
     *  reject: message
     */
    function getRoles(domainId, filterParam) {
      return restAccessor.get('/system/domains/:domainId/roles', {domainId: domainId}, filterParam).then(
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
     * retrieve role with specified role id
     *
     * @param domainId
     * @param roleId
     * @returns {*}
     */
    function getRole(domainId, roleId) {
      return restAccessor.get('/system/domains/:domainId/roles/:roleId', {
        domainId: domainId,
        roleId: roleId
      }).then(
        function(response) {
          return response.data;
        },
        function(errResponse) {
          return $q.reject(errResponse.data.message);
        }
      );
    }

    /**
     * create role
     *
     * @param domainId
     * @param role
     * @returns {Promise}
     *  resolve: {Role}
     *  reject: message
     */
    function createRole(domainId, role) {
      return restAccessor.post('/system/domains/:domainId/roles', {domainId: domainId}, role).then(
        function(response) {
          return response.data;
        },
        function(errResponse) {
          return $q.reject(errResponse.data.message);
        }
      );
    }

    /**
     *
     *
     * @param domainId
     * @param roleId
     * @param role
     * @returns {*}
     */
    function updateRole(domainId, roleId, role) {
      return restAccessor.put('/system/domains/:domainId/roles/:roleId', {
        domainId: domainId,
        roleId: roleId
      }, role).then(
        function(response) {
          return response.data;
        },
        function(errResponse) {
          return $q.reject(errResponse.data.message);
        }
      );
    }

    /**
     * remove role under specified domain
     *
     * @param domainId
     * @param roleId
     * @returns {Promise}
     *  resolve: {empty}
     *  reject: err message
     */
    function removeRole(domainId, roleId) {
      return restAccessor.delete('/system/domains/:domainId/roles/:roleId', {
        domainId: domainId,
        roleId: roleId
      }, null).then(
        function(response) {},
        function(errResponse) {
          return $q.reject(errResponse.data.message);
        }
      );
    }

    /**
     * get normal domain list (including disabled but exclude root domain)
     *
     * @returns [{id: 1, name: 'name', code: 'code'}]
     */
    function getNormalDomains() {
      return restAccessor.get('/system/domains', null, {last_cursor: 0, count: 100}).then(
        function(response) {
          var domainList = [];
          for (var i = 0; i < response.data.length; i++) {
            if (response.data[i].type == '9') {
              continue;
            }
            domainList.push({
              id: response.data[i].id,
              code: response.data[i].code,
              name: response.data[i].name,
              resources: response.data[i].resources
            });
          }
          return domainList;
        },
        function(errResponse) {
          return $q.reject(errResponse.data.message);
        }
      );
    }

    /**
     * get full domain list (including disabled)
     *
     * @returns [{id: 1, name: 'name', code: 'code'}]
     */
    function getFullDomains() {
      return restAccessor.get('/system/domains', null, {last_cursor: 0, count: 100}).then(
        function(response) {
          var domainList = [];
          for (var i = 0; i < response.data.length; i++) {
            domainList.push({
              id: response.data[i].id,
              code: response.data[i].code,
              name: response.data[i].name,
              resources: response.data[i].resources
            });
          }
          return domainList;
        },
        function(errResponse) {
          return $q.reject(errResponse.data.message);
        }
      );
    }

    /**
     * get domain with specified domain id
     *
     * @param domainId
     * @return {Primise}
     *  resolve: {domain: obj}
     *  reject: errMsg:string
     */
    function getDomain(domainId) {
      return restAccessor.get('/system/domains/:domainId', {domainId: domainId}).then(
        function(response) {
          return response.data;
        },
        function(errResponse) {
          return $q.reject(errResponse.message);
        }
      );
    }

  }

})();
