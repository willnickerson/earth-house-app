import template from './content.html';

export default({
    template,
    bindings: {
        token: '<',
        aboutArticles: '<'
    },
    controller
});

controller.$inject = ['$state'];

function controller($state) {
    this.$onInit = () => {
        if(!this.token) $state.go('admin.login');
    };
    //delete 
    this.token= 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU4ZTU2YTg0ZTMwNDI5MDdkODkyNzVkYyIsInVzZXJuYW1lIjoidGVzdCIsImlhdCI6MTQ5MjU2ODIwM30.Qb6NYuJGngCE-Y6jHQV9_4hW2gt2_ziWz7aO2Cpkff8';
    
    this.contentToManage = 'about';

    this.setCms = content => {
        this.contentToManage = content;
    };
}