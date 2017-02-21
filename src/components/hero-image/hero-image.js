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
            imgUrl: 'http://res.cloudinary.com/lejipni8p/image/upload/v1482867043/earth%20house/wood-spread-1_cda0uc.jpg',
            text: 'Sed ut perspiciatis omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo. <span>follow us on instagram!</span>'
        },
        {
            name: 'img2',
            imgUrl: 'http://res.cloudinary.com/lejipni8p/image/upload/v1487379385/IMG_7888.tiff_mkn1dh.jpg',
            text: 'Sed sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo.'
        },
        {
            name: 'img3',
            imgUrl: 'http://res.cloudinary.com/lejipni8p/image/upload/v1487379374/IMG_1125.tiff_dxfsmv.jpg',
            text: 'Sed sed sedut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo.'
        }
    ];

    this.currIndex = 0;
    this.currText = this.slides[0].text;    
    
    this.setCurrText = function() {
        this.currText = this.slides[this.currIndex].text;
    };

    this.setCurrIndex = function(index) {
        this.currIndex = index;
        this.setCurrText();
    };


    this.isCurrIndex = function(index) {
        return this.currIndex === index;
    };

    this.nextSlide = function() {
        this.currIndex = (this.currIndex < this.slides.length - 1) ? ++this.currIndex : 0;
        this.setCurrText();
    };

    this.prevSlide = function() {
        this.currIndex = (this.currIndex > 0) ? --this.currIndex : this.slides.length -1;
        this.setCurrText();
    };
}