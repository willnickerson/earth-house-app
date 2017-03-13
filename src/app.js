import angular from 'angular';
import components from './components';
import services from './services';
import './scss/main.scss';
import uiRouter from 'angular-ui-router';
import defaultRoute from 'angular-ui-router-default';
import routes from './routes';
import duScroll from 'angular-scroll';
import TweenMax from 'gsap';
import ngAnimate from 'angular-animate';
import ngSanitize from 'angular-sanitize';
import angularPayments from 'angular-payments'; //eslint-disable-line

//TODO: figure out why things broken when a imported angular animate in the es6y way


const app = angular.module('myApp', [
    components,
    services,
    uiRouter,
    duScroll,
    ngAnimate,
    ngSanitize,
    defaultRoute,
    'angularPayments'
]);

const dev = 'http://localhost:3000/api';
const url = process.env.API_URL || dev;
const test = process.env.TEST_VAR;

console.log('this is the api url', url);
console.log('this is the test to see if we can access the env', test), 
app.value('apiUrl', url);

// app.factory('apiUrl', function() {
//     return url;
// });

app.config(routes);
app.config(function($windowProvider) {
    const $window = $windowProvider.$get();
    $window.Stripe.setPublishableKey('pk_test_HS62OmJo7gCzA7fcN2ObL2rF');
});


app.animation('.slide-animation', function ($window) {

    return {
        beforeAddClass: function (element, className, done) {
            var scope = element.scope();

            if (className == 'ng-hide') {
                var finishPoint = $window.innerWidth;
                if(scope.direction !== 'right') {
                    finishPoint = -finishPoint;
                }
                TweenMax.to(element, 1.5, {left: finishPoint, onComplete: done, ease: Power2.easeIn}); //eslint-disable-line
            }
            else {
                done();
            }
        },
        removeClass: function (element, className, done) {
            var scope = element.scope();
            if (className == 'ng-hide') {
                element.removeClass('ng-hide');

                var startPoint = $window.innerWidth;
                if(scope.direction === 'right') {
                    startPoint = -startPoint;
                }

                TweenMax.fromTo(element, 1.5, { left: startPoint }, {left: 0, onComplete: done, ease: Power2.easeIn}); //eslint-disable-line
            }
            else {
                done();
            }
        }
    };
}); 
