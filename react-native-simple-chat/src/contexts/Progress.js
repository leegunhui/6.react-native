import {useState, createContext} from 'react'

//데이터를 전역적으로 관리하기 위해 context를 생성을 한다.
const ProgressContext = createContext({
    inProgress : false,
    spinner : () => {}
})

//Provider 컴포넌트는 하위 컴포넌트에게 '진행 상태'와 spinner를 제어할 수 있는 함수를 제공하는 역할
const ProgressProvider = ({children}) => {

    //inProgress state와 이를 업데이트할 setInProgress 함수를 만든다.
    const [inProgress,setInProgress] = useState(false);

    //spinner 객체를 생성하여 start와 stop 메서드를 정의
    const spinner = {
        start: () => setInProgress(true), //진행중을 나타내는 함수
        stop: () => setInProgress(false), //진행중이 아님을 나타내는 함수
    }

    const value= { inProgress, spinner} //전역적으로 관리하려는 데이터

    return(
        <ProgressContext.Provider value={value}>
            {children}
        </ProgressContext.Provider>
    )
}

export {ProgressContext, ProgressProvider};