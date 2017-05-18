import template from './pickups-cms.html';
import styles from './pickups-cms.scss';

export default({
    template,
    bindings: {
        token: '<'
    },
    controller
});

controller.$inject = ['pickupService', 'dateService'];

function controller(pickupService, dateService) {
    this.styles = styles;
    this.days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    this.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    this.$onInit = () => {
        this.pickups = [];
        this.hours = [];

        for(var i = 0; i < 24; i++) {
            this.hours.push(dateService.hourValuetoObj(i));
        }

        pickupService.getAll()
            .then(pickups => {

                pickups.forEach(pickup => {
                    const startDate = new Date(pickup.start).toDateString();
                    const endDate = new Date(pickup.end).toDateString();

                    pickup.start = dateService.dateStringToObj(startDate);
                    pickup.end = dateService.dateStringToObj(endDate);
                    pickup.startTime = dateService.hourValuetoObj(pickup.startTime);
                    pickup.endTime = dateService.hourValuetoObj(pickup.endTime);

                    this.pickups.push(pickup);
                });
                dateService.alphabetize(this.pickups);
            });
    };

    this.update = pickup => {
        let formatedPickup = {};

        Object.keys(pickup).forEach(key => {
            formatedPickup[key] = pickup[key];
        });

        formatedPickup.start = new Date(`${pickup.start.month} ${pickup.start.date} ${pickup.start.year}`);
        formatedPickup.day = new Date(`${pickup.start.month} ${pickup.start.date} ${pickup.start.year}`).toDateString().split(' ')[0];
        formatedPickup.end = new Date(dateService.dateObjToString(pickup.end));
        formatedPickup.startTime = pickup.startTime.value;
        formatedPickup.endTime = pickup.endTime.value;

        console.log('in update function', formatedPickup);

        pickupService.update(formatedPickup, this.token)
            .then(() => pickupService.get);
    };
    this.add = () => {
        this.new.start = dateService.dateObjToString(this.new.start);
        this.new.end = dateService.dateObjToString(this.new.end);
        this.new.day = this.new.start.split(' ')[0];
        pickupService.create(this.new, this.token)
            .then(saved => {
                saved.start = new Date(saved.start).toDateString();
                saved.end = new Date(saved.end).toDateString();
                this.pickups.push(saved);
                dateService.alphabetize(this.pickups);
                this.new = {};
            });
    };

    this.delete = pickup => {
        const index = this.pickups.indexOf(pickup);
        pickupService.delete(pickup._id, this.token)
            .then(() => {
                this.pickups.splice(index, 1);
            });
    };
}