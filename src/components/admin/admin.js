import template from './admin.html';
import styles from './admin.scss';
export default({
    template,
    controller
});

controller.$inject = ['authService', '$state'];

function controller(authService, $state) {
    this.styles = styles;
    //delete this eventually
    this.$onInit = () => {
        this.credentials = {
            username: 'test',
            password: '123'
        };

        this.signin();
        this.ordersClass = [this.styles.active];
        this.contentClass = [];
        this.mailClass = [];
        this.navArray = [this.contentClass, this.ordersClass, this.mailClass];
    };
    this.signin = () => {
        authService.signin(this.credentials)
            .then(data => {
                this.token = data.token;
                $state.go('admin.orders');
            });
    };
    this.logOut = () => {
        this.credentials = {};
        delete this.token;
    };
    //TODO: ADD email and notes section to each order as well as in model on the server side!

    this.changeClass = (state) => {

        this.navArray.forEach(navItem => {
            console.log(navItem);
            navItem.pop();
        });

        if(state === 'orders') {
            this.ordersClass.push(this.styles.active);
        }
        if(state === 'content') {
            this.contentClass.push(this.styles.active);
        }
        if(state === 'mail') {
            this.mailClass.push(this.styles.active);
        }
    };
}