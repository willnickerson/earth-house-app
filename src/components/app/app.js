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
            this.cart.updateTotalItems = function() {
                this.totalItems = 0;
                Object.keys(this).forEach(key => {
                    if(key !== 'totalItems' && key !== 'updateTotalItems'&& key !== 'storeCart') {
                        this.totalItems += this[key].quantity;
                    }
                });
            };

            this.cart.storeCart = function() {
                const cartString = JSON.stringify(this);
                localStorage.setItem('earth-house-cart', cartString); //eslint-disable-line
            };
        };
    }
};