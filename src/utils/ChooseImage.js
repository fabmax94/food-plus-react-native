import ImagePicker from 'react-native-image-picker';

const ChooseImage = callback => {
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
      callback(response.uri);
    }
  });
};

export default ChooseImage;
