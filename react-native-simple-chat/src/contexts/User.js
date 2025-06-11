import {useState, createContext} from 'react'

const UserContext = createContext({
    user : {email : null, uid : null},
    dispatch : () => {},
})

//UserProvider를 만든다.
//useState하나 만들고 빈객체로 초기화 한다. [user,setUser]
//dispatch함수를 정의한다.(매개변수는 email,uid)
//인자에 들어온 email과 uid를 state에 세팅한다.
//user와 dispatch를 전역으로 내보낸다.
const UserProvider = ({children}) => {
    const [user,setUser] = useState({});

    const dispatch = ({email,uid}) =>{
        // const newUser = {
        //     email: email,
        //     uid :uid,
        // }
        // setUser(newUser);
        setUser({email, uid});
    }

    const value = {user,dispatch};

    return(
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}

export {UserContext, UserProvider}