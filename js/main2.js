$('select').dropdown({
    on: 'hover'
});
// Initialize the Firebase SDK
var config = {
    apiKey: 'AIzaSyDQHP16UR5Mpai1JYhkHv4fsVHtyWni9nM',
    authDomain: 'localhost',
    databaseURL: "https://pumper-eb154.firebaseio.com"
};
firebase.initializeApp(config);
var app = angular.module("moist", ["firebase"]);
app.controller("moist_ctrl", function ($scope, $firebaseObject, $firebaseArray) {
    ($firebaseObject(firebase.database().ref('/data'))).$bindTo($scope, 'all_data');
    $scope.clear_data = () => {
        firebase.database().ref('/data').remove();
    }
});