import template from './hero-image.html';
import styles from './hero-image.scss';


export default {
    template,
    bindings: {
        slides: '<'
    },
    controller
};

controller.$inject = ['$window', '$interval'];

function controller($window, $interval) {
    this.$onInit = () => {
        console.log('in on init: ', this);
        if(this.slides.length < 3) {
            console.log('in if');
            this.slides = [
                //hard coded slides if not enough slides in DB
                {
                    name: 'img3',
                    imgUrl: 'http://res.cloudinary.com/lejipni8p/image/upload/v1488324567/IMG_1125.tiff_mt0jkc.jpg',
                    text: 'Tranquil Fennel',
                    link: 'https://earth-house.herokuapp.com/#!/shop/item/58c8606ebcc7260011e09169'
                },
                {
                    name: 'img1',
                    imgUrl: 'http://res.cloudinary.com/lejipni8p/image/upload/c_crop,g_south_west,h_2603,w_3800/v1488324606/sumpreme-green-centered_wp639t.jpg',
                    text: 'Supreme Green',
                    link: 'https://earth-house.herokuapp.com/#!/shop/item/58c860aabcc7260011e0916a'
                },
                {
                    name: 'img2',
                    imgUrl: 'http://res.cloudinary.com/lejipni8p/image/upload/v1488324567/IMG_1125.tiff_mt0jkc.jpg',
                    text: 'Pear-adise',
                    link: 'https://earth-house.herokuapp.com/#!/shop/item/58c85e66f36d287eb5cb74ef'
                }
            ];
        }
        console.log('slides: ', this.slides);
        this.currIndex = 0;
        this.currText = this.slides[0].text;    
    };
    this.styles = styles;

    
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
    }, 5000);

}