app.controller("page3", function ($scope, sharedProperties) {
    var recovery = sharedProperties.getRecoveryMail();
    $scope.LoginMail = recovery;
    console.log('page3: Send recovery mail to:' +recovery);
    $scope.content = 'sorry, not implemented yet. mail is to be sent to: ' + recovery;
});
