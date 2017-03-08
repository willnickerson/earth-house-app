import template from './checkout.html';
import styles from './checkout.scss';


export default {
    template,
    bindings: {
        cart: '='
    },
    controller
};

controller.$inject = ['paymentService'];

function controller(paymentService) {
    this.styles = styles;
    this.items = {};
    this.selectArray = [];
    this.maxQuant = 10;

    for(var i = 0; i <= this.maxQuant; i++) {
        this.selectArray.push(i);
    }

    this.$onInit = () => {
        this.getItems();
    };
    
    this.getItems = function() {
        this.total = 0;
        Object.keys(this.cart).forEach(key => {
            if(key !== 'totalItems' && key !== 'updateTotalItems' && key !== 'storeCart') {
                this.items[key] = this.cart[key];
                this.items[key].subTotal = this.items[key].price * this.items[key].quantity;
                this.total += this.items[key].subTotal;
            }
        });
    };

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

    this.checkout = () => {
        console.log('checkout function called');
        paymentService.post()
            .then(data => console.log('payment request made on front end, recieved:', data));
    };

    this.stripeCallback = (code, res) => {
        if(res.error) console.log('ERROR', res.error.message);
        else console.log('SUCCESS! token: ', res.id);
    };

    // this.doCheckout = token => {
    //     this.checkout();
    //     console.log('Got Stripe token: ' + token.id);
    // };
}

