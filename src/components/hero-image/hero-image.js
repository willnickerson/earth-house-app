import template from './hero-image.html';

export default {
    template,
    controller
};

function controller() {
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
}