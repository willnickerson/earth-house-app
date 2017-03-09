import template from './checkout.html';
import styles from './checkout.scss';


export default {
    template,
    bindings: {
        cart: '='
    },
    controller
};

controller.$inject = ['paymentService', '$scope'];

function controller(paymentService, $scope) {
    this.styles = styles;
    this.items = {};
    this.address = {};
    this.selectArray = [];
    this.maxQuant = 10;
    this.total = 0;
    this.cityArray = ['Portland', 'Beaverton', 'Vancouver', 'Gresham', 'Lake Oswego'];
    this.confirmCart = false;

    for(var i = 0; i <= this.maxQuant; i++) {
        this.selectArray.push(i);
    }

    this.$onInit = () => {
        this.getItems();
    };
    
    this.getItems = function() {
        Object.keys(this.cart).forEach(key => {
            if(key !== 'totalItems' && key !== 'updateTotalItems' && key !== 'storeCart') {
                this.items[key] = this.cart[key];
                this.items[key].subTotal = this.items[key].price * this.items[key].quantity;
                this.total += this.items[key].subTotal;
                $scope.total = this.total * 100; //this is because stripe will need a total in cents not dollars
            }
        });
    };

    console.log(this.total);

    this.updateCart = function(item, newQunatity) {
        let juiceToUpdate = {};
        Object.keys(this.cart).forEach(key => {
            const cartItem = this.cart[key];
            if(item.name === cartItem.name) {
                juiceToUpdate = cartItem;
            }
        });
        juiceToUpdate.quantity = newQunatity;
        this.getItems();
        this.cart.updateTotalItems();
        this.cart.storeCart();
        console.log(this.cart);
    };

    this.removeItem = item => {
        Object.keys(this.cart).forEach(key => {
            if(this.cart[key].name === item.name) {
                delete this.cart[key];
                delete this.items[key];
            }
        });
        this.getItems();
        this.cart.updateTotalItems();
        this.cart.storeCart();
    };


    $scope.stripeCallback = function(code, result) {
        if(result.error) {
            console.log('ERROR', result.error.message);
        } else {
            console.log('token: ', result.id, 'total: ', $scope.total);
            const orderInfo = {
                stripeToken: result.id,
                chargeAmount: $scope.total
            };
            paymentService.post(orderInfo);
        }
    };
}

