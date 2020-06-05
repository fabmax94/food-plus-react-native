import React, {useState, useContext} from 'react';
import {StyleSheet} from 'react-native';
import {
  Container,
  Header,
  Left,
  Body,
  Title,
  Button,
  Icon,
  Text,
  Content,
  Right,
} from 'native-base';
import Form from '../components/Form';
import {FirebaseService, PathRecipe} from '../services/FirebaseService';
import {ContextAuth} from '../contexts/authContext';

const NewRecipe = ({navigation}) => {
  const {auth} = useContext(ContextAuth);
  const [state, setState] = useState({
    name: '',
    description: '',
    ingredients: [],
    steps: [],
    image: '',
  });

  const onSave = () => {
    state.author = auth.userToken;
    state.avatar = auth.avatar;
    if (state.image) {
      FirebaseService.pushFile(state.image, url => {
        state.image = url;
        FirebaseService.pushData(PathRecipe, state);
      });
    } else {
      FirebaseService.pushData(PathRecipe, state);
    }

    navigation.goBack();
  };

  return (
    <Container style={styles.container}>
      <Header androidStatusBarColor="#ef3e5c" style={styles.header}>
        <Left>
          <Button transparent onPress={navigation.goBack}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Nova Receita</Title>
        </Body>
        <Right />
      </Header>
      <Content style={styles.content}>
        <Form recipe={state} onChangeRecipe={recipe => setState(recipe)} />
        <Button onPress={onSave} full rounded style={styles.btnSave}>
          <Text style={{color: 'white'}}>Salvar</Text>
        </Button>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ecedf3',
  },
  content: {
    padding: 10,
  },
  btnSave: {
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: '#415a6b',
  },
  header: {
    backgroundColor: '#ef3e5c',
  },
});

export default NewRecipe;
