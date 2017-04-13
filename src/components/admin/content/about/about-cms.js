import template from './about-cms.html';

export default({
    template,
    bindings: {
        aboutArticles: '<',
        token: '<'
    },
    controller
});

controller.$inject = ['aboutService'];

function controller(aboutService) {
    this.positions = [0, 1, 2, 3, 4, 5];
    this.$onInit = () => {
        aboutService.getAll()
            .then(articles => {
                this.aboutArticles = articles;
                console.log('in about cms', this);
            });
    };

    this.updateArticle = article => {
        console.log(this.token);    
        aboutService.updateArticle(article, this.token)
            .then(updated => {
                console.log(updated);
            });
    };
}