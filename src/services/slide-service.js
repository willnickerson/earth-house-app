slideService.$inject = ['$http', 'apiUrl'];

export default function slideService($http, apiUrl) {
    return {
        getAll() {
            return $http.get(`${apiUrl}/slides`)
                .then(res => res.data);
        },
        getVisible() {
            return $http.get(`${apiUrl}/slides?show=true`)
                .then(res => {
                    console.log(res.data);
                    return res.data;
                });
        },
        create(slide, token) {
            return $http({
                method: 'POST',
                url: `${apiUrl}/slides`,
                headers: {
                    'Authorization': token
                },
                data: slide
            }).then(res => res.data);
        },
        update(slide, id, token) {
            return $http({
                method: 'PUT',
                url: `${apiUrl}/slides/${id}`,
                headers: {
                    'Authorization': token
                },
                data: slide
            }).then(res => res.data);
        },
        delete(id, token) {
            return $http({
                method: 'DELETE',
                url: `${apiUrl}/slides/${id}`,
                headers: {
                    'Authorization': token
                }
            }).then(res => res.data);
        }
    };
}