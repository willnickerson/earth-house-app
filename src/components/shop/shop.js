import template from './shop.html';
import styles from './shop.scss';

export default {
    template,
    bindings: {
        juices: '<',
        cart: '='
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


    this.addToCart = function(juice) {
        console.log('add to cart', juice.name, ':', juice.quantity);
        if(this.cart.hasOwnProperty(juice._id)) {
            this.cart[juice._id].quantity += juice.quantity;
        } else {
            this.cart[juice._id]= {
                name: juice.name,
                price: juice.price,
                quantity: juice.quantity
            };
        }
        this.cart.updateTotalItems(juice.quantity);
        const cartString = JSON.stringify(this.cart);
        localStorage.setItem('earth-house-cart', cartString); //eslint-disable-line
        juice.quantity = 0;
    };

}