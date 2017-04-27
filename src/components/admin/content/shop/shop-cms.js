import template from './shop-cms.html';

export default({
    template,
    bindings: {
        token: '<'
    },
    controller
});

controller.$inject = ['juiceService','ingredientService', 'dateService'];

function controller(juiceService, ingredientService, dateService) {
    this.$onInit = () => {
        this.juices = [];
        ingredientService.getAll()
            .then(ingredients => {
                dateService.alphabetize(ingredients);
                this.ingredients = ingredients;
            });
        juiceService.getAll()
            .then(juices => {
                juices.forEach(juice => {
                    juiceService.get(juice._id)
                        .then(juice => {
                            this.juices.push(juice);
                            dateService.alphabetize(this.juices);
                        });
                });
            });
    };



    this.updateJuice = juice => {
        console.log('update juice: ', juice);
    };

    this.createJuice = () => {
        juiceService.create(this.newJuice, this.token)
            .then(saved => {
                this.juices.push(saved);
                this.newJuice = {};
            });
    };

    this.removeIngredient = (juice, ingredient) => {
        const index = juice.ingredients.indexOf(ingredient);
        juice.ingredients.splice(index, 1);
        juiceService.update(juice, juice._id, this.token);
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

    this.deleteJuice = juice => {
        juiceService.delete(juice._id, this.token)
            .then(deleted => {
                const index = this.juices.indexOf(juice);
                this.juices.splice(index, 1);
                console.log('has been deleted', deleted);
            });
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
                dateService.alphabetize(this.ingredients);
            });
    };
}