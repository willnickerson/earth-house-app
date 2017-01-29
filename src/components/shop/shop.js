import template from './shop.html';
import styles from './shop.scss';

export default {
    template,
    bindings: {
        juices: '<'
    },
    controller 
};

function controller() {
    this.styles = styles;
}

