import angular from 'angular';
import components from './components';
import services from './services';
import './scss/main.scss';
import uiRouter from 'angular-ui-router';
import defaultRoute from 'angular-ui-router-default';
import routes from './routes';
import duScroll from 'angular-scroll';
import TweenMax from 'gsap';
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

app.animation('.slide-animation', function ($window) {
    return {
        addClass: function (element, className, done) {
            if (className == 'ng-hide') {
                // console.log('element', element.parent());
                console.log('$window', $window.innerWidth);
                TweenMax.to(element, 0.3, {left: $window.innerWidth, onComplete: done });
            }
            else {
                done();
            }
        },
        removeClass: function (element, className, done) {
            if (className == 'ng-hide') {
                // console.log('element', element.parent());
                element.removeClass('ng-hide');
                TweenMax.set(element, { left: $window.innerWidth });
                TweenMax.to(element, 0.3, {left: 0, onComplete: done });
            }
            else {
                done();
            }
        }
    };
}); 