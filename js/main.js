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
    ctx = document.getElementById("myChart").getContext('2d');
    temp = {
        label: 'Nhiệt độ',
        data: [],
        backgroundColor: '#ffffff00',
        borderColor: '#DB2828',
        borderWidth: 1
    };
    humi = {
        label: 'Độ ẩm không khí',
        data: [],
        backgroundColor: '#ffffff00',
        borderColor: '#2185D0',
        borderWidth: 1
    };
    moist = {
        label: 'Độ ẩm đất',
        data: [],
        backgroundColor: '#ffffff00',
        borderColor: '#21BA45',
        borderWidth: 1
    };
    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [temp, humi, moist]
        }, xAxes: [{
            type: 'time',
            ticks: {
                autoSkip: true,
                maxTicksLimit: 20
            }
        }]
    });
    ($firebaseObject(firebase.database().ref('/current'))).$bindTo($scope, 'data');
    ($firebaseObject(firebase.database().ref('/config'))).$bindTo($scope, 'config');
    ($firebaseObject(firebase.database().ref('/data'))).$bindTo($scope, 'all_data');
    var list = $firebaseArray(firebase.database().ref('/data'));
    list.$ref().orderByChild("time").limitToLast(20).on("child_added", function (snapshot) {
        snapshot = snapshot.val();
        _date = new Date(snapshot.time * 1000);
        console.log(snapshot);
        myChart.data.labels.push('' + _date.getHours() + ':' + _date.getMinutes() + ':' + _date.getSeconds());
        temp.data.push(snapshot.temp);
        humi.data.push(snapshot.humi);
        moist.data.push(snapshot.moist);
        while (myChart.data.labels.length > 20) {
            myChart.data.labels.shift();
            temp.data.shift();
            humi.data.shift();
            moist.data.shift();
        }
        myChart.update();
    });
});