import template from './nav-bar.html';
import styles from './nav-bar.scss';

export default {
    template,
    controller
};

function controller() {
    this.styles = styles;
    this.navVisibility = this.styles.hide;
    
    this.toggleNav = function() {
        if(this.navVisibility === this.styles.hide) this.navVisibility = this.styles.show;
        else this.navVisibility = this.styles.hide;
    };
}

