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
    this.$onInit = () => {
        this.getArticles();
    };

    this.getArticles = () => {
        aboutService.getAll()
            .then(articles => {
                order(articles);
                this.aboutArticles = articles;
                this.getPositions();
            });
    };

    this.getPositions = () => {
        this.positions = [];
        for(var i = 0; i < this.aboutArticles.length; i++) {
            console.log('in for loop');
            this.positions.push(i);
        }
    };

    const order = function(arr) {
        arr.sort((curr, next) => curr.position - next.position);
    };

    this.updateArticle = article => {   
        aboutService.updateArticle(article, this.token)
            .then(updated => {
                const newPosition = updated.position;
                const currIndex = this.aboutArticles.indexOf(article);
                
                this.aboutArticles.splice(currIndex, 1);
                this.aboutArticles.splice(newPosition, 0, updated);

                if(currIndex >= newPosition) {
                    for(var i = newPosition + 1; i <= currIndex; i++) {
                        this.aboutArticles[i].position += 1;
                        aboutService.updateArticle(this.aboutArticles[i], this.token);
                    }
                } else if (newPosition > currIndex) {
                    for( i = currIndex; i < newPosition; i++) {
                        this.aboutArticles[i].position += -1;
                        aboutService.updateArticle(this.aboutArticles[i], this.token);
                    }
                }
            });
    };

    this.addArticle = () => {
        this.newArticle.position = this.aboutArticles.length;
        aboutService.createArticle(this.newArticle, this.token)
            .then(saved => {
                console.log(saved);
                this.aboutArticles.push(saved);
                this.newArticle = {};
                this.getPositions();
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