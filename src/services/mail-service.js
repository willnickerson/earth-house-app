mailService.$inject = ['$http', 'apiUrl', 'dateService'];

export default function mailService($http, apiUrl) {
    return {
        getAll(token) {
            return $http({
                method: 'GET',
                url: `${apiUrl}/emails`,
                headers: {
                    'Authorization': token
                }
            })
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
        },
        delete(email, token) {
            return $http({
                method: 'DELETE',
                url: `${apiUrl}/emails/${email._id}`,
                headers: {
                    'Authorization': token
                }
            }).then(res => res.data);
        }
    };
}