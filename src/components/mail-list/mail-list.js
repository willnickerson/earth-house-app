import template from './mail-list.html';
import styles from './mail-list.scss';

export default({
    template,
    controller
});

controller.$inject = ['mailService'];

function controller(mailService) {
    this.styles = styles;
    this.join = () => {
        const email = this.email;
        this.email = {};
        this.showMessage = true;
        mailService.create(email);
    };
}