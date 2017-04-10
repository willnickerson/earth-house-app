import template from './admin.html';
import styles from './admin.scss';
export default({
    template,
    controller
});

controller.$inject = ['authService', 'orderService'];

function controller(authService, orderService) {
    this.styles = styles;
    this.message = 'please login';

    this.signin = () => {
        authService.signin(this.credentials)
            .then(data => {
                this.token = data.token;
                this.getOrders();
            });
    };

    this.getOrders = () => {
        orderService.getOrders(this.token)
            .then(data => {
                this.orders = data;
                console.log(this.orders);
            });
    };

}