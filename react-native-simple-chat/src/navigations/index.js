import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AuthStack";
import MainStack from "./MainStack";
import { Spinner } from "../components";
import { ProgressContext,UserContext } from "../contexts";
import { useContext } from "react";

//Spinner.js -> 로딩화면
//로딩화면을 띄우는 여부를 Progress.js에 만들어놨다.
//전역적으로 사용하기 위해서 Context를 사용했다.

//inProgress의 값에 따라 <Spinner /> 컴포넌트를 호출하는 코드 작성하기
//user의 uid와 email값이 존재하면 인증된 것으로 판단하고
//MainStack네비게이션을 렌더링해보자.
//존재하지 않으면 AuthStack네비게이션을 렌더링하자.
const Navigation = () => {
    //useContext()훅을 통해 ProgressContext가 제공하는 것들을 받아올 수 있다.
    const {inProgress} = useContext(ProgressContext);
    const {user} = useContext(UserContext);
    // ?. : 옵셔널체이닝
    //객체의 속성이나 메서드에 접근할 때 값이 null이나 undefined여도 에러가 나지 않고
    //undefined를 반환하도록 하는 문법이다.
    console.log(`user.email : ${user.email} / user.uid : ${user.uid}`);
    return (
        <NavigationContainer>
            {user?.email && user?.uid ? <MainStack /> : <AuthStack />}
            {inProgress && <Spinner />}
        </NavigationContainer>
    )
}

export default Navigation;