import template from './shop.html';
import styles from './shop.scss';

export default {
    template,
    bindings: {
        juices: '<',
        cart: '=',
        hasSeenLanding: '='
    },
    controller 
};

controller.$inject = ['$scope', '$document', '$timeout', 'shopService'];

function controller($scope, $document, $timeout, shopService) {
    this.$onInit = () => {
        shopService.getAll()
            .then(data => {
                if(!data.length) {
                    this.content = {
                        imgUrl: 'http://res.cloudinary.com/lejipni8p/image/upload/c_crop,g_south,h_2530,w_4096/v1482867018/earth%20house/blue-spread_ixxxfx.jpg',
                        buttonText: 'Juice Rulez!!!'
                    };
                } else {
                    this.content = data[0];
                }
            });
    };
    this.styles = styles;
    this.cartMessage = false;
    this.selectArray = [];

    const items = angular.element(document.getElementById('items')); //eslint-disable-line
    this.goToItems = function() {
        this.hasSeenLanding = true;
        $document.scrollToElement(items, 0, 600);
    };
  

    for(var i = 0; i < 10; i++) {
        this.selectArray.push(i + 1);
    }

    this.addToCart = function(juice) {
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