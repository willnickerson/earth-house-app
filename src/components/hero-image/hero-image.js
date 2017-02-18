import template from './hero-image.html';
import styles from './hero-image.scss';

export default {
    template,
    controller
};

function controller() {
    this.styles = styles;
    this.slides = [
        {
            name: 'img1',
            imgUrl: 'http://res.cloudinary.com/lejipni8p/image/upload/v1482867043/earth%20house/wood-spread-1_cda0uc.jpg'
        },
        {
            name: 'img2',
            imgUrl: 'http://res.cloudinary.com/lejipni8p/image/upload/v1487379385/IMG_7888.tiff_mkn1dh.jpg'
        },
        {
            name: 'img3',
            imgUrl: 'http://res.cloudinary.com/lejipni8p/image/upload/v1487379374/IMG_1125.tiff_dxfsmv.jpg'
        }
    ];

    this.currIndex = 0;

    this.setCurrIndex = function(index) {
        this.currIndex = index;
    };

    this.isCurrIndex = function(index) {
        return this.currIndex === index;
    };

    this.prevSlide = function() {
        console.log(this.currIndex);
        this.currIndex = (this.currIndex < this.slides.length - 1) ? ++this.currIndex : 0;
    };

    this.nextSlide = function() {
        this.currIndex = (this.currIndex > 0) ? --this.currIndex : this.slides.length -1;
        console.log(this.currIndex);
    };
}