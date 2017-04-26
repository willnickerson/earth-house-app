import template from './pickups-cms.html';
import styles from './pickups-cms.scss';

export default({
    template,
    bindings: {
        token: '<'
    },
    controller
});

controller.$inject = ['pickupService'];

function controller(pickupService) {
    this.styles = styles;
    this.days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    this.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    this.$onInit = () => {
        this.pickups = [];
        this.hours = [];

        for(var i = 0; i < 24; i++) {
            this.hours.push(hourValuetoObj(i));
        }

        pickupService.getAll()
            .then(pickups => {
                //alphabetize

                pickups.forEach(pickup => {
                    const startDate = new Date(pickup.start).toDateString();
                    const endDate = new Date(pickup.end).toDateString();

                    pickup.start = dateStringToObj(startDate);
                    pickup.end = dateStringToObj(endDate);
                    pickup.startTime = hourValuetoObj(pickup.startTime);
                    pickup.endTime = hourValuetoObj(pickup.endTime);

                    this.pickups.push(pickup);
                });
            });
    };

    this.update = pickup => {
        let formatedPickup = {};

        Object.keys(pickup).forEach(key => {
            formatedPickup[key] = pickup[key];
        });

        formatedPickup.start = new Date(dateObjToString(pickup.start));
        formatedPickup.end = new Date(dateObjToString(pickup.end));
        formatedPickup.startTime = pickup.startTime.value;
        formatedPickup.endTime = pickup.endTime.value;

        pickupService.update(formatedPickup, this.token)
            .then(updated => console.log(updated));
    };
    this.add = () => {
        this.new.start = dateObjToString(this.new.start);
        this.new.end = dateObjToString(this.new.end);
        this.new.day = this.new.start.split(' ')[0];
        pickupService.create(this.new, this.token)
            .then(saved => {
                saved.start = new Date(saved.start).toDateString();
                saved.end = new Date(saved.end).toDateString();
                this.pickups.push(saved);
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

    const dateObjToString = date => {
        const dateString = new Date(`${date.month} ${date.date}, ${date.year}`).toDateString();
        return dateString;
    };

    const dateStringToObj = dateString => {
        const arr = dateString.split(' ');
        return {
            day: arr[0],
            month: arr[1],
            date: arr[2],
            year: arr [3]
        };
    };

    const hourValuetoObj = i => {
        let hour = {};
        if(i > 0 & i < 12) {
            hour = {
                time: i + ':00am',
                value: i
            };
        } else if(i === 12) {
            hour = {
                time: i  + ':00pm',
                value: i
            };
        } else if(i > 12) {
            hour = {
                time: i  - 12+ ':00pm',
                value: i
            };
        } else {
            hour = {
                time: '12:00am',
                value: i
            };
        }
        return hour;
    };
}