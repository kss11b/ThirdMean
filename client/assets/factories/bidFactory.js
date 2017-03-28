app.factory('bidFactory', ['$http', '$cookies', function($http, $cookies) {
  var factory = {};

  factory.index = function(callback) {
    console.log("factory index")
      $http.get('/pull').then(function(res){
        callback(res);
      });
  }

  factory.bid = function(newBid, maxBid, item, callback) {
    if(item == 1 && maxBid < newBid.amount){

      factory.maxBid1 = newBid.amount
      factory.maxBidder1 = newBid.bidder
    }
    if(item == 2 && maxBid < newBid.amount){
      factory.maxBid2 = newBid.amount
      factory.maxBidder2 = newBid.bidder
    }
    if(item == 3 && maxBid < newBid.amount){
      factory.maxBid3 = newBid.amount
      factory.maxBidder3 = newBid.bidder
    }
      $http.post('/bid', newBid).then(function(res){
        console.log(res.data)
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



  return factory;
}]);
