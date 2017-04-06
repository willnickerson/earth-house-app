orderService.$inject = ['$http', 'apiUrl'];

export default function orderService($http, apiUrl) {
    return {
        getOrders(token) {
            $http({
                method: 'GET',
                url: `${apiUrl}/orders`,
                headers: {
                    'Authorization': token
                }
            });
        }
    };
}