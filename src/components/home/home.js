import template from './home.html';
import styles from './home.scss';

export default {
    template,
    bindings: {
        slides: '<',
        articles: '<'
    },
    controller
};


function controller() {
    this.styles = styles;
}


