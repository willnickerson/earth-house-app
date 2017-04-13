aboutService.$inject = ['$http', 'apiUrl'];

export default function aboutService($http, apiUrl) {
    return {
        getAll() {
            return $http.get(`${apiUrl}/about-articles`)
                .then(res => {
                    console.log('in about service', `${apiUrl}/about-articles`, res.data);
                    return res.data;
                });
        },
        getVisible() {
            return $http.get(`${apiUrl}/about-articles?visible=true`)
                .then(res => {
                    console.log(res.date);
                    return res.data;
                });
        },
        createArticle(article) {
            return $http.post(`${apiUrl}/about-articles`, article)
                .then(res => {
                    console.log(res.date);
                    return res.data;
                });
        },
        updateArticle(article, token) {
            return $http({
                method: 'PUT',
                url: `${apiUrl}/about-articles/${article._id}`,
                headers: {
                    'Authorization': token
                },
                data: article
            }).then(res => {
                console.log(res.data);
                return res.data;
            });
        }
    };
}


// updateOrder(id, order, token) {
//     return $http({
//         method: 'PUT',
//         url: `${apiUrl}/orders/${id}`,
//         headers: {
//             'Authorization': token
//         },
//         data: order
//     }).then(res => res.data);
// }