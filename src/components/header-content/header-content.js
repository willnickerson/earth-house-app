import template from './header-content.html';
import styles from './header-content.scss';


export default {
    template,
    bindings: {
        cart: '<'
    },
    controller
};

function controller() {
    this.styles = styles;
    console.log(this.cart);
}