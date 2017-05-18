import template from './content.html';
import styles from './content.scss';

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

    this.styles = styles;
    
    this.contentToManage = 'slider';

    this.setCms = content => {
        this.contentToManage = content;
        console.log('content set to: ', this.contentToManage);
    };
}