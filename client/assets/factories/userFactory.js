app.factory('userFactory', ['$http', '$cookies', function($http, $cookies) {
  var factory = {};

  factory.create = function(newUser, callback) {
    console.log("create hit factory")
      $http.post('/create', newUser).then(function(res){
        console.log(res);
          callback(res);
        });
      }

  factory.login = function(userlogin, callback)  {
    console.log("factory login" + userlogin)
    $http.post("/login", userlogin).then(function(res){
      if(!res.data.errors){
        $cookies.put("user_id", res.data._id);
        factory.current_user=res.data;
      }
      callback(res);
    })
    }

  factory.session = function(callback){
    var user_id = $cookies.get('user_id');
    if(user_id){
      $http.get('/users/' + user_id).then(function(res){
        factory.current_user = res.data;
        callback(res);
      })
    }
    else{
        callback(false);
    }
  }
  factory.logout = function(){
    console.log('logout factory')
    factory.current_user = {};

  }

  factory.getUsers = function(callback){
    $http.get('/getUsers').then(function(res){
      callback(res)
    })
  }
  //   if(!$cookies.get('user_id')){
  //     console.log("not logged in");
  //     return false;
  //   }
  //   else{
  //     //use the user_id to look up the user object in the DB
  //     //then set the user object in the factory
  //     //then send along to the controller via a callback
  //     console.log("logged in")
  //     return true;
  //   }
  // }

  return factory;
}]);
