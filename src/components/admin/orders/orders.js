import template from './orders.html';

export default ({
    template,
    bindings: {
        token: '<'
    },
    controller
});

controller.$inject = ['orderService', '$state', 'orderPickupService', 'dateService'];

function controller(orderService, $state, orderPickupService, dateService) {
    this.days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    this.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    this.$onInit = () => {
        if(this.token) {
            this.getOrders();
            this.getPickups();
        }
        else $state.go('admin.login');
        this.type = 'delivery';
    };

    this.getOrders = () => {
        orderService.getOrders(this.token)
            .then(data => {
                this.orders = data;
            });
    };

    this.getPickups = () => {
        orderPickupService.getAll(this.token)
            .then(data => {
                data.sort((curr, next) => {
                    return new Date(curr.pickupDate) - new Date(next.pickupDate);
                });
                data.forEach(order => {
                    order.date = new Date(order.date).toDateString();
                    order.pickupDate = dateService.dateStringToObj(new Date(order.pickupDate).toDateString());
                    console.log(order.pickupDate);
                });
                this.pickups = data;
                console.log(this.pickups);
            });
    };

    this.removePickup = order => {
        const index = this.orders.indexOf(order);
        orderPickupService.deleteOrder(order._id, this.token)
            .then(data => {
                console.log(data);
                this.pickups.splice(index, 1);
            });
    };

    this.updatePickup = order => {
        const copy = {};
        Object.keys(order).forEach(key => {
            copy[key] = order[key];
        })
        copy.date = new Date(copy.date);
        copy.pickup = copy.pickup._id;
        copy.pickupDate = dateService.dateObjToString(copy.pickupDate);
        console.log('copy of the order', copy);
        orderPickupService.updateOrder(copy._id, copy, this.token)
            .then(updated => console.log(updated));
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
}