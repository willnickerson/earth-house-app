import template from './app.html';

export default {
    template,
    controller
};
function controller() {
    this.$onInit = () => {
        this.hasSeenLanding = false;
        this.cart.initializeCart();
    };

    this.cart = {
        storeCart() {
            const cartString = JSON.stringify(this.items);
            localStorage.setItem('earth-house-cart', cartString); //eslint-disable-line
        },
        updateTotalItems() {
            this.totalItems = 0;
            this.items.forEach(item => {
                this.totalItems += item.quantity;
            });
        },
        initializeCart() {
            const storedItems = JSON.parse(localStorage.getItem('earth-house-cart')); //eslint-disable-line
            if(storedItems) {
                this.items = storedItems;
                this.updateTotalItems();
            } else {
                this.items = [];
                this.totalItems = 0;
            }    
        }
    };
}