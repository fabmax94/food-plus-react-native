import React from 'react';
import ImagePicker from 'react-native-image-picker';
import {StyleSheet, Image} from 'react-native';
import {
  Label,
  Item,
  Input,
  Button,
  Icon,
  Text,
  Content,
  View,
  Textarea,
} from 'native-base';
import FormItems from './FormItems';
const Form = ({recipe, onChangeRecipe}) => {
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
        let image = response.uri;
        onChangeRecipe({...recipe, image});
      }
    });
  };
  return (
    <Content>
      <Label style={{color: '#4d4e52'}}>Nome</Label>
      <Item regular>
        <Input
          value={recipe.name}
          onChangeText={name => {
            onChangeRecipe({...recipe, name});
          }}
          style={{color: '#4d4e52'}}
        />
      </Item>
      <Label style={styles.label}>Descrição</Label>
      <Textarea
        rowSpan={5}
        bordered
        value={recipe.description}
        onChangeText={description => {
          onChangeRecipe({...recipe, description});
        }}
        style={{color: '#4d4e52'}}
      />
      <Label style={styles.label}>Ingredientes</Label>
      <FormItems
        items={recipe.ingredients}
        placeholder={'Ingrediente'}
        onChange={ingredients => {
          onChangeRecipe({...recipe, ingredients});
        }}
      />
      <Label style={styles.label}>Passos</Label>
      <FormItems
        items={recipe.steps}
        placeholder={'Passo'}
        onChange={steps => {
          onChangeRecipe({...recipe, steps});
        }}
      />
      <Label style={styles.label}>Foto</Label>
      {recipe.image ? (
        <Image
          source={{uri: recipe.image}}
          style={{height: 100, width: 100, flex: 1, alignSelf: 'center'}}
        />
      ) : (
        <Text style={{alignSelf: 'center', color: '#4d4e52'}}>Nenhuma Imagem</Text>
      )}

      <View style={{alignSelf: 'flex-end', marginTop: 20}}>
        <Button
          onPress={chooseImage}
          bordered
          rounded
          style={{borderColor: '#ef3e5c'}}>
          <Icon name="image" type="FontAwesome" style={{color: '#ef3e5c'}} />
          <Text style={{color: '#ef3e5c'}}>Escolha uma foto</Text>
        </Button>
      </View>
    </Content>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
  label: {
    marginTop: 10,
    color: '#4d4e52',
  },
});

export default Form;
