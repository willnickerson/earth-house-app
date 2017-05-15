mailService.$inject = ['$http', 'apiUrl'];

export default function mailService($http, apiUrl) {
    return {
        getAll() {
            return $http.get(`${apiUrl}/emails`)
                .then(res => res.data);
        },
        create(email) {
            return $http({
                method: 'POST',
                url: `${apiUrl}/emails`,
                data: email
            }).then(res => res.data);
        },
        update(email, token) {
            return $http({
                method: 'PUT',
                url: `${apiUrl}/emails/${email._id}`,
                headers: {
                    'Authorization': token
                },
                data: email
            }).then(res => res.data);
        }
    };
}