import React, {useEffect, useState} from 'react';
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

const initState = {
  name: '',
  description: '',
  ingredients: [],
  steps: [],
  image: '',
  ingredientsText: '',
  stepsText: '',
};
const Form = ({initRecipe, onHandleSave}) => {
  const [recipe, setRecipe] = useState({...initState, ...initRecipe});

  return (
    <>
      <Content>
        <Label style={styles.label}>Nome</Label>
        <Item regular style={{backgroundColor: 'white'}}>
          <Input
            value={recipe.name}
            onChangeText={name => {
              setRecipe({...recipe, name});
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
            setRecipe({...recipe, description});
          }}
          style={styles.textarea}
        />
        <Label style={styles.label}>Ingredientes</Label>
        <FormItems
          itemText={recipe.ingredientsText}
          items={recipe.ingredients}
          placeholder={'Ingrediente'}
          onChangeList={ingredients => {
            setRecipe({...recipe, ingredients});
          }}
          onChange={(ingredients, ingredientsText) => {
            setRecipe({...recipe, ingredients, ingredientsText});
          }}
        />
        <Label style={styles.label}>Passos</Label>
        <FormItems
          itemText={recipe.stepsText}
          items={recipe.steps}
          placeholder={'Passo'}
          onChangeList={steps => {
            setRecipe({...recipe, steps});
          }}
          onChange={(steps, stepsText) => {
            setRecipe({...recipe, steps, stepsText});
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
            onPress={() => ChooseImage(image => setRecipe({...recipe, image}))}
            bordered
            rounded
            style={styles.btn}>
            <Icon name="image" type="FontAwesome" style={styles.textBtn} />
            <Text style={styles.textBtn}>Escolha uma foto</Text>
          </Button>
        </View>
      </Content>
      <Button
        onPress={() => onHandleSave(recipe)}
        full
        rounded
        style={styles.btnSave}>
        <Text style={{color: 'white'}}>Salvar</Text>
      </Button>
    </>
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
  btnSave: {
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: '#415a6b',
  },
});

export default Form;
