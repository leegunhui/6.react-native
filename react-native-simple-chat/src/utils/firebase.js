import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile, //로그인한 유저의 프로필 업데이트를 하는 함수
} from 'firebase/auth';
import {
  getStorage, //firebase와 연결된 Storage객체를 불러온다.
  ref, //Storage에 있는 파일이나 경로를 참조하는 객체
  uploadBytes, //Storage에 파일을 업로드해주는 함수
  getDownloadURL, //Storage에 업로드된 파일의 다운로드 URL을 가져온다.
} from 'firebase/storage'
import { 
  getFirestore,
  collection,
  doc,
  setDoc,
  addDoc,
  serverTimestamp,
 } from 'firebase/firestore';

import config from '../../firebase.json';


export const app = initializeApp(config);
//인증 모듈 가져오기
const auth = getAuth(app);
//Storage 인스턴스를 생성
const storage = getStorage(app);

//파이어스토어 DB 모듈 가져오기
export const db = getFirestore(app);

//로그인 기능
export const login = async ({ email, password }) => {
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  // console.log('f_user.email : ',user.email,'f_user.uid : ',user.uid);
  return user;
};

export const signup = async({email,password,name,photoURL}) => {
  console.log('f_url:',photoURL);
  //이메일/비밀번호를 기반으로 firebase의 auth에 사용자 등록
  //createUserWithEmailAndPassword함수는 이메일과 비밀번호만 인자로 받는데
  //어떻게 이름과 사진을 같이 저장할 수 있을까?
  //사용자 이름은 문자열로 입력할 수 있지만, 사진을 선택해서 받은 경로는 'file://...'로 시작하는
  //값을 가지고 있어 바로 사용할 수 없다.
  //사용자에 의해 선택한 사진을 firebase의 스토리지에 업로드해서 해결할 수 있다.
  const {user} = await createUserWithEmailAndPassword(auth,email,password);

  
  //프로필 사진 URL 처리
  //https로 시작하면 그대로 사용, 아니면 Storage에 업로드 후 URL을 획득해서 사용
  const photoUrl = await uploadImage(photoURL);

  //현재 로그인한 유저의 이름과 프로필 사진을 업데이트 합니다.
  await updateProfile(auth.currentUser, {displayName : name, photoURL : photoUrl});

  return user;
}

//이미지를 업로드하는 함수
const uploadImage = async uri => {
  //이미 https로 시작하는 경우 바로 반환을 해라
  if(uri.startsWith('https')){
    return uri;
  }
  //로컬 파일을 fetch해서 blob데이터로 변환
  const response = await fetch(uri);
  //blob() : binaryLargeObject의 약자
  const blob = await response.blob();

  //현재 로그인한 유저의 uid를 가져온다.
  const {uid} = auth.currentUser;


  //Storage에 저장할 파일 경로를 설정
  const storageRef = ref(storage, `/profile/${uid}/photo.png`);

  //파일을 Storage에 업로드, 타입은 image/png로 명시
  await uploadBytes(storageRef, blob, {
    contentType : 'image/png',
  })

  return await getDownloadURL(storageRef);
}

export const logout = async () => {
  return await auth.signOut();
}

export const getCurrentUser = () => {
  //auth.currentUser에 로그인된 사용자 정보가 담겨있다.
  //Profil페이지도 인증이 필요한 화면이기 때문에 email과 uid가 필요하다.
  //email,uid,name,photoUrl을 구조분해할당으로 받아서 객체 리터럴에 담아서 반환
  const {uid,email,displayName,photoURL} = auth.currentUser;

  return{
    uid,
    email,
    name : displayName,
    photoUrl : photoURL,
  }
}

//사용자의 프로필 사진 업데이트
export const updateUserPhoto = async photoUrl => {
  //1. 현재 로그인한 사용자를 불러온다.
  const user = auth.currentUser;
  //2. 인자로 받은 photoUrl이 https로 시작하면 url을 그대로 사용
  //그렇지 않으면 Storage에 업로드 후 firebase Storage URL을 획득한다.
  const storageUrl = photoUrl.startsWith('https') ? photoUrl : await uploadImage(photoUrl);

  //firebase Auth의 updateProfile로 프로필 사진 주소를 수정
  await updateProfile(user, {photoURL: storageUrl});

  //업데이트된 사용자 정보를 객체형태로 반환한다.
  //{name : xxx, email: xxx, photoUrl : xxx}
  return {
    name : user.displayName,
    email : user.email,
    photoUrl : user.photoURL,
  }
}

//문서 생성하기
export const createChannel = async({title, description}) => {
  //1. 'channels'컬렉션 참조 가져오기
  //firestore에 없는 컬렉션을 참조해서 가져오려고 해도 에러가 나지는 않는다.
  const channelCollection = collection(db,'channels');

  //2. 새 문서에 대한 참조 생성
  const newChannelRef = doc(channelCollection);

  //3. 채널에 할당될 고유ID
  const id = newChannelRef.id;

  //4. 새 채널에 들어갈 필드값을 구성
  const newChannel = {
    id,
    title,
    description,
    createdAt : Date.now(),
  }

  //5. setDoc로 해당 문서 경로에 데이터 쓰기
  await setDoc(newChannelRef, newChannel);

  //맨처음에 컬렉션은 없지만 문서를 저장하면서 자동으로 컬렉션을 만든다.

  //6. 생성된 문서 ID반환
  return id;
}

export const createMessage = async ({ channelId, text }) => {
  console.log("Sending message to channel:", channelId, text);

  try {
    const collectionRef = collection(db, `channels/${channelId}/messages`);
    await addDoc(collectionRef, { 
      text,
      createdAt: serverTimestamp() // Firestore 서버 시간 사용
    });
    console.log("Message added successfully!");
  } catch (error) {
    console.error("Error adding message: ", error);
  }
};