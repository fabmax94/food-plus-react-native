import {Alert} from 'react-native';

const AlertDialog = (title, message, callback) =>
  Alert.alert(
    title,
    message,
    [
      {
        text: 'Não',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Sim',
        onPress: callback,
      },
    ],
    {cancelable: false},
  );

export default AlertDialog;
