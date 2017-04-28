app.factory('bidFactory', ['$http', '$cookies', function($http, $cookies) {
  var factory = {};

  factory.index = function(callback) {
    console.log("factory index")
      $http.get('/pull').then(function(res){
        callback(res);
      });
  }

  factory.bid = function(newBid, maxBid, item, callback) {
    $http.post('/bid', newBid).then(function(res){

      console.log(res.data)
    if(item == 1){

      factory.maxBid1 = newBid.amount
      factory.maxBidder1 = newBid.bidder
    }
    if(item == 2){
      factory.maxBid2 = newBid.amount
      factory.maxBidder2 = newBid.bidder
    }
    if(item == 3){
      factory.maxBid3 = newBid.amount
      factory.maxBidder3 = newBid.bidder
    }

        callback(res);


              });
      }
  factory.end = function(callback) {
    console.log('apple')
      $http.post('/end').then(function(res){
        callback(res)
      })
  }


  factory.start = function() {
  console.log('factory start')
  factory.maxBid1 = 0
  factory.maxBid2 = 0
  factory.maxBid3 = 0
  }

  factory.getMax = function(callback) {
    $http.get('/getMax').then(function(res){
      console.log(res.data)
      if(res.data[0]){
        factory.maxBid1 = res.data[0].amount
      }
      if(res.data[1]){
        factory.maxBid2 = res.data[1].amount
      }
      if(res.data[2]){
        factory.maxBid3 = res.data[2].amount
      }

      callback(res)
    })
  }


  return factory;
}]);
