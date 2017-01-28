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
        }
    };
}