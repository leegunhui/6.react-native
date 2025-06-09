// firebase/app과 firebase/auth에서 필요한 함수만 임포트
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  updateProfile, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword 
} from 'firebase/auth';
import { 
  getStorage, 
  ref, 
  uploadBytes, 
  getDownloadURL 
} from 'firebase/storage';
import config from '../../firebase.json';

// Firebase 앱 초기화
export const app = initializeApp(config);

// 인증 모듈 가져오기
const auth = getAuth(app);

const storage = getStorage(app);

// (1) 이메일/비밀번호 로그인
export const login = async ({ email, password }) => {
  try {
    // Firebase Auth 함수 signInWithEmailAndPassword로 로그인
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    // userCredential 객체 안에는 로그인된 사용자 정보가 들어 있음
    return userCredential.user;
  } catch (error) {
    console.error('Login error:', error);
    // 에러 발생 시 상위(호출부)로 에러를 던짐
    throw error;
  }
};

// (2) 로그아웃
export const logout = async () => {
  // 현재 로그인된 사용자 세션을 종료 (Promise 반환)
  return await auth.signOut();
};

// (3) 현재 로그인한 사용자 정보 가져오기
export const getCurrentUser = () => {
  // auth.currentUser가 로그인된 사용자 객체를 반환
  const { uid, displayName, email, photoURL } = auth.currentUser;
  console.log(`displayName: ${displayName}`);
  // 우리가 원하는 형태로 가공해서 반환
  return {
    uid,
    name: displayName,
    email,
    photoUrl: photoURL,
  };
};

// (4) 사용자 프로필 사진 업데이트
export const updateUserPhoto = async photoUrl => {
  // 현재 로그인한 사용자 객체
  const user = auth.currentUser;
  // 만약 photoUrl이 HTTPS로 시작하면 이미 URL이므로 그대로 사용
  // 그렇지 않으면 업로드 과정을 거친 뒤 Firebase Storage URL 획득
  const storageUrl = photoUrl.startsWith('https')
    ? photoUrl
    : await uploadImage(photoUrl);

  // Firebase Auth의 updateProfile로 프로필 사진 주소 수정
  await updateProfile(user, { photoURL: storageUrl });

  // 업데이트된 사용자 정보 반환
  return {
    name: user.displayName,
    email: user.email,
    photoUrl: user.photoURL,
  };
};

const uploadImage = async uri => {
// 주어진 URI에서 Blob(바이너리 큰 객체)을 얻기 위해 Promise를 생성하고, 비동기적으로 실행합니다.
const blob = await new Promise((resolve, reject) => {
    // 새로운 XMLHttpRequest 인스턴스 생성
    const xhr = new XMLHttpRequest();

    // 요청이 성공적으로 완료되었을 때 실행되는 콜백 함수
    xhr.onload = () => {
        // xhr.response는 xhr.responseType으로 설정한 'blob' 형태의 데이터를 반환합니다.
        // 요청이 성공하면 Promise를 resolve하여 blob 데이터를 반환합니다.
        resolve(xhr.response);
    };

    // 요청이 실패할 경우 실행되는 콜백 함수
    xhr.onerror = () => {
        // 네트워크 요청에 실패하면 Promise를 reject하여 에러를 발생시킵니다.
        reject(new TypeError('Network request failed'));
    };

    // 응답 데이터를 Blob 형식으로 받도록 지정합니다.
    xhr.responseType = 'blob';

    // 비동기 GET 요청을 초기화합니다.
    // uri: 요청을 보낼 URL, true: 비동기 방식으로 요청을 처리함
    xhr.open('GET', uri, true);

    // 요청을 전송합니다. GET 요청에서는 body 데이터가 필요 없으므로 null을 전달합니다.
    xhr.send(null);
});

    // 현재 로그인한 사용자 확인
    const user = auth.currentUser;

    // Firebase Storage의 경로 참조 생성
    const storageRef = ref(storage,`/profile/${user.uid}/photo.png`) ;

    // Blob을 Firebase Storage에 업로드 (업로드 결과는 여기서는 사용하지 않으므로 변수에 할당하지 않습니다.)
    await uploadBytes(storageRef, blob, { contentType: 'image/png' });

    // Blob 객체 닫기 (메모리 해제)
    blob.close();

    // 업로드한 파일의 다운로드 URL을 반환
    return await getDownloadURL(storageRef);
}

