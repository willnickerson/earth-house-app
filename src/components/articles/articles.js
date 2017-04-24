import template from './articles.html';
import styles from './articles.scss';

export default {
    template,
    bindings: {
        articles: '<'
    },
    controller
};

controller.$inject = ['$interval'];

function controller($interval) {
    this.styles = styles;

    this.loading = this.styles.done;

    $interval(() => {
        this.loading = this.styles.start;
    }, 4000);
}

