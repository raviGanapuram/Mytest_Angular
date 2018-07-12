myAppcontroller.controller('regiter', function ($scope, $location, $http, Notification) {
    console.log('register constroller');
    $scope.register = {}
    $scope.registerUser = function () {
        console.log($scope.register)
        var params_body = 'name=' + $scope.register.name + '&password=' + $scope.register.password + '&email=' + $scope.register.email;
        $http({
            method: 'POST',
            data: params_body,
            url: localServer + 'api/auth/register',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).success(function (data, status) {
            console.log(data)
            Notification.success('Registerd Successfully');
            $location.path('/signin')
        }).error(function (data, status) {
            console.log('error');
        })

    }
    $scope.gotoSignin = function () {
        $location.path('/signin')
    }

})