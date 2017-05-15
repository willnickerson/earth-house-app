checkoutContentService.$inject = ['$http', 'apiUrl'];

export default function checkoutContentService($http, apiUrl) {
    return {
        getAll() {
            return $http.get(`${apiUrl}/checkout`)
                .then(res => res.data);
        },
        create(checkout, token) {
            return $http({
                method: 'POST',
                url: `${apiUrl}/checkout`,
                headers: {
                    'Authorization': token
                },
                data: checkout
            }).then(res => res.data);
        },
        update(checkout, token) {
            return $http({
                method: 'PUT',
                url: `${apiUrl}/checkout/${checkout._id}`,
                headers: {
                    'Authorization': token
                },
                data: checkout
            }).then(res => res.data);
        }
    };
}