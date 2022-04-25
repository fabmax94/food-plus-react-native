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

  const onSave = recipe => {
    recipe.author = auth.userToken;
    recipe.avatar = auth.avatar;
    if (recipe.image) {
      FirebaseService.pushFile(recipe.image, url => {
        recipe.image = url;
        FirebaseService.pushData(PathRecipe, recipe);
      });
    } else {
      FirebaseService.pushData(PathRecipe, recipe);
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
        <Form onHandleSave={onSave} />
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
