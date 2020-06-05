import React, {useState, useContext} from 'react';
import {StyleSheet} from 'react-native';
import {
  Content,
  Form,
  Item,
  Container,
  Input,
  Button,
  Text,
  Icon,
  Header,
  View,
  Thumbnail,
  Spinner,
} from 'native-base';
import FastImage from 'react-native-fast-image';
import {ContextAuth} from '../contexts/authContext';
import ImagePicker from 'react-native-image-picker';

const SigIn = () => {
  const {signIn, auth} = useContext(ContextAuth);
  const [data, setData] = useState({
    name: '',
    avatar: '',
  });
  const chooseImage = () => {
    let options = {
      title: 'Selecione uma imagem',
      takePhotoButtonTitle: 'Tire uma foto',
      chooseFromLibraryButtonTitle: 'Escolha da galeria',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        let avatar = response.uri;
        setData({...data, avatar});
      }
    });
  };
  return auth.isLoading ? null : (
    <Container style={{backgroundColor: '#ecedf3'}}>
      <Header androidStatusBarColor="#ecedf3" transparent />
      <Content style={style.content}>
        <FastImage
          source={require('../assets/app_icon.png')}
          style={{
            width: 200,
            height: 200,
            alignSelf: 'center',
            marginTop: 20,
          }}
        />
        {auth.isLoading ? (
          <Spinner color={'#ef3e5c'} style={{marginTop: 100}} />
        ) : (
          <>
            <Form style={{marginTop: 80}}>
              <Item rounded style={{borderColor: '#415a6b'}}>
                <Icon active name={'person'} style={{color: '#415a6b'}} />
                <Input
                  placeholder={'Nome'}
                  style={{color: '#415a6b'}}
                  value={data.name}
                  onChangeText={name => setData({...data, name})}
                />
              </Item>
            </Form>
            <View
              style={{
                marginTop: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Button
                bordered
                rounded
                style={{borderColor: '#415a6b'}}
                onPress={chooseImage}>
                <Text style={{color: '#415a6b'}}>Escolha seu avatar</Text>
                {data.avatar ? (
                  <Thumbnail
                    style={{width: 40, height: 40, marginRight: 10}}
                    source={{
                      uri: data.avatar,
                    }}
                  />
                ) : (
                  <Icon
                    name="image"
                    type="FontAwesome"
                    style={{color: '#415a6b'}}
                  />
                )}
              </Button>
              <Button
                rounded
                light
                style={style.btn}
                onPress={() => signIn(data)}>
                <Icon
                  name="arrow-right"
                  type="FontAwesome"
                  style={{color: 'white'}}
                />
              </Button>
            </View>
          </>
        )}
      </Content>
    </Container>
  );
};

const style = StyleSheet.create({
  content: {
    padding: 10,
  },
  btn: {
    backgroundColor: '#415a6b',
    alignSelf: 'center',
  },
});

export default SigIn;
