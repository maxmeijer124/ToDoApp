/**
 * Created by redmax on 01-07-16.
 */
app.controller("LoginCtrl", function($scope, $location, $rootScope) {
    $scope.login = function() {
        $rootScope.loggedInUser = $scope.username;
        $location.path("/persons");
    };
});