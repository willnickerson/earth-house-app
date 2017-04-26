import template from './markets.html';
import styles from './markets.scss';

export default({
    template,
    controller
});

controller.$inject = ['pickupService', 'dateService'];
function controller(pickupService, dateService) {
    this.styles = styles;
    this.markets = [];
    this.$onInit = () => {
        pickupService.getVisible()
            .then(pickups => {
                pickups.forEach(market => {
                    if(market.isFarmersMarket) {
                        market.start = dateService.dateStringToObj(new Date(market.start).toDateString());
                        market.end = dateService.dateStringToObj(new Date(market.end).toDateString());
                        this.markets.push(market);
                    }
                });
                dateService.alphabetize(this.markets);
            });
    };
}