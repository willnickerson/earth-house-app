orderService.$inject = ['$http', 'apiUrl'];

export default function orderService($http, apiUrl) {
    return {
        getOrders(token) {
            return $http({
                method: 'GET',
                url: `${apiUrl}/orders`,
                headers: {
                    'Authorization': token
                }
            }).then(res => {
                console.log('In service', res.data);
                return res.data;
            });
        }
    };
}