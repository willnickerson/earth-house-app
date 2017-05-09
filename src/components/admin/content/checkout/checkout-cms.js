import template from './checkout-cms.html';

export default({
    template,
    bindings: {
        token: '<'
    },
    controller
});

controller.$inject = ['checkoutContentService'];

function controller(checkoutContentService) {
    this.$onInit = () => {
        checkoutContentService.getAll()
            .then(data => {
                if(!data.length) {
                    checkoutContentService.create({}, this.token)
                        .then(saved => {
                            this.checkoutContent = saved;
                            console.log('in if', this.checkoutContent);
                        });
                } else {
                    this.checkoutContent = data[0];
                    console.log('there is data', this.checkoutContent);
                }
            });
    };

    this.update = () => {
        checkoutContentService.update(this.checkoutContent, this.token)
            .then(updated => console.log('updated content to', updated));
    };
}