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
        this.calcNewTotal(update);
        console.log('update function called', update);
        orderService.updateOrder(update._id, update, this.token)
            .then(data => {
                console.log(data);
                this.setOrderToUpdate(null);
            });
    };

    this.setOrderToUpdate = order => {
        this.orderToUpdate = order;
    };

    this.calcNewTotal = order => {
        order.total = 0;
        order.items.forEach(item => {
            item.subTotal = item.quantity * item.price;
            order.total += item.subTotal;
        });
    };
    this.addItem = newItem => {
        this.orderToUpdate.items.push(newItem);
        newItem = {};
        console.log(this.orderToUpdate.items);
    };

    //TODO: ADD email and notes section to each order as well as in model on the server side!
}