import React, { createContext, FC, memo, useState } from "react";


type userInfo = {
    isLogin: boolean,
    id: number
}


export const AuthContext = createContext({} as {
    userInfo: userInfo;
    setUserInfo: React.Dispatch<React.SetStateAction<userInfo>>;
});

type Props = {
    children: React.ReactNode;
}

export const AuthProvider:FC<Props> = memo( (props) => {

    const { children } = props;
    
    const [userInfo, setUserInfo] = useState<userInfo>({
        isLogin: false,
        id: 0
    });


    return(
        <AuthContext.Provider value={{
            userInfo,
            setUserInfo
        }}>
            { children}
        </AuthContext.Provider>
        
    )
})