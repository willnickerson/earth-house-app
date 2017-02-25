import template from './nav-bar.html';
import styles from './nav-bar.scss';

export default {
    template,
    controller
};

function controller() {
    this.styles = styles;
    this.toggleNav = function() {
        console.log('click is working');
    };
}

