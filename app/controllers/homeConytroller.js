myAppcontroller.controller('home', function ($scope, $location, $http, Notification, $uibModal) {
    $scope.userToken = JSON.parse(localStorage.getItem('userToken'));
    $scope.userInfo = JSON.parse(localStorage.getItem('userInformation'))
    $scope.examObj = {}
    $scope.lesObj = {}
    $scope.plObj = {}
    $scope.updateTrue = false
    $scope.updateLesTrue = false
    $scope.updateExTrue = false

    $scope.getlanguages = function () {
        $http({
            method: 'GET',
            url: localServer + 'api/language/getLanguages',
            headers: {
                'access-token': $scope.userToken
            }
        }).success(function (data, status) {
            console.log(data);
            $scope.allLanguages = data
        }).error(function (data, status) {
            console.log(data);
            Notification.error(data.description);
        })
    }
    $scope.getallLesson = function () {
        $http({
            method: 'GET',
            url: localServer + 'api/lesson/getlessons',
            headers: {
                'access-token': $scope.userToken
            }
        }).success(function (data, status) {
            console.log(data);
            $scope.alllessons = data
        }).error(function (data, status) {
            console.log(data);
            Notification.error(data.description);
        })
    }
    $scope.getAllExamples = function () {
        $http({
            method: 'GET',
            url: localServer + 'api/example/getExamples',
            headers: {
                'access-token': $scope.userToken
            }
        }).success(function (data, status) {
            console.log(data);
            $scope.allexamples = data
        }).error(function (data, status) {
            console.log(data);
            Notification.error(data.description);
        })
    }
    $scope.getlanguages();
    $scope.getallLesson();
    $scope.getAllExamples();
    $scope.createLangauge = function () {
        console.log($scope.plObj);
        $http({
            method: 'POST',
            data: JSON.stringify($scope.plObj),
            headers: {
                'access-token': $scope.userToken
            },
            url: localServer + 'api/language/createLanguage'
        }).success(function (data, status) {
            console.log(data);
            $scope.plObj = ''
            $scope.allLanguages = data
            Notification.success('Langauage created Successfully');
        }).error(function (data, status) {
            console.log(data);
            Notification.error(data.description);
        })
    }

    $scope.delLanguage = function (id) {
        if (confirm("Are you sure you want to delete? ")) {
            $http({
                method: 'DELETE',
                headers: {
                    'access-token': $scope.userToken
                },
                url: localServer + 'api/language/deleteLanguage/' + id
            }).success(function (data, status) {
                console.log(data);
                $scope.allLanguages = data,
                    Notification.success(' Deleted Successfully');
            }).error(function (data, status) {
                console.log(data);
                Notification.error(data.description);
            })
        }
    }

    $scope.updateDetails = function (updateDetails) {
        $scope.plObj = ''
        $scope.updateTrue = true
        $scope.updateLid = updateDetails.id
        $scope.plObj = updateDetails
    }
    $scope.updateLdetails = function () {
        console.log($scope.plObj);
        $http({
            method: 'PUT',
            data: JSON.stringify($scope.plObj),
            headers: {
                'access-token': $scope.userToken
            },
            url: localServer + 'api/language/updateLanguage/' + $scope.updateLid
        }).success(function (data, status) {
            console.log(data);
            $scope.updateTrue = false
            $scope.plObj = {}
            $scope.allLanguages = data,
                Notification.success('Langauage updated Successfully');
        }).error(function (data, status) {
            console.log(data);
            Notification.error(data.description);
        })
    }

    $scope.createLesson = function () {
        console.log($scope.lesObj)
        $http({
            method: 'POST',
            data: JSON.stringify($scope.lesObj),
            headers: {
                'access-token': $scope.userToken
            },
            url: localServer + 'api/lesson/createLesson'
        }).success(function (data, status) {
            console.log(data);
            $scope.lesObj = {}
            $scope.alllessons = data
            Notification.success('Lesson created Successfully');
        }).error(function (data, status) {
            console.log(data);
            Notification.error(data.description);
        })
    }
    $scope.delLesson = function (id) {
        if (confirm("Are you sure you want to delete? ")) {
            $http({
                method: 'DELETE',
                headers: {
                    'access-token': $scope.userToken
                },
                url: localServer + 'api/lesson/deleteLesson/' + id
            }).success(function (data, status) {
                console.log(data);
                $scope.alllessons = data
                Notification.success(' Deleted Successfully');
            }).error(function (data, status) {
                console.log(data);
                Notification.error(data.description);
            })
        }
    }
    $scope.updateLesson = function (lessDetails) {
        $scope.updateLesTrue = true
        $scope.lesObj = lessDetails;
        $scope.lesObj.name = lessDetails.lession_name
        $scope.lesObj.pid = lessDetails.pl_id

    }
    $scope.updateLesdetails = function () {
        $http({
            method: 'PUT',
            data: JSON.stringify($scope.lesObj),
            headers: {
                'access-token': $scope.userToken
            },
            url: localServer + 'api/lesson/updateLesson/' + $scope.lesObj.id
        }).success(function (data, status) {
            $scope.updateLesTrue = false
            $scope.lesObj = {}
            $scope.alllessons = data
            Notification.success('Lesson updated Successfully');
        }).error(function (data, status) {
            console.log('error');
            Notification.error(data.description);
        })
    }

    $scope.changedLesson = function (selectedLession) {
        console.log(selectedLession.id)
        $scope.lid = selectedLession.id
        $scope.examObj.lid = $scope.lid
    }
    $scope.createExample = function () {
        $scope.examObj.lid = $scope.lid
        $http({
            method: 'POST',
            data: JSON.stringify($scope.examObj),
            headers: {
                'access-token': $scope.userToken
            },
            url: localServer + 'api/example/creatEexample'
        }).success(function (data, status) {
            console.log(data);
            $scope.allexamples = data
            $scope.examObj = {}
            Notification.success('Example created Successfully');
        }).error(function (data, status) {
            console.log(data);
            Notification.error(data.description);
        })
    }
    $scope.updateExample = function (example) {
        for (var i = 0; $scope.alllessons.length > i; i++) {
            if ($scope.alllessons[i].id == example.le_id) {
                $scope.lid = example.le_id
                $scope.selectedLession = $scope.alllessons[i]
            }
        }
        $scope.exId = example.id
        $scope.updateExTrue = true
        $scope.examObj.example = example.example

    }
    $scope.doUpdateEx = function () {
        $scope.examObj.lid = $scope.lid
        $scope.examObj.id = $scope.exId
        console.log($scope.examObj)
        $http({
            method: 'PUT',
            data: JSON.stringify($scope.examObj),
            headers: {
                'access-token': $scope.userToken
            },
            url: localServer + 'api/example/updateExample/' + $scope.examObj.id
        }).success(function (data, status) {
            $scope.updateExTrue = false
            $scope.examObj = {}
            $scope.allexamples = data
            Notification.success('Example updated Successfully');
        }).error(function (data, status) {
            console.log(data);
            Notification.error(data.description);
        })
    }


    $scope.delExample = function (id) {
        if (confirm("Are you sure you want to delete? ")) {
            // todo code for deletion
            $http({
                method: 'DELETE',
                headers: {
                    'access-token': $scope.userToken
                },
                url: localServer + 'api/example/deleteExample/' + id
            }).success(function (data, status) {
                console.log(data);
                $scope.allexamples = data
                Notification.success(' Deleted Successfully');
            }).error(function (data, status) {
                console.log(data);
                Notification.error('Internal server error');
            })
        } else {
            console.log('Not deleting')
        }

    }

    $scope.logOut = function () {
        $location.path('/signin')
    }

})