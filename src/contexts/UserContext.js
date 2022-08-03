import { createContext, useContext, useState, useEffect } from "react";
import { getAuthToken, getNickName } from '../components/utilities/utils';

export const API_URL = 'https://todoo.5xcamp.us/';

export const UserToken = createContext({
    currentToken: null,
    setCurrentToken: () => null
});

export const UserTokenProvider = ({ children }) => {
    const [currentToken, setCurrentToken] = useState(null);
    const value = { currentToken, setCurrentToken };

    const token = getAuthToken();
    useEffect(() => {
        setCurrentToken(token);
    }, [token, setCurrentToken]);

    return <UserToken.Provider value={value}>{children}</UserToken.Provider>
}

export const UserTokenContext = () => {
    return useContext(UserToken)
};

export const UserNickname = createContext({
    currentNickname: null,
    setCurrentNickname: () => null
});

export const UserNicknameProvider = ({ children }) => {
    const [currentNickname, setCurrentNickname] = useState(null);
    const value = { currentNickname, setCurrentNickname }

    const nickName = getNickName();
    useEffect(() => {
        setCurrentNickname(nickName);
    }, [nickName])

    return <UserNickname.Provider value={value}>{children}</UserNickname.Provider>
}

export const UserNicknameContext = () => {
    return useContext(UserNickname)
};