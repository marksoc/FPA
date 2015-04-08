// Make sure to include the `ui.router` module as a dependency
angular.module('routerApp', [
  'routerApp.service',
  'routerApp.utils.service',
  'ui.router', 
  'ngAnimate'
])

.run(
  [          '$rootScope', '$state', '$stateParams',
    function ($rootScope,   $state,   $stateParams) {

    // It's very handy to add references to $state and $stateParams to the $rootScope
    // so that you can access them from any scope within your applications.For example,
    // <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
    // to active whenever 'contacts.list' or one of its decendents is active.
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    }
  ]
)

.config(
  [          '$stateProvider', '$urlRouterProvider',
    function ($stateProvider,   $urlRouterProvider) {

      /////////////////////////////
      // Redirects and Otherwise //
      /////////////////////////////

      // Use $urlRouterProvider to configure any redirects (when) and invalid urls (otherwise).
     // $urlRouterProvider

        // The `when` method says if the url is ever the 1st param, then redirect to the 2nd param
        // Here we are just setting up some convenience urls.
       // .when('/c?id', '/contacts/:id')
       // .when('/user/:id', '/contacts/:id')

        // If the url is ever invalid, e.g. '/asdf', then redirect to '/' aka the home state
      //  .otherwise('/');


      //////////////////////////
      // State Configurations //
      //////////////////////////

      // Use $stateProvider to configure your states.
      $stateProvider

        //////////
        // Home //
        //////////

        .state("plan", {
      abstract: true,
          // Use a url of "/" to set a states as the "index".
          url: "/plan",
  
          templateUrl: 'tpls/ExperimentPlan.html',
          resolve: {     
            cates: ['cates',
              function( cates){
                return cates.all();
              }]
          },
          controller: ['$scope', '$state', 'cates', 'utils',
            function (  $scope,   $state,   cates,   utils) {
               $scope.cates = cates;
               $scope.addCate=function(){
                  $state.go('plan.edit');
               };
             }]
       

      

        }).state('plan.list',{
            url:'',
          templateUrl: 'tpls/cate.list.html'

      }).state('plan.detail',{
            url:'/{detailId:[0-9]{1,4}}',
          templateUrl: 'tpls/PlanDetail.html',
          controller:['$scope','$stateParams','utils',
            function($scope,$stateParams,utils){
              $scope.cate = utils.findById($scope.cates, $stateParams.detailId);
               $scope.onMouseLeave = function(){
alert('le');
              };
              $scope.onMouseOver = function(){
alert('mo');
              };
              
      }
          ]


      }).state('plan.edit',{
            url:'/edit',
          templateUrl: 'tpls/edit.html'

      })


        ///////////
        // About //
        ///////////

        .state('admin', {
          url: '/admin',

          templateUrl: 'tpls/Managers.html'
        })
    }
  ]
);
