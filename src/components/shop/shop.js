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

controller.$inject = ['$scope', '$document', '$timeout'];

function controller($scope, $document, $timeout) {
    this.styles = styles;
    this.cartMessage = false;

    const items = angular.element(document.getElementById('items')); //eslint-disable-line
    this.gotoItems = function() {
        $document.scrollToElement(items, 0, 600);
    };

    
    this.selectArray = [];

    for(var i = 0; i < 10; i++) {
        this.selectArray.push(i + 1);
    }


    this.addToCart = function(juice) {
        console.log('add to cart', juice.name, ':', juice.quantity);
        if(Number.isInteger(juice.quantity)) {
            let cartHasItem = false;
            let index = null;
            this.cart.items.forEach(item => {
                if(item.id === juice._id) {
                    cartHasItem = true;
                    index = this.cart.items.indexOf(item);
                }
            });
            if(!cartHasItem) {
                this.cart.items.push({
                    id: juice._id,
                    name: juice.name,
                    price: juice.price,
                    quantity: juice.quantity
                });
            } else {
                this.cart.items[index].quantity += juice.quantity;
            }
            this.cart.updateTotalItems();
            this.cart.storeCart();
            console.log(this.cart);
            juice.messageNum = juice.quantity;
            juice.checkoutMessage = false;
            juice.cartMessage = true;
            $timeout(() => {
                juice.cartMessage = false;
                juice.checkoutMessage = true;
            }, 1000);
            $timeout(() => {
                juice.checkoutMessage = false;
            }, 6000);
            juice.quantity = 0;
        } else {
            console.log('not an integer, display a message telling them to select a quantity');
        }
    };

}