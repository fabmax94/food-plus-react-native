import ImagePicker from "react-native-image-picker";

const showPicker = (options, callback) => (ImagePicker.showImagePicker(options, response => {
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
}));

const imagePicker = callback => {
  let options = {
    title: "Selecione uma imagem",
    takePhotoButtonTitle: "Tire uma foto",
    chooseFromLibraryButtonTitle: "Escolha da galeria",
    quality: 0.5,
    storageOptions: {
      skipBackup: true, path: "images",
    },
  };

  showPicker(options, callback);

};

const videoPicker = callback => {
  let options = {
    title: "Selecione um vídeo",
    mediaType: "video",
    takePhotoButtonTitle: "Grave um vídeo",
    chooseFromLibraryButtonTitle: "Escolha da galeria",
    videoQuality: "low",
    storageOptions: {
      skipBackup: true, path: "images",
    },
  };

  showPicker(options, callback);

};

export { videoPicker, imagePicker };
