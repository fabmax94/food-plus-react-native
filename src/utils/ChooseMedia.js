import ImagePicker from "react-native-image-picker";

const showImagePicker = (options, callback) => (
  ImagePicker.showImagePicker(options, response => {
    if (response.didCancel) {
      console.log("User cancelled image picker");
    } else if (response.error) {
      console.log("ImagePicker Error: ", response.error);
    } else if (response.customButton) {
      console.log("User tapped custom button: ", response.customButton);
      alert(response.customButton);
    } else {
      callback(response.uri);
    }
  })
);

export const ChooseImage = callback => {
  let options = {
    title: "Selecione uma imagem",
    takePhotoButtonTitle: "Tire uma foto",
    chooseFromLibraryButtonTitle: "Escolha da galeria",
    storageOptions: {
      skipBackup: true,
      path: "images",
    },
  };

  showImagePicker(options, callback);

};

export const ChooseVideo = callback => {
  let options = {
    title: "Selecione um vídeo",
    mediaType: "video",
    takePhotoButtonTitle: "Grave um vídeo",
    chooseFromLibraryButtonTitle: "Escolha da galeria",
    storageOptions: {
      skipBackup: true,
      path: "images",
    },
  };

  showImagePicker(options, callback);

};
