// 필요한 React 훅과 컴포넌트들을 임포트
import React, { useState, useEffect, useLayoutEffect } from "react";
// Firestore 데이터베이스와 메시지 생성 함수를 가져옵니다.
import { db, createMessage } from "../utils/firebase";
// 커스텀 Input 컴포넌트 임포트
import { Input } from "../components";
// styled-components와 ThemeContext를 가져옵니다.
import styled from "styled-components";
// React Native 기본 컴포넌트 임포트
import { Text, FlatList } from 'react-native'
// Firestore에서 사용할 collection, onSnapshot, query, orderBy 함수를 가져옵니다.
import {
    collection,
    onSnapshot,
    query,
    doc,
    orderBy,
} from 'firebase/firestore';

// styled-components를 사용하여 컨테이너 스타일링
// theme에서 background 색상을 가져와 적용
const Container = styled.View`
    flex: 1;
    background-color: ${({theme})=> theme.background};
`;

// Channel 컴포넌트 정의
// navigation과 route는 React Navigation에서 제공하는 props
const Channel = ({navigation, route}) => {
    // route.params에서 채널 정보 추출
    const {params} = route;
    
    // 메시지 목록과 입력 텍스트를 위한 상태 관리
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState("");
    
    // 메시지 실시간 동기화를 위한 useEffect
    useEffect(() => {
        // 채널 ID가 없으면 실행하지 않음
        if (!params.id) return;
        
        // Firestore에서 해당 채널의 메시지 컬렉션 참조 생성
        const messagesRef = collection(db, "channels", params.id, "messages");
        // 생성 시간 기준 내림차순으로 정렬하는 쿼리 생성
        const collectionQuery = query(messagesRef, orderBy("createdAt", "desc"));
        
        // 실시간 업데이트를 위한 리스너 설정
        const unsubscribe = onSnapshot(collectionQuery, (snapshot) => {
            // 문서들을 배열로 변환하여 상태 업데이트
            const list = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setMessages(list);
        });
        
        // 컴포넌트 언마운트 시 리스너 제거
        return () => unsubscribe();
    }, [params.id]); // params.id가 변경될 때마다 실행

    // 네비게이션 헤더 제목 설정을 위한 useLayoutEffect
    useLayoutEffect(() => {
        navigation.setOptions({headerTitle: params.title || 'Channel'})
    },[params.title])

    return(
        <Container>
            {/* 메시지 목록을 표시하는 FlatList */}
            <FlatList
                keyExtractor={item=>item['id']}
                data={messages}
                renderItem={({item}) => (
                    <Text style={{ fontSize: 24}}>{item.text}</Text>
                )}
            />
            {/* 메시지 입력을 위한 Input 컴포넌트 */}
            <Input
                value={text}
                onChangeText={text => setText(text)}
                onSubmitEditing={() => createMessage({ 
                    channelId: params.id,
                    text
                })}
            />
        </Container>
    )
}

export default Channel;