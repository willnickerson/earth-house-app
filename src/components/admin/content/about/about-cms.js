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
                // articles.sort((curr, next) => {
                //     return curr.position - next.position;
                // });
                order(articles);
                this.aboutArticles = articles;
                console.log('in about cms', this.aboutArticles);
            });
    };

    const order = function(arr) {
        console.log(arr);
        arr.sort((curr, next) => curr.position - next.position);
    };

    this.updateArticle = article => {   
        aboutService.updateArticle(article, this.token)
            .then(updated => {
                const newPosition = updated.position;
                const currIndex = this.aboutArticles.indexOf(article);

                this.aboutArticles.splice(currIndex, 1);

                if(currIndex >= newPosition) {
                    this.aboutArticles.splice(newPosition, 0, article);
                    for(var i = 0; i < currIndex - newPosition; i++) {
                        this.aboutArticles[newPosition + 1 + i].position += 1;
                        aboutService.updateArticle(this.aboutArticles[newPosition + 1 + i], this.token);
                    }
                } else {
                    for(i = currIndex + 1; i <= newPosition; i++) {
                        this.aboutArticles[i].position += -1;
                        this.aboutArticles[i - 1] = this.aboutArticles[i];
                        aboutService.updateArticle(this.aboutArticles[i], this.token);
                    }
                    this.aboutArticles.splice(newPosition, 0, article);
                    order(this.aboutArticles);
                }
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