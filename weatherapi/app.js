
    var app = angular.module('weatherApp', []);


    app.filter('toCelsius', function() {
      return function(kelvin) {
        if (!kelvin) return '';
        return (kelvin - 273.15).toFixed(1) + ' °C';
        };
    });

    app.controller('WeatherCtrl', function($scope, $http) {
      $scope.getWeather = function() {
        if (!$scope.city) return alert("Please enter a city name!");

        const apiKey = "8bcf2d12ab4398a0483bc1c4eae67a92"; 
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${$scope.city}&appid=${apiKey}`;

     
        $http.get(url)
          .then(function(response) {
            $scope.weather = response.data;
          })
          .catch(function(error) {
            alert("City not found! Try again.");
            console.log(error);
          });
      };
    });

  
    app.directive('weatherCard', function() {
      return {
        restrict: 'E', 
        scope: { data: '=' }, 
        template: `
          <div class="weather-card" ng-if="data">
            <h3>{{data.name}}</h3>
            <p class="temp">{{data.main.temp | toCelsius}}</p>
            <p class="desc">{{data.weather[0].description}}</p>
            <p>Humidity: {{data.main.humidity}}%</p>
          </div>
        `
      };
    });
