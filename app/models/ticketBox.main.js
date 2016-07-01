import { default as controllersModuleName } from './../Controllers/ticketBox.controllers.js';
import { default as servicesModuleName } from './ticketBox.services.js';
import { default as directivesModuleName } from './ticketBox.directives.js';

var moduleName = 'ticketBox';

function config($routeProvider){
  $routeProvider
    .when('/',{
      templateUrl:'views/home.html',
      controller:'ticketBox.homeController',
      controllerAs:'vm'
    })
    .when('/addTicket',{
      templateUrl:'views/addTicket.html',
      controller:'ticketBox.AddTicketController',
      controllerAs:'vm'
    })
    .when('/archive', {
      templateUrl:'views/archive.html',
      controller:'ticketBox.ClosedController',
      controllerAs:'vm'
    })
    .otherwise({redirectTo:'/'});
}

config.$inject = ['$routeProvider'];

var app = angular.module(moduleName, ['ngRoute','ngMessages', servicesModuleName, controllersModuleName, directivesModuleName])
  .config(config);

export default moduleName;