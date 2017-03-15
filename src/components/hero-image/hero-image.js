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
            name: 'img3',
            imgUrl: 'http://res.cloudinary.com/lejipni8p/image/upload/v1488324567/IMG_1125.tiff_mt0jkc.jpg',
            text: 'Tranquil Fennel',
            // text: 'Sit voluptatem accusantium doloremque laudantium, totam rem aperiam <a ui-sref="shop">Check out our online store</a>'
        },
        {
            name: 'img1',
            imgUrl: 'http://res.cloudinary.com/lejipni8p/image/upload/c_crop,g_south_west,h_2603,w_3800/v1488324606/sumpreme-green-centered_wp639t.jpg',
            // text: 'Sed ut perspiciatis omnis iste natus error sit voluptatem accusantium doloremque laudantium. <a href="https://www.instagram.com">follow us on instagram!</a>'
            text: 'Supreme Green'
        },
        {
            name: 'img2',
            imgUrl: 'http://res.cloudinary.com/lejipni8p/image/upload/v1488324567/IMG_1125.tiff_mt0jkc.jpg',
            // text: 'Sed sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium. <a>Read about our juices</a>'
            text: 'Pear-adise'
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