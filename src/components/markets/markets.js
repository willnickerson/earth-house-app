import template from './markets.html';
import styles from './markets.scss';

export default({
    template,
    controller
});

controller.$inject = ['pickupService'];
function controller(pickupService) {
    this.styles = styles;

    this.$onInit = () => {
        pickupService.getVisible()
            .then(pickups => {
                this.markets = pickups;
            });
    };
}