import template from './all.html';

export default {
    template,
    bindings: {
        juices: '<',
        gotoItems: '<'
    },
    controller
};

function controller() {
    this.selectArray = [];

    for(var i = 0; i < 10; i++) {
        this.selectArray.push(i + 1);
    }

    this.quantity = 0;

    this.addToCart = function(quantity) {
        console.log('add to cart', quantity);
    };
}