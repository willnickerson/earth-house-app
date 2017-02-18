import template from './shop.html';
import styles from './shop.scss';

export default {
    template,
    bindings: {
        juices: '<'
    },
    controller 
};

controller.$inject = ['$scope', '$document'];

function controller($scope, $document) {
    this.styles = styles;

    const items = angular.element(document.getElementById('items')); //eslint-disable-line
    this.gotoItems = function() {
        console.log('angular scroll function called');
        $document.scrollToElement(items, 0, 600);
    };
}

