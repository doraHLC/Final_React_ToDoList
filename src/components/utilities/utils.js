const TOKEN_NAME = "token";

export const setAuthToken = (token) => {
    return localStorage.setItem(TOKEN_NAME, token);
};

export const getAuthToken = () => {
    return localStorage.getItem(TOKEN_NAME);
};

const NICK_NAME = "userNickname";

export const setNickName = (nickName) => {
    return localStorage.setItem(NICK_NAME, nickName);
}

export const getNickName = () => {
    return localStorage.getItem(NICK_NAME);
};