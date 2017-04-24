import template from './articles-cms.html';

export default({
    template,
    bindings: {
        token: '<'
    },
    controller
});

function controller() {
    this.$onInit = () => {
        console.log(this.token);
    };
}