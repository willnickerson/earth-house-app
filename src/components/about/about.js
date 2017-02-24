import template from './about.html';
import styles from './about.scss';

export default {
    template,
    controller() {
        this.styles = styles;
    }
};