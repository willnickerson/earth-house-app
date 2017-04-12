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
            });
    };
    this.removeOrder = order => {
        const index = this.orders.indexOf(order);
        orderService.deleteOrder(order._id, this.token)
            .then(data => {
                console.log(data);
                this.orders.splice(index, 1);
            });
    };
    this.updateOrder = update => {
        console.log('update function called', update);
        orderService.updateOrder(update._id, update, this.token)
            .then(data => console.log(data));
    };

    this.setOrderToUpdate = order => {
        this.orderToUpdate = order;
        console.log(this.orderToUpdate);
    };
}