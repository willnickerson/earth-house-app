import template from './orders.html';

export default ({
    template,
    bindings: {
        token: '<'
    },
    controller
});

controller.$inject = ['orderService', '$state', 'orderPickupService', 'dateService', 'pickupService', '$window'];

function controller(orderService, $state, orderPickupService, dateService, pickupService, $window) {
    this.days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    this.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    this.$onInit = () => {  
        if(this.token) {
            this.getOrders();
            this.getPickups();

            pickupService.getAll()
                .then(data => {
                    this.pickupLocations = data;
                    const all = {_id: 'all', name: 'all'};
                    this.pickupLocations.push(all);
                    this.filterLocation = all;
                });
        }
        else $state.go('admin.login');
        this.type = 'pickup';
    };

    this.getOrders = () => {
        orderService.getOrders(this.token)
            .then(data => {
                this.orders = data;
            });
    };

    this.logChange = () => {
        console.log(this.filterLocation);
    };

    this.set = type => {
        this.type = type;
    };

    this.getPickups = () => {
        orderPickupService.getAll(this.token)
            .then(data => {
                data.sort((curr, next) => {
                    return new Date(curr.pickupDate) - new Date(next.pickupDate);
                });
                data.forEach(order => {
                    order.unsavedCompleted = order.completed;
                    order.date = new Date(order.date).toDateString();
                    order.pickupDate = dateService.dateStringToObj(new Date(order.pickupDate).toDateString());
                    console.log(order.pickupDate);
                });
                this.pickups = data;
                console.log('pickups', this.pickups);
            });
    };

    this.removePickup = order => {
        const prompt = $window.prompt('Are you sure you want to delete this order? Once it is deleted, it is gone forever! (y/n)');
        if(prompt === 'y') {
            const index = this.orders.indexOf(order);
            orderPickupService.deleteOrder(order._id, this.token)
                .then(() => {
                    this.pickups.splice(index, 1);
                });
        } else {
            return;
        }
    };

    this.updatePickup = order => {
        const copy = {};
        order.completed = order.unsavedCompleted;

        Object.keys(order).forEach(key => {
            copy[key] = order[key];
        });

        delete copy.unsavedCompleted;
        copy.date = new Date(copy.date);
        copy.pickup = copy.pickup._id;
        copy.pickupDate = dateService.dateObjToString(copy.pickupDate);
        orderPickupService.updateOrder(copy._id, copy, this.token)
            .then(updated => console.log(updated));
    };

    this.removeOrder = order => {
        $window.alert('Are you sure you want to delete this order?');
        const index = this.orders.indexOf(order);
        orderService.deleteOrder(order._id, this.token)
            .then(() => {
                this.orders.splice(index, 1);
            });
    };
    this.updateOrder = update => {
        this.calcNewTotal(update);
        orderService.updateOrder(update._id, update, this.token)
            .then(() => {
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
    };
}