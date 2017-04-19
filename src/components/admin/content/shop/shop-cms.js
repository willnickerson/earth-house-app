import template from './shop-cms.html';

export default({
    template,
    bindings: {
        token: '<'
    },
    controller
});

controller.$inject = ['juiceService','ingredientService'];

function controller(juiceService, ingredientService) {
    this.$onInit = () => {
        this.juices = [];
        ingredientService.getAll()
            .then(ingredients => {
                alphabetize(ingredients);
                this.ingredients = ingredients;
            });
        juiceService.getAll()
            .then(juices => {
                juices.forEach(juice => {
                    juiceService.get(juice._id)
                        .then(juice => {
                            this.juices.push(juice);
                            alphabetize(this.juices);
                        });
                });
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

    this.updateJuice = juice => {
        console.log('update juice: ', juice);
    };

    this.addIngredient = (juice, newIngredient) => {
        let hasIngredient = false;
        juice.ingredients.forEach(ingredient => {
            if(ingredient.name === newIngredient.name) hasIngredient = true;   
        });
        if(!hasIngredient) {
            juice.ingredients.push(newIngredient);
            juiceService.update(juice, juice._id, this.token);
        } else {
            console.log('already has ingredient', newIngredient.name);
        }
    };

    this.deleteIngredient = ingredient => {
        ingredientService.delete(ingredient._id, this.token);
        this.ingredients.splice(this.ingredients.indexOf(ingredient), 1);
    };

    this.updateIngredient = ingredient => {
        ingredientService.update(ingredient, ingredient._id, this.token)
            .then(updated => console.log(updated));
    };

    this.createIngredient = () => {
        ingredientService.create(this.newIngredient, this.token)
            .then(saved => {
                this.newIngredient = {};
                this.ingredients.push(saved);
                alphabetize(this.ingredients);
            });
    };
}