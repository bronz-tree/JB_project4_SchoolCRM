app.factory('adminFactory',['$http',function($http) {

    var adminsModel = {};
    var data = null;
    myModel.getAdmins = function() {
        return $http.get('http://playlist.jbfullstack.com/playlist');
    };
    myModel.getAdmin = function(id) {
        return $http.post('http://playlist.jbfullstack.com/playlist/'+id);
    };
    myModel.getPlaylistSongs = function(id) {
        return $http.get('http://playlist.jbfullstack.com/playlist/'+id+'/songs');
    };
    myModel.setParam = function(newData) {
        data = newData;
    };
    myModel.getParam = function() {
        return data;
    };

    return myModel;
}]);