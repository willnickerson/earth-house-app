import template from './about.html';
import styles from './about.scss';

export default {
    template,
    bindings: {
        articles: '<'
    },
    controller
};

function controller() {
    this.styles = styles;
    this.getHeaderHeight = function() {
        this.height = angular.element(document.querySelector('div.header-container'))[0].height; //eslint-disable-line
        this.headerHeight = {height: this.height + 'px'};
    };

    this.$onInit = () => {
        console.log(this);
        this.getHeaderHeight();
    };
}