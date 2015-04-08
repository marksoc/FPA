angular.module('routerApp.service', [

])

// A RESTful factory for retrieving contacts from 'contacts.json'
.factory('cates', ['$http', 'utils', function ($http, utils) {
  var path = 'assets/cate.json';
  var cates = $http.get(path).then(function (resp) {
    return resp.data.cates;
  });

  var factory = {};
  factory.all = function () {
    return cates;
  };
  factory.get = function (id) {
    return cates.then(function(){
      return utils.findById(cates, id);
    })
  };
  return factory;
}]);
