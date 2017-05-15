import template from './contact-cms.html';

export default({
    template,
    bindings: {
        token: '<'
    },
    controller
});

controller.$inject = ['contactService'];
function controller(contactService) {
    this.$onInit = () => {
        console.log(this.token);
        contactService.getAll()
            .then(data => {
                if(!data.length) {
                    const contact = {
                        text: 'For any inquiries regarding deliveries, ordering online, or our farmers market schedule, feel free to send us an email or call. We look forward to hearing from you!',
                        phone: '(XXX)XXX-XXXX',
                        email: 'youremail@email.com',
                        facebook: '#',
                        instagram: '#',
                        twitter: '#',
                    };
                    contactService.create(contact, this.token)
                        .then(contact => {
                            this.contactInfo = contact;
                        });
                }
                else {
                    this.contactInfo = data[0];
                }
            });
    };
    this.update = () => {
        contactService.update(this.contactInfo, this.token);
    };
}