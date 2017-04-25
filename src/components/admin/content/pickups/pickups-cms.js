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
    this.$onInit = () => {
        this.pickups = [];
        pickupService.getAll()
            .then(pickups => {
                //alphabetize
                pickups.forEach(pickup => {
                    const startDate = new Date(pickup.start).toDateString();
                    const endDate = new Date(pickup.end).toDateString();

                    pickup.start = startDate;
                    pickup.end = endDate;

                    this.pickups.push(pickup);
                });
            });
    };
}