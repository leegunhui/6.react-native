import React, { useState, createContext } from 'react';

// ProgressContext를 생성합니다.
// 기본값으로 inProgress는 false, spinner는 빈 함수(dummy function)를 제공합니다.
const ProgressContext = createContext({
    inProgress: false,
    spinner: () => {},
});

// ProgressProvider 컴포넌트는 하위 컴포넌트에게 진행 상태와 spinner 제어 함수를 제공하는 역할을 합니다.
const ProgressProvider = ({ children }) => {
    // inProgress 상태 변수와 이를 업데이트할 setInProgress 함수를 선언합니다.
    // 초기값은 false입니다.
    const [inProgress, setInProgress] = useState(false);

    // spinner 객체를 생성하여 start와 stop 메서드를 정의합니다.
    // start: 호출 시 inProgress를 true로 변경하여 진행 중임을 나타냅니다.
    // stop: 호출 시 inProgress를 false로 변경하여 진행 중이 아님을 나타냅니다.
    const spinner = {
        start: () => setInProgress(true),
        stop: () => setInProgress(false),
    };

    // Context Provider로 전달할 값을 객체로 만듭니다.
    // 여기에는 현재 진행 상태와 spinner 객체가 포함됩니다.
    const value = { inProgress, spinner };

    // ProgressContext.Provider로 children(하위 컴포넌트들)을 감싸서
    // 하위 컴포넌트들이 value 객체를 구독할 수 있게 합니다.
    return (
        <ProgressContext.Provider value={value}>
            {children}
        </ProgressContext.Provider>
    );
};

// 다른 파일에서 사용할 수 있도록 ProgressContext와 ProgressProvider를 export 합니다.
export { ProgressContext, ProgressProvider };