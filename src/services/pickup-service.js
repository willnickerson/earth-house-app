pickupService.$inject = ['$http', 'apiUrl'];

export default function pickupService($http, apiUrl) {
    return {
        getAll() {
            return $http.get(`${apiUrl}/pickups`)
                .then(res => res.data);
        },
        getVisible() {
            return $http.get(`${apiUrl}/pickups?show=true`)
                .then(res => res.data);
        },
        create(pickup, token) {
            return $http({
                method: 'POST',
                url: `${apiUrl}/pickups`,
                headers: {
                    'Authorization': token
                },
                data: pickup
            }).then(res => res.data);
        },
        update(pickup, token) {
            return $http({
                method: 'PUT',
                url: `${apiUrl}/pickups/${pickup._id}`,
                headers: {
                    'Authorization': token
                },
                data: pickup
            }).then(res => res.data);
        },
        delete(id, token) {
            return $http({
                method: 'DELETE',
                url: `${apiUrl}/pickups/${id}`,
                headers: {
                    'Authorization': token
                },
            }).then(res => res.data);
        }
    };
}