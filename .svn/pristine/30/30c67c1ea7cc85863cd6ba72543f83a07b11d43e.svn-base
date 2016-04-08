(function() {
  'use strict';

  angular
    .module('xcore.biz.auth')
    .factory('auth.user.userService', userService);

  userService.$inject = [
    '$log',
    'comp.rest.restAccessor',
    '$q'
  ];
  function userService($log, restAccessor, $q) {

    return {

      getUsers: getUsers,
      getUser: getUser,
      createUser: createUser,
      updateUser: updateUser,
      removeUser: removeUser,
      getNormalDomains: getNormalDomains,
      getFullDomains: getFullDomains,
      getDomain: getDomain,
      getRoles: getRoles

    };

    /**
     * Retrieving domain user list
     *
     * @param domainId
     * @param filterParam
     * @return {Promise}
     *  resolve: {total_count: 123, collection:[{...}]}
     *  reject: message
     */
    function getUsers(domainId, filterParam) {

      return restAccessor.get('/system/domains/:domainId/users', {domainId: domainId}, filterParam).then(
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

    function createUser(domainId, user) {
      return restAccessor.post('/system/domains/:domainId/users', {domainId: domainId}, user).then(
        function(response) {
          return response.data;
        },
        function(errResponse) {
          return $q.reject(errResponse.data.message);
        }
      );
    }


    function updateUser(domainId, userId, user) {
      return restAccessor.put('/system/domains/:domainId/users/:userId', {
        domainId: domainId,
        userId: userId
      }, user).then(
        function(response) {
          return response.data;
        },
        function(errResponse) {
          return $q.reject(errResponse.data.message);
        }
      );
    }


    function removeUser(domainId, userId) {
      return restAccessor.delete('/system/domains/:domainId/users/:userId', {
        domainId: domainId,
        userId: userId
      }, null).then(
        function(response) {},
        function(errResponse) {
          return $q.reject(errResponse.data.message);
        }
      );
    }

    function getUser(domainId, userId) {

      return restAccessor.get('/system/domains/:domainId/users/:userId', {
        domainId: domainId,
        userId: userId
      }).then(
        function(response) {
          return response.data
        },
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
              roles: response.data[i].roles
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
              roles: response.data[i].roles
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


    function getRoles(domainId) {
      return restAccessor.get('/system/domains/:domainId/roles', {domainId: domainId}).then(
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
