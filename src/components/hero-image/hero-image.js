import template from './hero-image.html';
import styles from './hero-image.scss';


export default {
    template,
    controller
};

controller.$inject = ['$window', '$interval'];

function controller($window, $interval) {
    this.styles = styles;
    this.slides = [
        {
            name: 'img1',
            imgUrl: 'http://res.cloudinary.com/lejipni8p/image/upload/v1482867043/earth%20house/wood-spread-1_cda0uc.jpg',
            text: 'Sed ut perspiciatis omnis iste natus error sit voluptatem accusantium doloremque laudantium. <a>follow us on instagram!</a>'
        },
        {
            name: 'img2',
            imgUrl: 'http://res.cloudinary.com/lejipni8p/image/upload/v1487379385/IMG_7888.tiff_mkn1dh.jpg',
            text: 'Sed sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium. <a>Read about our juices</a>'
        },
        {
            name: 'img3',
            imgUrl: 'http://res.cloudinary.com/lejipni8p/image/upload/v1487379374/IMG_1125.tiff_dxfsmv.jpg',
            text: 'Sed sed sedut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam <a>Check out our online store</a>'
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
        console.log('next slide called ')
        this.currIndex = (this.currIndex < this.slides.length - 1) ? ++this.currIndex : 0;
        this.setCurrText();
    };

    this.prevSlide = function() {
        this.currIndex = (this.currIndex > 0) ? --this.currIndex : this.slides.length -1;
        this.setCurrText();
    };

    $interval(() => {
        console.log('slide should change');
        this.nextSlide();
    }, 4000);

    //TODO: figure out some sort of way to adjust slider height based off of image height, we might have to use jQuery :/

    // this.sliderHeight = {'height': ($window.innerHeight - 50) + 'px'};

    // const image = $document.getElementsByClassName('.slide-image')[0]; //eslint-disable-line

    // const images = $document.getElementsByClassName('slide-image');
    // console.log('here', $document[0].querySelectorAll('.slide-image'));

    // angular.element(document.getElementsByClassName('slide-image')[0]).bind('resize', function () {
    //     // this.sliderHeight = {'height': ($window.innerHeight - 50) + 'px'};
    //     console.log('Height', this.imageHeight);
    // });

    // angular.element($window).bind('resize', function () {
    //     this.sliderHeight = {'height': ($window.innerHeight - 50) + 'px'};
    //     console.log('Height', this.sliderHeight);
    // });
    // const slideImgs =  document.getElementsByClassName('slide-image'); //eslint-disable-line
    
    // const wrappedImgs = angular.element(slideImgs);
    // var imgs = angular.element(document.querySelector('.slide-image'));

    // console.log(imgs);

}