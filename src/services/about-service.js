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
        createArticle(article, token) {
            return $http({
                method: 'POST',
                url: `${apiUrl}/about-articles`,
                data:  article,
                headers: {
                    'Authorization': token
                }
            }).then(res => {
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
        },
        deleteArticle(article, token) {
            return $http({
                method: 'DELETE',
                url: `${apiUrl}/about-articles/${article._id}`,
                headers: {
                    'Authorization': token
                }
            });
        }
    };
}
