aboutService.$inject = ['$http', 'apiUrl'];

export default function aboutService($http, apiUrl) {
    return {
        getAll() {
            return $http.get(`${apiUrl}/about-articles`)
                .then(res => res.data);
        },
        getVisible() {
            return $http.get(`${apiUrl}/about-articles?visible=true`)
                .then(res => res.data);
        },
        createArticle(article, token) {
            return $http({
                method: 'POST',
                url: `${apiUrl}/about-articles`,
                data:  article,
                headers: {
                    'Authorization': token
                }
            }).then(res => res.data);
        },
        updateArticle(article, token) {
            return $http({
                method: 'PUT',
                url: `${apiUrl}/about-articles/${article._id}`,
                headers: {
                    'Authorization': token
                },
                data: article
            }).then(res => res.data);
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
