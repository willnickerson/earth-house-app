import template from './content.html';

export default({
    template,
    bindings: {
        token: '<'
    },
    controller
});

function controller() {
    this.contentToManage = 'about';

    this.setCms = content => {
        console.log('set cms function called');
        this.contentToManage = content;
    };
}