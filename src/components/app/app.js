import template from './app.html';

export default {
    template,
    controller() {
        this.$onInit = () => {
            const storedCart = localStorage.getItem('earth-house-cart'); //eslint-disable-line
            if(storedCart) {
                this.cart = JSON.parse(storedCart);
            } else {
                console.log('we didnt find anything');
                this.cart = {
                    totalItems: 0
                };
            }
            this.cart.updateTotalItems = function(quantity) {
                this.totalItems += quantity;
            };

            console.log('our cart', this.cart);
        };
    }
};