import template from './all.html';

export default {
    template,
    bindings: {
        juices: '<',
        gotoItems: '<',
        selectArray: '<',
        addToCart: '<',
        cart: '='
    },
    controller
};

function controller() {
    console.log(this);
}