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
        abstract: true,
        default: '.all',
        url: '/shop',
        resolve: {
            juices: ['juiceService', juiceService => {
                return juiceService.getAll();
            }]
        },
        component: 'shop'
    });

    $stateProvider.state({
        name: 'shop.all',
        url: '/all',
        views: {
            main: {
                component: 'all'
            }
        }
    });

    $stateProvider.state({
        name: 'shop.item',
        url: '/item/:id',
        resolve: {
            item: ['juiceService', '$transition$', (juiceService, t) => {
                return juiceService.get(t.params().id);
            }],
        },
        views: {
            main: {
                component: 'item'
            }
        }
    });

    $urlRouterProvider.otherwise('/home');
}