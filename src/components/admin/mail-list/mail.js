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
            mailService.getAll(this.token)
                .then(data => {
                    data.sort((curr, next) => {
                        const currName = curr.email.toUpperCase();
                        const nextName = next.email.toUpperCase();

                        if(currName < nextName) {
                            return -1;
                        }
                        if(currName > nextName) {
                            return 1;
                        }
                        return 0;
                    });
                    this.mailList = data;
                    createString();
                });
        } else {
            $state.go('admin.login');
        }
    };

    this.remove = email => {
        const index = this.mailList.indexOf(email);
        mailService.delete(email, this.token)
            .then(data => {
                console.log('deleted', data);
                this.mailList.splice(index, 1);
                createString();
            });
    };

    const createString = () => {
        this.listString = '';
        this.mailList.forEach(email => {
            this.listString += `${email.email}, `;
        });
    };
}