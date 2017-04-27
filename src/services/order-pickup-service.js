orderPickupService.$inject = ['$http', 'apiUrl'];

export default function orderPickupService($http, apiUrl) {
    return {
        getOrders(token) {
            return $http({
                method: 'GET',
                url: `${apiUrl}/orders`,
                headers: {
                    'Authorization': token
                }
            }).then(res => {
                return res.data;
            });
        },
        //TODO on server side restructure routes so that we have an /orders/delivery and /orders/pickup
        create(order, token) {
            return $http({
                method: 'POST',
                url: `${apiUrl}/orders-pickup`,
                headers: {
                    'Authorization': token
                },
                data: order
            }).then(res => res.data);
        },
        deleteOrder(id, token) {
            return $http({
                method: 'DELETE',
                url: `${apiUrl}/orders/${id}`,
                headers: {
                    'Authorization': token
                }
            }).then(res => res.data);
        },
        updateOrder(id, order, token) {
            return $http({
                method: 'PUT',
                url: `${apiUrl}/orders/${id}`,
                headers: {
                    'Authorization': token
                },
                data: order
            }).then(res => res.data);
        }
    };
}