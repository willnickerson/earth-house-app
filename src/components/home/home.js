import template from './home.html';

export default {
    template,
    bindings: {
        slides: '<'
    },
    controller
};

function controller() {
    this.$onInit = () => {
        console.log(this);
    };
}

