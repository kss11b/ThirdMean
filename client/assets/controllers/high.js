app.controller('highController', ['$scope','userFactory', 'bidFactory', '$routeParams', '$location', '$cookies', function($scope,userFactory, bidFactory, $routeParams, $location, $cookies) {
  userFactory.session(function(res){
    if(!res){
      $location.url('/')
    }
    else{
    $scope.current_user = userFactory.current_user
  }
  })
  $scope.show = function(){
    userFactory.getUsers(function(res){

      $scope.users = res.data
      console.log(res.data)

    $scope.topBid1 = bidFactory.maxBid1
    $scope.topBid2 = bidFactory.maxBid2
    $scope.topBid3 = bidFactory.maxBid3
    $scope.topBidder1 = bidFactory.maxBidder1
    $scope.topBidder2 = bidFactory.maxBidder2
    $scope.topBidder3 = bidFactory.maxBidder3
    console.log($scope.users + " " + $scope.topBidder1)
        })
    }
  $scope.start = function(){
    bidFactory.start(function(){
      })
      $location.url('dash')
  }

$scope.show()



}])
