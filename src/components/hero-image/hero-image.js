import template from './hero-image.html';
import styles from './hero-image.scss';


export default {
    template,
    controller
};

controller.$inject = ['$window', '$interval'];

function controller($window, $interval) {
    this.styles = styles;
    // this.progress = this.styles.start;
    // this.progress = this.styles.finish;
    this.slides = [
        {
            name: 'img1',
            imgUrl: 'http://res.cloudinary.com/lejipni8p/image/upload/c_crop,g_south,h_2100,w_3750/v1487806715/platter-cropped_ntr56a.jpg',
            // text: 'Sed ut perspiciatis omnis iste natus error sit voluptatem accusantium doloremque laudantium. <a href="https://www.instagram.com">follow us on instagram!</a>'
            text: '<a>Supreme Green</a>'
        },
        {
            name: 'img2',
            imgUrl: 'http://res.cloudinary.com/lejipni8p/image/upload/c_crop,g_south,h_2285,w_4024/v1487807738/platter3-cropped_urspmq.jpg',
            // text: 'Sed sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium. <a>Read about our juices</a>'
            text: '<a>Pear-adise</a>'
        },
        {
            name: 'img3',
            imgUrl: 'http://res.cloudinary.com/lejipni8p/image/upload/c_crop,g_south,w_3750/v1487807406/platter2-cropped_t3v2cx.jpg',
            text: '<a>Tranquil Fennel</a>'
            // text: 'Sit voluptatem accusantium doloremque laudantium, totam rem aperiam <a ui-sref="shop">Check out our online store</a>'
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
        // this.progress = this.styles.finish;
        // console.log(this.progress);
        this.currIndex = (this.currIndex < this.slides.length - 1) ? ++this.currIndex : 0;
        this.setCurrText();
    };

    this.prevSlide = function() {
        this.currIndex = (this.currIndex > 0) ? --this.currIndex : this.slides.length -1;
        this.setCurrText();
    };

    $interval(() => {
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