import template from './admin.html';
import styles from './admin.scss';
export default({
    template,
    controller
});

controller.$inject = ['authService', '$state'];

function controller(authService, $state) {
    this.styles = styles;
    this.signin = () => {
        authService.signin(this.credentials)
            .then(data => {
                this.token = data.token;
                $state.go('admin.orders');
            });
    };
    //TODO: ADD email and notes section to each order as well as in model on the server side!
}