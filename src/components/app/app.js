import template from './app.html';

export default {
    template,
    controller() {
        this.cart = {
            updateTotalItems(quantity) {
                this.totalItems += quantity;
                // Object.keys(this).forEach(key => {
                //     if(key !== 'updateTotalItems' && key !== 'totalItems') {
                //         console.log(key);
                //     }
                // });
            },
            totalItems: 0
        };
    }
};