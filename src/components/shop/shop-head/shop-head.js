import template from './shop-head.html';
import styles from './shop-head.scss';

export default {
    template,
    controller() {
        this.styles = styles;
    }
};