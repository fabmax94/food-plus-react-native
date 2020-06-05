import React from 'react';
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
import ChooseImage from '../utils/ChooseImage';

const Form = ({recipe, onChangeRecipe}) => {
  return (
    <Content>
      <Label style={styles.label}>Nome</Label>
      <Item regular style={{backgroundColor: 'white'}}>
        <Input
          value={recipe.name}
          onChangeText={name => {
            onChangeRecipe({...recipe, name});
          }}
          style={styles.inputColor}
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
        style={styles.textarea}
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
        <Image source={{uri: recipe.image}} style={styles.img} />
      ) : (
        <Text style={styles.empty}>Nenhuma Imagem</Text>
      )}

      <View style={styles.viewBtn}>
        <Button
          onPress={() =>
            ChooseImage(image => onChangeRecipe({...recipe, image}))
          }
          bordered
          rounded
          style={styles.btn}>
          <Icon name="image" type="FontAwesome" style={styles.textBtn} />
          <Text style={styles.textBtn}>Escolha uma foto</Text>
        </Button>
      </View>
    </Content>
  );
};

const styles = StyleSheet.create({
  empty: {
    alignSelf: 'center',
    color: '#4d4e52',
  },
  img: {
    height: 100,
    width: 100,
    flex: 1,
    alignSelf: 'center',
  },
  textBtn: {color: '#ef3e5c'},
  inputColor: {color: '#4d4e52'},
  textarea: {
    backgroundColor: 'white',
    color: '#4d4e52',
  },
  label: {
    marginTop: 10,
    color: '#4d4e52',
  },
  btn: {borderColor: '#ef3e5c'},
  viewBtn: {
    alignSelf: 'flex-end',
    marginTop: 20,
  },
});

export default Form;
