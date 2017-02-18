import angular from 'angular';
import components from './components';
import services from './services';
import './scss/main.scss';
import uiRouter from 'angular-ui-router';
import defaultRoute from 'angular-ui-router-default';
import routes from './routes';
import duScroll from 'angular-scroll';
// import ngAnimate from 'angular-animate';
//TODO: figure out why things broken when a imported angular animate in the es6y way

const app = angular.module('myApp', [
    components,
    services,
    uiRouter,
    duScroll,
    require('angular-animate'),
    defaultRoute
]);

const dev = 'http://localhost:3000/api';

app.config(routes);

app.value('apiUrl', dev);

app.factory('apiUrl', function() {
    return dev;
});