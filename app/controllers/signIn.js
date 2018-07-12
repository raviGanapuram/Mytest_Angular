myAppcontroller.controller('signin', function ($scope, $location, $http, Notification, $window) {
    console.log('signin constroller');
    $scope.login = {};
    $scope.gotoSignup = function () {
        $location.path('/register');
    }
    $scope.parseJwt = function (token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse($window.atob(base64));
    };

    $scope.logedIn = function () {
        console.log($scope.login);
        var params_body = 'email=' + $scope.login.email + '&password=' + $scope.login.password;
        $http({
            method: 'POST',
            data: params_body,
            url: localServer + 'api/auth/login',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).success(function (data, status) {
            console.log(data);
            localStorage.setItem('userToken', JSON.stringify(data.token))
            console.log(JSON.stringify(data.token))
            var userInformation = $scope.parseJwt(data.token);
            console.log(userInformation)
            localStorage.setItem('userInformation', JSON.stringify(userInformation))
            Notification.success('login  Successfully');
            $location.path('/home')
        }).error(function (data, status) {
            console.log('error');
            console.log(data);
        })

    }
})