import template from './image-slider-cms.html';

export default({
    template,
    bindings: {
        token: '<'
    },
    controller
});

controller.$inject = ['slideService'];

function controller(slideService) {
    this.$onInit = () => {
        slideService.getAll()
            .then(slides => {
                this.slides = slides;
            });
    };

    this.addSlide = () => {
        slideService.create(this.newSlide, this.token)
            .then(slide => {
                this.slides.push(slide);
                this.newSlide = {};
            });
    };

    this.update = slide => {
        slideService.update(slide, slide._id, this.token)
            .then(updated => {
                console.log(updated);
            });
    };

    this.delete = (slide) => {
        const index = this.slides.indexOf(slide);
        this.slides.splice(index, 1);
        slideService(slide._id, this.token)
            .then(deleted => {
                console.log(deleted);
            });
    };
}

