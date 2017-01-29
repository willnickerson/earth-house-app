import template from './item.html';
import styles from './item.scss';

export default {
    template,
    bindings: {
        item: '<'
    },
    controller() {
        this.styles = styles;
    }
};