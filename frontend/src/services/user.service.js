import httpService from './http.service'

export default {
    login,
    logout,
    signup,
    getById,
    getLoggedinUser
}

function getById(userId) {
    return httpService.get(`user/${userId}`)
}

async function login(userCred) {
    const user = await httpService.post('auth/login', userCred)
    return _handleLogin(user)
}
async function signup(userCred) {
    const user = await httpService.post('auth/signup', userCred)
    return _handleLogin(user)
}
async function logout() {
    await httpService.post('auth/logout');
    sessionStorage.clear();
}

function _handleLogin(user) {
    sessionStorage.setItem('user', JSON.stringify(user))
    return user;
}
function getLoggedinUser() {
    const user = sessionStorage.getItem('user')
    if (!user) return ''
    return JSON.parse(user);
}