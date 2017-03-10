import template from './checkout.html';
import styles from './checkout.scss';


export default {
    template,
    bindings: {
        cart: '='
    },
    controller
};

controller.$inject = ['paymentService', '$scope', '$state'];

function controller(paymentService, $scope, $state) {
    this.styles = styles;
    this.address = {};
    this.selectArray = [];
    this.maxQuant = 10;
    this.total = 0;
    this.cityArray = ['Portland', 'Beaverton', 'Vancouver', 'Gresham', 'Lake Oswego'];
    this.confirmCart = false;
    this.minPurchase = 50;
    //we will use min purchase to ensure that you cannot checkout unless you total is greater than this number

    for(var i = 0; i <= this.maxQuant; i++) {
        this.selectArray.push(i);
    }

    this.$onInit = () => {
        this.updateTotals();
        if(!this.cart.items.length) this.cartEmpty = true;
    };

    this.updateTotals = function() {
        this.total = 0;
        this.cart.items.forEach(item => {
            item.subTotal = item.price * item.quantity;
            this.total += item.subTotal;
        });
        $scope.total = this.total;
    };
    
    this.updateCart = function(item, newQunatity) {
        //do we want to completely remove item if the new quant is 0?
        const index = this.cart.items.indexOf(item);
        this.cart.items[index].quantity = newQunatity;
        this.updateTotals();
        this.cart.updateTotalItems();
        this.cart.storeCart();
    };

    this.removeItem = item => {
        const index = this.cart.items.indexOf(item);
        this.cart.items.splice(index, 1);
        this.updateTotals();
        this.cart.updateTotalItems();
        this.cart.storeCart();
    };

    this.showPaymentDiv = () => {
        this.showPayment = true;
    };

    this.setOrderInfo = () => {
        $scope.orderInfo = {
            name: this.address.firstName + ' ' + this.address.lastName,
            address: {
                line_1: this.address.line1,
                line_2: this.address.line2,
                city: this.address.city,
                state: this.address.state,
                zip: this.address.zip
            },
            items: this.cart.items,
            total: this.total
        };
        $scope.resetCart = this.initializeCart;
    };


    $scope.stripeCallback = function(code, result) {
        console.log('In stripe callback', $scope.orderInfo);
        if(result.error) {
            console.log('ERROR', result.error.message);
            $scope.invalidPayment = true;
            console.log($scope.invalidPayment);
        } else {
            //we need to put an order into our db and send the _id as the metadata to stripe
            paymentService.createOrder($scope.orderInfo)
                .then(data => {
                    const orderId = data._id;
                    console.log('data returned from payment service', data, orderId);
                    const paymentInfo = {
                        stripeToken: result.id,
                        chargeAmount: $scope.total,
                        metadata: orderId
                    };
                    paymentService.post(paymentInfo);
                    localStorage.removeItem('earth-house-cart'); //eslint-disable-line
                    $state.go('success');
                });
        }
    };

}

