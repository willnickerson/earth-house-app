import template from './header-content.html';
import styles from './header-content.scss';


export default {
    template,
    controller
};

function controller() {
    this.styles = styles;
}