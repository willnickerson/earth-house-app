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
// import stripeCheckout from 'angular-stripe-checkout';
// import stripe from 'stripe';
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
    // 'angular-payments'
    // stripe,
    // stripeCheckout
]);

const dev = 'http://localhost:3000/api';

app.config(routes);

app.config(function($windowProvider) {
    const $window = $windowProvider.$get();
    $window.Stripe.setPublishableKey('pk_test_HS62OmJo7gCzA7fcN2ObL2rF');
});

app.value('apiUrl', dev);

app.factory('apiUrl', function() {
    return dev;
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
