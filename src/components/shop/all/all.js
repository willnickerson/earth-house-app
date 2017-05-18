import template from './all.html';

export default {
    template,
    bindings: {
        juices: '<',
        goToItems: '<',
        selectArray: '<',
        addToCart: '<',
        cart: '='
    },
    controller
};

function controller() {
    this.$onInit = () => {
        console.log('from all component', this);
    };
}
