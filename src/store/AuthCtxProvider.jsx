import {createContext, useContext, useState} from "react";
import {jwtDecode} from "jwt-decode";

const AuthContext = createContext({
    token: '',
    user: {},
    userId: '',
    email: '',
    login(email, token) {
    },
    logout() {
    },
    isUserLoggedIn: false,
    isUserAdmin: false
});

function parseJWTTokenData (token) {
    if (!token) return {};
    const tokenData = jwtDecode(token);

    const dateNow = Date.now() / 1000;
    const expire = token.exp + token.iat;

    if (dateNow > expire) {
        localStorage.removeItem('token')
        return {};
    }

    return {...tokenData, token: token};
}

export default function AuthCtxProvider({children}) {
    let tokenData = parseJWTTokenData(localStorage.getItem('token'))

    const [authState, setAuthState] = useState({
        token: tokenData?.token || '',
        email: tokenData?.user?.email || '',
        userId: tokenData?.sub || '',
        user: tokenData?.user || {}
    });

    function login(email, token) {
        const tokenData = jwtDecode(token);

        setAuthState({
            token: token,
            email: email,
            userId: tokenData.user.id,
            user: tokenData.user
        })

        localStorage.setItem('token', token);
    }

    function logout() {
        setAuthState({
            token: '',
            email: '',
            userId: '',
            user: {}
        });

        localStorage.removeItem('token');
    }

    const isUserLoggedIn = !!authState.token;

    let isUserAdmin = false;
    if (isUserLoggedIn) {
        const tokenData = jwtDecode(authState.token);
        isUserAdmin = !!(tokenData.user.hasOwnProperty('scope') && tokenData.user.scope === 'admin');
    }

    const ctxValue = {
        isUserLoggedIn,
        isUserAdmin,
        token: authState.token,
        email: authState.email,
        userId: authState.userId,
        user: authState.user,
        login,
        logout
    }

    return <AuthContext.Provider value={ctxValue}>{children}</AuthContext.Provider>
}


export function useAuthContext() {
    return useContext(AuthContext);
}
