paymentService.$inject = ['$http', 'apiUrl'];

export default function paymentService($http, apiUrl) {
    return {
        post(paymentInfo) {
            console.log(paymentInfo);
            return $http.post(`${apiUrl}/payments`, paymentInfo)
                .then(res => res.data);
        },
        createOrder(orderInfo) {
            return $http.post(`${apiUrl}/orders`, orderInfo)
                .then(res => {
                    console.log('in payment service', res.data, res.data._id);
                    return res.data;
                });
        }
    };
}