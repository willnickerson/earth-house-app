import template from './item.html';
import styles from './item.scss';

export default {
    template,
    bindings: {
        item: '<',
        selectArray: '<',
        addToCart: '<',
        quantity: '='
    },
    controller
};

controller.$inject = ['$window'];

function controller($window) {
    this.styles = styles;

    if($window.innerWidth < 820) {
        this.heightValue = $window.innerWidth * .95 * .45 * 2 - 100;
    } else {
        this.heightValue = $window.innerWidth * .95 * .20 * 2 - 100;
    }

    this.listHeight = {height: this.heightValue + 'px'};
}