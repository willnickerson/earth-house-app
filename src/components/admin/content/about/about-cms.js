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
    this.positions = [0, 1, 2, 3, 4];
    this.$onInit = () => {
        this.getArticles();
    };

    this.getArticles = () => {
        aboutService.getAll()
            .then(articles => {
                articles.sort((curr, next) => {
                    return curr.position - next.position;
                });
                this.aboutArticles = articles;
                console.log('in about cms', this.aboutArticles);
            });
    };

    this.updateArticle = article => {   
        aboutService.updateArticle(article, this.token)
            .then(updated => {
                const newPosition = updated.position;
                const index = this.aboutArticles.indexOf(article);
                console.log(index);
                const otherArticles = this.aboutArticles.splice(index, 1);
                otherArticles.forEach(otherArticle => {
                    if(otherArticle.position === newPosition) {
                        const startIndex = otherArticles.indexOf(otherArticle);
                        for(var i = startIndex; i < otherArticles.length; i++) {
                            this.aboutArticles[i].position += 1;
                        }
                    }
                });
                this.getArticles();
            });
    };

    this.addArticle = newArticle => {
        newArticle.position = this.aboutArticles.length;
        aboutService.createArticle(newArticle, this.token)
            .then(saved => {
                console.log(saved);
                this.aboutArticles.push(saved);
                newArticle = {};
            });
    };

    this.deleteArticle = article => {
        const index = this.aboutArticles.indexOf(article);
        aboutService.deleteArticle(article, this.token)
            .then(() => {
                this.aboutArticles.splice(index, 1);
            });
    };
}