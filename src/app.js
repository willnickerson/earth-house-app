import angular from 'angular';
import components from './components';
import services from './services';
import './scss/main.scss';
import uiRouter from 'angular-ui-router';
import defaultRoute from 'angular-ui-router-default';
import routes from './routes';
import duScroll from 'angular-scroll';
// import carousel from 'angular-carousel';
// var ngTouch = require('angular-touch'); //eslint-disable-line
import TweenMax from 'gsap';
import ngAnimate from 'angular-animate';
//TODO: figure out why things broken when a imported angular animate in the es6y way


const app = angular.module('myApp', [
    components,
    services,
    uiRouter,
    duScroll,
    ngAnimate,
    defaultRoute
]);

const dev = 'http://localhost:3000/api';

app.config(routes);

app.value('apiUrl', dev);

app.factory('apiUrl', function() {
    return dev;
});

app.animation('.slide-animation', function ($window) {
    // return {
    //     addClass: function (element, className, done) {
    //         if (className === 'ng-hide') {
    //             TweenMax.to(element, 1, {right: $window.innerWidth, onComplete: done });
    //         }
    //         else {
    //             done();
    //         }
    //     },
    //     removeClass: function (element, className, done) {
    //         if (className === 'ng-hide') {
    //             console.log('remove class called')
    //             element.removeClass('ng-hide');
    //             TweenMax.set(element, { right: $window.innerWidth });
    //             TweenMax.to(element, 1, {right: 0, onComplete: done });
    //         }
    //         else {
    //             done();
    //         }
    //     }
    // };

    return {
        beforeAddClass: function (element, className, done) {
            var scope = element.scope();

            if (className == 'ng-hide') {
                var finishPoint = $window.innerWidth;
                if(scope.direction !== 'right') {
                    finishPoint = -finishPoint;
                }
                TweenMax.to(element, 2, {left: finishPoint, onComplete: done });
            }
            else {
                done();
            }
        },
        removeClass: function (element, className, done) {
            var scope = element.scope();
            console.log('remove class called')
            if (className == 'ng-hide') {
                element.removeClass('ng-hide');
                console.log('element', element);

                var startPoint = $window.innerWidth;
                if(scope.direction === 'right') {
                    startPoint = -startPoint;
                }

                TweenMax.fromTo(element, 2, { left: startPoint }, {left: 0, onComplete: done });
            }
            else {
                done();
            }
        }
    };
}); 