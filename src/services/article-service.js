articleService.$inject = ['$http', 'apiUrl'];

export default function articleService($http, apiUrl) {
    return {
        getAll() {
            return $http.get(`${apiUrl}/articles`)
                .then(res => res.data);
        },
        create(article, token) {
            return $http({
                method: 'POST',
                url: `${apiUrl}/articles`,
                headers: {
                    'Authorization': token
                },
                data: article
            }).then(res => res.data);
        },
        update(article, token) {
            return $http({
                method: 'PUT',
                url: `${apiUrl}/articles/${article._id}`,
                headers: {
                    'Authorization': token
                },
                data: article
            }).then(res => res.data);
        }
    };
}