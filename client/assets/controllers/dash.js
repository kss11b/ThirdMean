app.controller('dashController', ['$scope','userFactory', 'bidFactory', '$routeParams', '$location', '$cookies', function($scope,userFactory, bidFactory, $routeParams, $location, $cookies) {

  userFactory.session(function(res){
    if(!res){
      $location.url("/")
    }
    else{
    $scope.current_user = userFactory.current_user
  }
  })

  $scope.logout = function(){
    userFactory.logout()
    $cookies.remove('user_id');
    $location.url("/")
  }

  $scope.index = function(){
    console.log('ctrlr index')
    bidFactory.index(function(res){
      console.log(res.data)
      $scope.bids = res.data

      })
      bidFactory.getMax(function(res){
        $scope.maxBid1 = bidFactory.maxBid1;
        $scope.maxBid2 = bidFactory.maxBid2;
        $scope.maxBid3 = bidFactory.maxBid3;
        console.log(res.data)
      })

    }

  $scope.bid = function(newBid, item){


    // if(!$scope.maxBid1){
    //   $scope.maxBid1=0;
    // }
    // if(!$scope.maxBid2){
    //   $scope.maxBid2=0;
    // }
    // if(!$scope.maxBid3){
    //   $scope.maxBid3=0;
    // }
        console.log($scope.maxBid2)
    newBid.item = item
    newBid.amount = parseInt(newBid.amount)
    newBid.bidder = userFactory.current_user._id
    console.log(newBid)
    // console.log('item: ')
    if(item == 1 && bidFactory.maxBid1 < newBid.amount){
      bidFactory.bid(newBid, $scope.maxBid1, item, function(res){
        $scope.index()
      })
    }
    if(item == 2 && bidFactory.maxBid2 < newBid.amount){
          console.log('called')
      bidFactory.bid(newBid, $scope.maxBid2, item, function(res){
        $scope.index()
      })
    }
    if(item == 3 && bidFactory.maxBid3 < newBid.amount){
      bidFactory.bid(newBid, $scope.maxBid3, item, function(res){
        $scope.index()
      })
    }
    if(item == 1 && $scope.maxBid1 > newBid.amount){
      $scope.error_max1 = "Not High Enough"
    }
    if(item == 2 && $scope.maxBid2 > newBid.amount){
      $scope.error_max2 = "Not High Enough"
    }
    if(item == 3 && $scope.maxBid3 > newBid.amount){
      $scope.error_max3 = "Not High Enough"
    }


  }
  $scope.end = function(){
    if(bidFactory.maxBid1 != 0 && bidFactory.maxBid2 != 0 && bidFactory.maxBid3 != 0){
      bidFactory.end(function(res){
        $location.url('high')
    })
      }
    else{
      $scope.end_error = "All Values Must Have Bids"
    }
  }
  $scope.index()
  }])
