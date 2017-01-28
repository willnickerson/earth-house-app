routes.$inject = ['$stateProvider', '$urlRouterProvider'];

export default function routes($stateProvider, $urlRouterProvider) {
    $stateProvider.state({
        name: 'landing',
        url:'/',
        component: 'landing'
    });
    $stateProvider.state({
        name: 'home',
        url: '/home',
        component: 'home'
    });

    $stateProvider.state({
        name: 'shop',
        url: '/shop',
        resolve: {
            juices: ['juiceService', juiceService => {
                return juiceService.getAll();
            }]
        },
        component: 'buy'
    });

    $stateProvider.state({
        name: 'item',
        url: '/item/:id',
        resolve: {
            item: ['juiceService', '$transition$', (juiceService, t) => {
                return juiceService.get(t.params().id);
            }],
        },
        component: 'item'
    });

    $urlRouterProvider.otherwise('/home');
}