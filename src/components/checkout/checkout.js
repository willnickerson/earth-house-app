import template from './checkout.html';
import styles from './checkout.scss';


export default {
    template,
    bindings: {
        cart: '='
    },
    controller
};

controller.$inject = ['paymentService', '$scope', '$state', 'pickupService', 'dateService', 'orderPickupService', 'checkoutContentService'];

function controller(paymentService, $scope, $state, pickupService, dateService, orderPickupService, checkoutContentService) {
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
        checkoutContentService.getAll()
            .then(data => {
                if(!data.length) {
                    this.content = {
                        text: '',
                        pickupText: '',
                        deliveryText: '',
                        pickup: false,
                        cdelivery: false
                    };
                } else {
                    this.content = data[0];
                    
                }
                this.pickupStyle = [this.styles.method];
                this.deliveryStyle = [this.styles.method];
                if(this.content.pickup) {
                    this.pickupStyle.push(this.styles.clickable);
                } else {
                    this.pickupStyle.push(this.styles.inactive);
                }
                if(this.content.delivery) {
                    this.deliveryStyle.push(this.styles.clickable);
                } else {
                    this.deliveryStyle.push(this.styles.inactive);
                }
            });
        this.updateTotals();
        if(!this.cart.items.length) this.cartEmpty = true;
        
        pickupService.getVisible()
            .then(pickups => {
                dateService.alphabetize(pickups);
                this.pickups = pickups;
            });
    };

    this.selectMethod = method => {
        if(method === 'pickup' && this.pickupStyle.indexOf(this.styles.clickable) !== -1) {
            this.showAddressForm = false;
            this.showPickupForm = true;
            this.orderType = 'pickup';
            
            const index = this.deliveryStyle.indexOf(this.styles.active);
            if(index !== -1) {
                this.deliveryStyle.splice(index, 1);
            }
            this.pickupStyle.push(this.styles.active);
        } else if(method === 'delivery' && this.deliveryStyle.indexOf(this.styles.clickable) !== -1) {
            this.showAddressForm = true;
            this.showPickupForm = false;
            this.orderType = 'delivery';

            const index = this.pickupStyle.indexOf(this.styles.active);
            if(index !== -1) {
                this.pickupStyle.splice(index, 1);
            }
            this.deliveryStyle.push(this.styles.active);
        } else {
            return;
        }
    };

    this.confirmPickup = () => {
        const startDate = new Date(this.pickup.start).getTime();
        const currentTime = Date.now();
        if(startDate > currentTime) {
            this.timeLimit = startDate;
        } else {
            this.timeLimit = currentTime + 1000 * 60 * 60 * 48; //48 hours from the current time;
        }
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
        if(this.orderType === 'delivery') {
            if(!this.checkAddress()) {
                this.invalidAddress = true;
                return;
            }
        }
        if(this.address.email === this.address.emailCheck && this.address.firstName && this.address.lastName) {
            this.showPayment = true;
            this.emailWarning = false;
            this.showAddressForm = false;
            this.showPickupForm = false;
            this.setOrderInfo();
        }
        else {
            this.emailWarning = true;
        }
    };

    this.setOrderInfo = () => {
        $scope.orderType = this.orderType;
        $scope.orderInfo = {
            name: this.address.firstName + ' ' + this.address.lastName,
            email: this.address.email,
            items: this.cart.items,
            total: this.total
        };
        if($scope.orderType === 'delivery') {
            $scope.orderInfo.address = {
                line_1: this.address.line1,
                line_2: this.address.line2,
                city: this.address.city,
                state: this.address.state,
                zip: this.address.zip
            };
        } 
        if($scope.orderType === 'pickup'){
            $scope.orderInfo.phone = this.phone;
            $scope.orderInfo.pickup = this.pickup._id;
            $scope.orderInfo.pickupDate = this.pickupDate;
        }
        $scope.resetCart = this.initializeCart;
    };


    $scope.stripeCallback = function(code, result) {

        if(result.error) {
            console.log('ERROR', result.error.message);
            $scope.invalidPayment = true;
            console.log($scope.invalidPayment);
        } else {
            //we need to put an order into our db and send the _id as the metadata to stripe
            if($scope.orderType === 'delivery') {
                console.log('calling service to make delivery order');
                paymentService.createOrder($scope.orderInfo)
                    .then(data => {
                        const orderId = data._id;
                        const paymentInfo = {
                            stripeToken: result.id,
                            chargeAmount: $scope.total,
                            description: orderId
                        };
                        paymentService.post(paymentInfo);
                        localStorage.removeItem('earth-house-cart'); //eslint-disable-line
                        $state.go('success');
                    });
            } else {
                console.log('calling service to make pickup orders', $scope.orderInfo);
                orderPickupService.create($scope.orderInfo)
                    .then(data => {
                        console.log(data);
                        const orderId = data._id;
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
        }
    };

}

