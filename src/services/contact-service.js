contactService.$inject = ['$http', 'apiUrl'];

export default function contactService($http, apiUrl) {
    return {
        getAll() {
            return $http.get(`${apiUrl}/contact`)
                .then(res => res.data);
        },
        create(contact, token) {
            return $http({
                method: 'POST',
                url: `${apiUrl}/contact`,
                headers: {
                    'Authorization': token
                },
                data: contact
            }).then(res => res.data);
        },
        update(contact, token) {
            return $http({
                method: 'PUT',
                url: `${apiUrl}/contact/${contact._id}`,
                headers: {
                    'Authorization': token
                },
                data: contact
            }).then(res => res.data);
        }
    };
}