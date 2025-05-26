//리액트 네이티브에서 제공하는 Image컴포넌트는 프로젝트에 있는
//이미지 파일의 경로나 URL을 이용하여 원격에 있는
//이미지를 렌더링 할 수 있다.
import CheckBoxOutline from '../assets/icon/check_box_outline.png';
import CheckBox from '../assets/icon/check_box.png';
import DeleteForever from '../assets/icon/delete_forever.png';
import Edit from '../assets/icon/edit.png'

export const images = {
    uncomplete : CheckBoxOutline,
    complete : CheckBox,
    delete : DeleteForever,
    update : Edit,
}