import template from './app.html';

export default {
    template,
    controller() {
        this.cart = {
            totalItems: 0
        };
    }
};