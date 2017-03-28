app.controller('mainController', ['$scope','userFactory', '$routeParams', '$location', '$cookies','$location', function($scope, userFactory, $routeParams, $location, $cookies, $location) {

  $scope.newUser = {};
  $scope.errors = [];

userFactory.session(function(res){
  if(!res){
    $location.url('/')
  }
  else{
  $scope.current_user = userFactory.current_user
}
})
  $scope.create = function(newUser){
    console.log(newUser)
    $scope.errors = [];
    userFactory.create(newUser, function(res){
      if(res.data.code && res.data.code == 11000){
        $scope.errors.push('requires unique email')
      }
      else if(res.data.errors){
        var errors = res.data.errors;
        for(key in errors){
          $scope.errors.push(errors[key]['message'])
        }
      }
      else {
        $scope.newUser = {};
        $location.url('/')
      }
    })
  }
  $scope.login = function(userlogin){
    console.log("login fired" + userlogin)
    $scope.errors = [];
    userFactory.login(userlogin, function(res){
      if(res.data.errors){
        console.log("error in login")
        for(key in res.data.errors){
          $scope.errors.push(res.data.errors[key]['message'])
        }
      }
      else{
        console.log("login success")
        $location.url("/dash")
      }
    });
  }
  $scope.logout = function(){
    $cookies.remove('user_id');
    $location.url("/")
  }
}])
