ingredientService.$inject = ['$http', 'apiUrl'];

export default function ingredientService($http, apiUrl) {
    return {
        getAll() {
            return $http.get(`${apiUrl}/ingredients`)
                .then(res => res.data);
        },
        get(id) {
            return $http.get(`${apiUrl}/ingredients/${id}`)
                .then(res => res.data);
        },
        create(ingredient, token) {
            return $http({
                method: 'POST',
                url: `${apiUrl}/ingredients`,
                headers: {
                    'Authorization': token
                },
                data: ingredient   
            }).then(res => res.data);
        },
        update(ingredient, id, token) {
            return $http({
                method: 'PUT',
                url: `${apiUrl}/ingredients/${id}`,
                headers: {
                    'Authorization': token
                },
                data: ingredient
            }).then(res => res.data);
        },
        delete(id, token) {
            return $http({
                method: 'DELETE',
                url: `${apiUrl}/ingredients/${id}`,
                headers: {
                    'Authorization': token
                }
            }).then(res => res.data);
        }
    };
}