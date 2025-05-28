import React, { createContext, useState } from 'react';

// 1. Context 생성 및 기본 값 설정
// `UserContext`를 생성하고, 기본 값으로 `user` 객체와 `dispatch` 함수를 설정함.
// `user`는 사용자 정보 (여기서는 이름)이고, `dispatch`는 이름을 업데이트하는 함수로 사용될 예정임.
const UserContext = createContext({
  user: { name: '' },  // 기본 사용자 이름을 빈 문자열로 설정
  dispatch: () => {},  // 기본 `dispatch`는 빈 함수로 설정
});

// 2. UserProvider 컴포넌트 정의
// `UserProvider`는 `UserContext`의 값을 제공하는 역할을 함.
// 하위 컴포넌트들이 `UserContext`에 접근할 수 있게 해줌.
const UserProvider = ({ children }) => {
  // `name` 상태를 "Gunhui Lee"으로 초기화하고, `setName`을 통해 상태를 업데이트할 수 있게 함.
  const [name, setName] = useState('Gunhui Lee');

  // `value` 객체에는 현재 `user` 상태와 상태를 업데이트할 함수 `dispatch`를 포함함.
  // `dispatch`로 `setName` 함수를 전달하여 하위 컴포넌트들이 이름을 업데이트할 수 있게 함.
  const value = { user: { name }, dispatch: setName };

  // `UserContext.Provider`를 사용해 하위 컴포넌트에게 `value` 객체를 전달.
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// 3. Consumer 컴포넌트 정의
// `UserConsumer`는 `UserContext.Consumer`를 의미함.
// 하위 컴포넌트에서 `UserConsumer`를 사용하여 `UserContext`의 값에 접근할 수 있음.
const UserConsumer = UserContext.Consumer;

// `UserProvider`와 `UserConsumer`, `UserContext` 자체를 export하여 다른 파일에서 사용할 수 있게 함.
export { UserProvider, UserConsumer };
export default UserContext;
