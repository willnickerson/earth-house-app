import template from './header-content.html';
import styles from './header-content.scss';


export default {
    template,
    bindings: {
        cart: '<'
    },
    controller
};



function controller() {
    this.nav = false;
    this.styles = styles;
    this.toggleNav = () => {
        if(this.nav) {
            this.nav = false;
        } else {
            this.nav = true;
        }
    };
}