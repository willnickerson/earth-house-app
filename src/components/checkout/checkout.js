import template from './checkout.html';
import styles from './checkout.scss';


export default {
    template,
    bindings: {
        cart: '='
    },
    controller
};

controller.$inject = ['paymentService', '$scope', '$state', 'pickupService', 'dateService'];

function controller(paymentService, $scope, $state, pickupService, dateService) {
    this.styles = styles;
    this.address = {
        firstName: null,
        lastName: null,
        email: null,
        line1: null,
        line2: null,
        city: null,
        state: null,
        zip: null
    };
    this.selectArray = [];
    this.maxQuant = 10;
    this.total = 0;
    this.cityArray = ['Portland', 'Beaverton', 'Vancouver', 'Gresham', 'Lake Oswego'];
    this.confirmCart = false;
    this.minPurchase = 50;
    this.invalidAddress = false;
    //we will use min purchase to ensure that you cannot checkout unless you total is greater than this number

    for(var i = 0; i <= this.maxQuant; i++) {
        this.selectArray.push(i);
    }

    this.$onInit = () => {
        this.updateTotals();
        if(!this.cart.items.length) this.cartEmpty = true;
        
        pickupService.getVisible()
            .then(pickups => {
                dateService.alphabetize(pickups);
                this.pickups = pickups;
            });
    };

    this.confirmPickup = () => {
        const currentTime = Date.now();
        this.timeLimit = currentTime + 1000 * 60 * 60 * 48; //48 hours from the current time;
        for(var i = 0; i < 8; i++) {
            const date = new Date(3600000 * 24 * i + this.timeLimit);
            const day = date.toDateString().split(' ')[0];
            if(day === this.pickup.day) {
                i = 8;
                this.pickupDate = date;
            }
        }
        this.pickup.startPretty = dateService.hourValuetoObj(this.pickup.startTime).time;
        this.pickup.endPretty = dateService.hourValuetoObj(this.pickup.endTime).time;
        console.log(this.pickupDate);
    };

    this.updateTotals = function() {
        this.total = 0;
        this.cart.items.forEach(item => {
            item.subTotal = item.price * item.quantity;
            this.total += item.subTotal;
        });
        $scope.total = this.total * 100; //stripe takes payment as a cents value 
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

    //for browsers that do not support the form require attribute
    this.checkAddress = () => {
        console.log(this.address);
        let valid = true;
        Object.keys(this.address).forEach(key => {
            if(key !== 'line2' && !this.address[key]) {
                console.log('invalid', this.address[key]);
                valid = false;  
            } 
        });
        return valid;
    };

    this.showPaymentDiv = () => {
        console.log(this.orderType);
        if(!this.checkAddress()) {
            this.invalidAddress = true;
            return;
        }
        if(this.address.email === this.address.emailCheck) {
            this.showPayment = true;
            this.emailWarning = false;
            this.showAddressForm = false; 
            this.setOrderInfo();
        }
        else {
            this.emailWarning = true;
        }
    };

    this.setOrderInfo = () => {
        $scope.orderInfo = {
            name: this.address.firstName + ' ' + this.address.lastName,
            email: this.address.email,
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
                        description: orderId
                    };
                    paymentService.post(paymentInfo);
                    localStorage.removeItem('earth-house-cart'); //eslint-disable-line
                    $state.go('success');
                });
        }
    };

}

