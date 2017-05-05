import template from './contact.html';
import styles from './contact.scss';

export default {
    template,
    controller
};

controller.$inject = ['contactService'];

function controller(contactService) {
    this.styles = styles;
    this.$onInit = () => {
        contactService.getAll()
            .then(data => {
                if(!data.length) {
                    this.contactInfo = {
                        text: 'For any inquiries regarding deliveries, ordering online, or our farmers market schedule, feel free to send us an email or call. We look forward to hearing from you!',
                        phone: '(XXX)XXX-XXXX',
                        email: 'youremail@email.com',
                        facebook: '#',
                        instagram: '#',
                        twitter: '#',
                    };
                } else {
                    this.contactInfo = data[0];
                }
            });
    };
}