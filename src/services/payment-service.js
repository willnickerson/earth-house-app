paymentService.$inject = ['$http', 'apiUrl'];

export default function paymentService($http, apiUrl) {
    return {
        post() {
            return $http.post(`${apiUrl}/payments`)
                .then(res => res.data);
        }
    };
}