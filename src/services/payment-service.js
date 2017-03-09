paymentService.$inject = ['$http', 'apiUrl'];

export default function paymentService($http, apiUrl) {
    return {
        post(paymentInfo) {
            return $http.post(`${apiUrl}/payments`, paymentInfo)
                .then(res => res.data);
        }
    };
}