import template from './shop-cms.html';

export default({
    template,
    bindings: {
        token: '<'
    },
    controller
});

controller.$inject = ['ingredientService'];

function controller(ingredientService) {
    this.$onInit = () => {
        ingredientService.getAll()
            .then(ingredients => {
                // ingredients.sort((curr, next) => {
                //     const currName = curr.name.toUpperCase();
                //     const nextName = next.name.toUpperCase();

                //     if(currName < nextName) {
                //         return -1;
                //     }
                //     if(currName > nextName) {
                //         return 1;
                //     }
                //     return 0;
                // });
                alphabetize(ingredients);
                this.ingredients = ingredients;
            });
    };

    const alphabetize = arr => {
        arr.sort((curr, next) => {
            const currName = curr.name.toUpperCase();
            const nextName = next.name.toUpperCase();

            if(currName < nextName) {
                return -1;
            }
            if(currName > nextName) {
                return 1;
            }
            return 0;
        });
    };

    this.delete = ingredient => {
        ingredientService.delete(ingredient._id, this.token);
        this.ingredients.splice(this.ingredients.indexOf(ingredient), 1);
    };

    this.update = ingredient => {
        ingredientService.update(ingredient, ingredient._id, this.token)
            .then(updated => console.log(updated));
    };

    this.add = ingredient => {
        ingredientService.create(ingredient, this.token)
            .then(saved => {
                ingredient = {};
                this.ingredients.push(saved);
                alphabetize(this.ingredients);
            });
    };
}