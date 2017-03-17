import template from './success.html';
import styles from './success.scss';

export default {
    template,
    bindings: {
        cart: '<'
    },
    controller
};

function controller() {
    this.styles = styles;
    this.$onInit = () => {
        this.cart.initializeCart();
    };
}