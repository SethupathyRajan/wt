var app = angular.module('chatApp', []);

app.controller('ChatController', ['$http', '$interval', function($http, $interval) {
  var self = this;
  self.name = '';
  self.text = '';
  self.messages = [];

  self.loadMessages = function() {
    $http.get('http://localhost:3000/messages').then(res => {
      self.messages = res.data;
 
      setTimeout(() => {
        var chatBox = document.getElementById('chatBox');
        chatBox.scrollTop = chatBox.scrollHeight;
      }, 0);
    });
  };


  self.sendMessage = function() {
    if (!self.name || !self.text) {
      alert('Enter name and message!');
      return;
    }
    $http.post('http://localhost:3000/message', {
      name: self.name,
      text: self.text
    }).then(() => {
      self.text = '';
      self.loadMessages(); 
    });
  };

  self.loadMessages();


  $interval(self.loadMessages, 2000);
}]);
