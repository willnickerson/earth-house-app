import template from './admin.html';
import styles from './admin.scss';
export default({
    template,
    controller
});

controller.$inject = ['authService', '$state'];

function controller(authService, $state) {
    this.styles = styles;
    //delete this eventually
    this.$onInit = () => {
        // this.credentials = {
        //     username: 'test',
        //     password: '123'
        // };

        // this.signin();
    };
    this.signin = () => {
        authService.signin(this.credentials)
            .then(data => {
                this.token = data.token;
                $state.go('admin.content');
            });
    };
    this.logOut = () => {
        this.credentials = {};
        delete this.token;
    };
    //TODO: ADD email and notes section to each order as well as in model on the server side!
}