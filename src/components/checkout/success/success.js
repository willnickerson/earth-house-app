import template from './success.html';

export default {
    template,
    bindings: {
        cart: '<'
    },
    controller
};

function controller() {
    this.$onInit = () => {
        this.cart.initializeCart();
    };
}