import template from './mail.html';

export default({
    template,
    bindings: {
        token: '<'
    },
    controller
});

controller.$inject = ['$state', 'mailService'];

function controller($state, mailService) {
    this.$onInit = () => {
        if(this.token) {
            mailService.getAll()
                .then(data => {
                    this.mailList = data;
                });
        } else {
            $state.go('admin.login');
        }
    };
}