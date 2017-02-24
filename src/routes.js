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
            ingredients: ['item', item => item.ingredients]
        },
        views: {
            main: {
                component: 'item'
            }
        }
    });

    $stateProvider.state({
        name: 'about',
        url: '/about',
        component: 'about'
    });

    $stateProvider.state({
        name: 'contact',
        url: '/contact',
        component: 'contact'
    });

    $urlRouterProvider.otherwise('/home');
}