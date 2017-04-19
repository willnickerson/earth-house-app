juiceService.$inject = ['$http', 'apiUrl'];

export default function juiceService($http, apiUrl) {
    return {
        getAll() {
            return $http.get(`${apiUrl}/juices`)
                .then(res => res.data);
        },
        get(id) {
            return $http.get(`${apiUrl}/juices/${id}`)
                .then(res => res.data);
        },
        update(juice, id, token) {
            return $http({
                method: 'PUT',
                url: `${apiUrl}/juices/${id}`,
                headers: {
                    'Authorization': token
                },
                data: juice
            }).then(res => res.data);
        },
        create(juice, token) {
            return $http({
                method: 'POST',
                url: `${apiUrl}/juices`,
                headers: {
                    'Authorization': token
                },
                data: juice
            }).then(res => res.data);
        },
       
        delete(id, token) {
            return $http({
                method: 'DELETE',
                url: `${apiUrl}/juices/${id}`,
                headers: {
                    'Authorization': token
                }
            }).then(res => res.data);
        }
    };
}