import template from './articles-cms.html';

export default({
    template,
    bindings: {
        token: '<'
    },
    controller
});

controller.$inject = ['articleService'];

function controller(articleService) {
    this.$onInit = () => {
        this.articles = [];
        articleService.getAll()
            .then(articles => {
                if(articles.length < 3) {
                    const template = {
                        title: 'template',
                        link: '#'
                    };

                    for(var i = 0; i < 3; i++) {
                        articleService.create(template, this.token)
                            .then(saved => this.articles.push(saved));
                    }
                } else {
                    this.articles = articles;
                }
            });
    };

    this.update = article => {
        articleService.update(article, this.token)
            .then(updated => console.log(updated));
    };
}