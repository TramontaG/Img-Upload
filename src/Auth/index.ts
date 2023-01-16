import createJWTMiddleware from 'Auth-Middleware';
const useAuth = createJWTMiddleware('http://gramont.ddns.net:7777/auth');

export default useAuth;
