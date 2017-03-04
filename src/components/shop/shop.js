import template from './shop.html';
import styles from './shop.scss';

export default {
    template,
    bindings: {
        juices: '<'
    },
    controller 
};

controller.$inject = ['$scope', '$document'];

function controller($scope, $document) {
    this.styles = styles;

    const items = angular.element(document.getElementById('items')); //eslint-disable-line
    this.gotoItems = function() {
        console.log('angular scroll function called');
        $document.scrollToElement(items, 0, 600);
    };

    
    this.selectArray = [];

    for(var i = 0; i < 10; i++) {
        this.selectArray.push(i + 1);
    }

    this.quantity = 0;

    this.addToCart = function(quantity) {
        console.log('add to cart', quantity);
        this.quantity = 0;
    };
}

