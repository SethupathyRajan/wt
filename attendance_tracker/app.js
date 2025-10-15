var app = angular.module("AttendanceApp",["ngAnimate"]);

app.service("AttendanceService",function($http){
    const base_url = "http://localhost:3000/attendance";
    this.getAll = () => $http.get(base_url);
    this.add = (data) => $http.post(base_url, data);
    this.update = (id,data) => $http.put(`${base_url}/${id}`,data);
    this.delete = (id) => $http.delete(`${base_url}/${id}`);
    
});

app.controller("MainCtrl",function($scope,AttendanceService){
    $scope.records = [];
    $scope.statusFilter = {};

    function load(){
        AttendanceService.getAll().then(res => $scope.records = res.data);
    }

    $scope.addRecord = function() {
        if(!$scope.record || !$scope.record.name) return;
        AttendanceService.add($scope.record).then(()=>{
            load();
            $scope.record = {};
        })
    };

    $scope.updateStatus = function(r, status){
        r.status = status;
        AttendanceService.update(r._id, r).then(load);
        
    };

    $scope.deleteRecord = function(id){
        AttendanceService.delete(id).then(load);
    };

    $scope.filterStatus = function(status){
        if( status === "All") $scope.statusFilter = {};
        else $scope.statusFilter = {status: status};
    };

    load();
});