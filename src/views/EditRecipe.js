import React, {useState, useContext, useEffect} from 'react';
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

const EditRecipe = ({navigation, route}) => {
  const {auth} = useContext(ContextAuth);
  const [state, setState] = useState({
    key: route.params.key,
    name: route.params.name,
    description: route.params.description,
    ingredients: route.params.ingredients ?? [],
    steps: route.params.steps ?? [],
    image: route.params.image,
    author: route.params.author,
    avatar: route.params.avatar,
  });
  const onEdit = () => {
    state.author = auth.userToken;
    state.avatar = auth.avatar;
    if (state.image && !state.image.includes('http')) {
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
    <Container>
      <Header androidStatusBarColor="#ef3e5c" style={styles.header}>
        <Left>
          <Button transparent onPress={navigation.goBack}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Editar Receita</Title>
        </Body>
        <Right />
      </Header>
      <Content style={styles.content}>
        <Form recipe={state} onChangeRecipe={recipe => setState(recipe)} />
        <Button onPress={onEdit} full rounded style={styles.btnSave}>
          <Text style={{color: 'white'}}>Salvar</Text>
        </Button>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
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

export default EditRecipe;
