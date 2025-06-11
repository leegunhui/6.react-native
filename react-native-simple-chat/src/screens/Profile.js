import styled, { ThemeContext } from "styled-components";
import { logout,getCurrentUser, updateUserPhoto } from "../utils/firebase";
import { UserContext, ProgressContext } from "../contexts";
import { useContext,useState } from "react";
import { Button,Image, Input } from "../components";
import { Alert } from "react-native";

const Container = styled.View`
    flex : 1;
    background-color : ${({theme}) => theme.background};
    justify-content : center;
    align-items : center;
    padding : 0 20px;
`

const Profile = () => {
    const {dispatch} = useContext(UserContext);
    const {spinner} = useContext(ProgressContext);

    //테마를 불러와서 사용하기
    const theme = useContext(ThemeContext);
    
    //유저의 정보 불러와서 화면에 출력하기
    const user = getCurrentUser();
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl);

    const _handleLogoutButtonPress = async () => {
        try {
            spinner.start();
            await logout();
        } catch (error) {
            console.log(`[profile] logout : ${error.message}`)
        } finally{
            dispatch({});
            spinner.stop();
        }
    }

    const _handlePhotoChange = async url => {
        try {
            spinner.start();
            const updateUser = await updateUserPhoto(url);
            setPhotoUrl(updateUser.photoUrl);
        } catch (error) {
            Alert.alert('Photo Error',error.message);
        } finally{
            spinner.stop();
        }
    }

    return(
        <Container>
            <Image
                url={photoUrl}
                onChangeImage={_handlePhotoChange}
                showButton
                rounded
            />
            <Input label="Name" value={user.name} disabled />
            <Input label="Email" value={user.email} disabled />
            <Button
                title="logout"
                onPress={_handleLogoutButtonPress}
                containerStyle={{marginTop: 30, backgroundColor : theme.buttonLogout}}
            />
        </Container>
    )
}

export default Profile;