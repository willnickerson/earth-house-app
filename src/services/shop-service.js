shopService.$inject = ['$http', 'apiUrl'];

export default function shopService($http, apiUrl) {
    return {
        getAll() {
            return $http.get(`${apiUrl}/shop`)
                .then(res => res.data);
        },
        create(shop, token) {
            return $http({
                method: 'POST',
                url: `${apiUrl}/shop`,
                headers: {
                    'Authorization': token
                },
                data: shop
            }).then(res => res.data);
        },
        update(shop, token) {
            return $http({
                method: 'PUT',
                url: `${apiUrl}/shop/${shop._id}`,
                headers: {
                    'Authorization': token
                },
                data: shop
            }).then(res => res.data);
        }
    };
}