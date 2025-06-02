import { initializeApp } from 'firebase/app';
import config from '../../firebase.json'

//initializeApp()
//Firebase SDK를 내 프로젝트에 연결해주는 ㅎ마수
//config에 들어있는 정보로 firebase랑 연결해줌

const app = firebase.initializeApp(config);