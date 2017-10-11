app.controller("page2", function ($scope, sharedProperties,$location) {
    console.log('page2' + $scope.LoginMail);
    $scope.updateSharedProperties = function () {
        sharedProperties.setRecoveryMail($scope.LoginMail);
        $location.path('/ConfirmMailSent');
    };
    console.log('page2 res:' + sharedProperties.getRecoveryMail());
});
