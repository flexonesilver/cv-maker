angular.module('starter.controllers', [])

    .controller('LoginController', function($scope, $context,$state, $ionicLoading) {
        var vm = this;
        $ionicLoading.show({
            template: 'Loading...'
        });
        function activate() {
            $context.model("User").asQueryable().filter("id eq me()").first().getItem().then(function(result) {
                $ionicLoading.hide();
                if (result.name !== "anonymous") {
                    $state.go("profile");
                }
            }).catch(function(err) {
                console.log(err);
                $ionicLoading.hide();
            });
          vm.login = function(username, password) {
            $context.authenticate(username,password).then(function(result) {
              $state.go("profile");
            }).catch(function(err) {
              vm.message = err.message;
            }); 
          }
        }
      activate();
    })
    .controller('ProfileController', function($scope, $context, $state) {
        var vm = this;
        function activate() {
            $context.model("Person").asQueryable().filter("id eq person()").first().getItem().then(function(result) {
                vm.profile = result;
            }).catch(function(err) {
                console.log(err);
            })
        }
        activate();
    })

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
