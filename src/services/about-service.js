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
        }
    };
}