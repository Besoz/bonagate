(function() {
  'use strict';

  angular
    .module('utils')
    .factory('GeneralUtils', GeneralUtilsService);

    GeneralUtilsService.$inject = [];

    function GeneralUtilsService() {
      return {
        createIdHash: createIdHash,
        cancelPromise: cancelPromise,
        copy: copy,
        clone: clone
      }

      function copy(src, dest){
        try {
          angular.copy(src, dest);
        }
        catch(err) {
            console.log(err.message);
        }
      }

    function cancelPromise(promise){
      if(promise
         && promise._httpTimeout 
         && promise._httpTimeout.resolve) {
        promise._httpTimeout.resolve()
      }
    }

      function createIdHash(arr, pk) {
            var pk = pk || 'id';

            return _.reduce(arr, function(hash, record) {
              hash[record[pk]] = record;
              return hash;
            },{});
      }

      function clone(obj){
        if(!obj) return {};
        return JSON.parse(JSON.stringify(obj));
      }

    }

})();