articleService.$inject = ['$http', 'apiUrl'];

export default function articleService($http, apiUrl) {
    return {
        getAll() {
            return $http.get(`${apiUrl}/articles`)
                .then(res => {
                    console.log('in about service', res.data);
                    return res.data;
                });
        },
        updateArticle(article, token) {
            return $http({
                method: 'PUT',
                url: `${apiUrl}/articles/${article._id}`,
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