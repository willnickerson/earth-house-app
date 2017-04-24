import template from './content.html';

export default({
    template,
    bindings: {
        token: '<',
        aboutArticles: '<'
    },
    controller
});

controller.$inject = ['$state'];

function controller($state) {
    this.$onInit = () => {
        if(!this.token) $state.go('admin.login');
    };
    
    this.contentToManage = 'slider';

    this.setCms = content => {
        this.contentToManage = content;
    };
}