export const signup = async ({email, password, name, photoUrl}) => {
    // 이메일/비밀번호 기반으로 Firebase Auth에 사용자 등록
    const {user} = await createUserWithEmailAndPassword(auth, email,password);

    // 프로필 사진 URL 처리
    // 이미 https로 시작하면 그대로 사용, 아니면 Storage에 업로드 후 URL 획득
    const storageUrl = photoUrl.startsWith('https')
        ? photoUrl 
        : await uploadImage(photoUrl);

    // 생성된 사용자 객체(user)에 프로필 업데이트(이름, 사진)
    await updateProfile(user,{
        displayName: name,
        photoURL: storageUrl,
    })

    // 가입한 사용자 정보 반환
    return user;
}



























// import { initializeApp } from 'firebase/app';
// import {
//   getAuth,
//   signInWithEmailAndPassword,
//   createUserWithEmailAndPassword,
//   updateProfile, //로그인한 유저의 프로필 업데이트를 하는 함수
// } from 'firebase/auth';
// import {
//   getStorage, //firebase와 연결된 Storage객체를 불러온다.
//   ref, //Storage에 있는 파일이나 경로를 참조하는 객체
//   uploadBytes, //Storage에 파일을 업로드해주는 함수
//   getDownloadURL, //Storage에 업로드된 파일의 다운로드 URL을 가져온다.
// } from 'firebase/storage'
// import config from '../../firebase.json';

// export const app = initializeApp(config);

// const auth = getAuth(app);

// export const login = async ({ email, password }) => {
//   const { user } = await signInWithEmailAndPassword(auth, email, password);
//   return user;
// };

// export const signup = async({email,password,name,photoURL}) => {
//   console.log('f_url:',photoURL);
//   //이메일/비밀번호를 기반으로 firebase의 auth에 사용자 등록
//   //createUserWithEmailAndPassword함수는 이메일과 비밀번호만 인자로 받는데
//   //어떻게 이름과 사진을 같이 저장할 수 있을까?
//   //사용자 이름은 문자열로 입력할 수 있지만, 사진을 선택해서 받은 경로는 'file://...'로 시작하는
//   //값을 가지고 있어 바로 사용할 수 없다.
//   //사용자에 의해 선택한 사진을 firebase의 스토리지에 업로드해서 해결할 수 있다.
//   const {user} = await createUserWithEmailAndPassword(auth,email,password);

  
//   //프로필 사진 URL 처리
//   //https로 시작하면 그대로 사용, 아니면 Storage에 업로드 후 URL을 획득해서 사용
//   const photoUrl = await uploadImage(photoURL);

//   //현재 로그인한 유저의 이름과 프로필 사진을 업데이트 합니다.
//   await updateProfile(auth.currentUser, {displayName : name, photoURL : photoUrl});

//   return user;
// }

// //이미지를 업로드하는 함수
// const uploadImage = async uri => {
//   //이미 https로 시작하는 경우 바로 반환을 해라
//   if(uri.startsWith('https')){
//     return uri;
//   }
//   //로컬 파일을 fetch해서 blob데이터로 변환
//   const response = await fetch(uri);
//   //blob() : binaryLargeObject의 약자
//   const blob = await response.blob();

//   //현재 로그인한 유저의 uid를 가져온다.
//   const {uid} = auth.currentUser;

//   //Storage 인스턴스를 생성
//   const storage = getStorage(app);
//   //Storage에 저장할 파일 경로를 설정
//   const storageRef = ref(storage, `/profile/${uid}/photo.png`);

//   //파일을 Storage에 업로드, 타입은 image/png로 명시
//   await uploadBytes(storageRef, blob, {
//     contentType : 'image/png',
//   })

//   return await getDownloadURL(storageRef);
// }

