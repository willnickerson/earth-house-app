import template from './checkout.html';
import styles from './checkout.scss';

export default {
    template,
    bindings: {
        cart: '='
    },
    controller
};

function controller() {
    this.styles = styles;
    this.items = {};
    this.selectArray = [1,2,3,4,5,6,7,8,9,10];

    

    this.$onInit = () => {

        Object.keys(this.cart).forEach(key => {
            if(key !== 'totalItems' && key !== 'updateTotalItems') {
                this.items[key] = this.cart[key];
            }
        });
    };
}

