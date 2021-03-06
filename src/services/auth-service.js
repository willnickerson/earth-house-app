authService.$inject = ['$http', 'apiUrl'];

export default function authService($http, apiUrl) {
    return {
        signin(credentials) {
            return $http.post(`${apiUrl}/auth/signin`, credentials)
                .then(res => res.data);
        }
    };
}