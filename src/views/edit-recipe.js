import React, { useContext, useState } from "react";
import { StyleSheet } from "react-native";
import {
  Container,
  Header,
  Left,
  Body,
  Title,
  Button,
  Icon,
  Content,
  Right,
} from "native-base";
import Form from "../components/form";
import { FirebaseService, PathRecipe } from "../services/firebase-service";
import { ContextAuth } from "../contexts/auth";
import useBackAlert from "../hooks/back-alert";

const EditRecipe = ({ navigation, route }) => {
  const { auth } = useContext(ContextAuth);
  const [isLoading, setIsLoading] = useState(false);
  const { backAction } = useBackAlert(navigation);

  const initRecipe = {
    key: route.params.key,
    name: route.params.name,
    description: route.params.description,
    ingredients: route.params.ingredients ?? [],
    steps: route.params.steps ?? [],
    image: route.params.image,
    author: route.params.author,
    avatar: route.params.avatar,
    gallery: route.params.gallery,
  };


  const onEdit = async recipe => {
    setIsLoading(true);
    recipe.author = auth.userToken;
    recipe.avatar = auth.avatar;
    if (recipe.gallery.length) {
      const newMedias = recipe.gallery.filter(item => item.media.includes("http"));
      for (let item of recipe.gallery.filter(item => !item.media.includes("http"))) {
        const url = await FirebaseService.pushFile(item.media, item.type);
        if (item.media === recipe.image) {
          recipe.image = url;
        }
        newMedias.push({
          type: item.type,
          media: url,
        });
      }
      recipe.gallery = newMedias;
      FirebaseService.pushData(PathRecipe, recipe);
    } else {
      FirebaseService.pushData(PathRecipe, recipe);
    }
    setIsLoading(false);
    navigation.goBack();
  };

  return (
    <Container style={styles.container}>
      <Header androidStatusBarColor="#ef3e5c" style={styles.header}>
        <Left>
          <Button transparent onPress={backAction}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Editar Receita</Title>
        </Body>
        <Right />
      </Header>
      <Content style={styles.content}>
        <Form isLoading={isLoading} initRecipe={initRecipe} onHandleSave={onEdit} />
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ecedf3",
  },
  content: {
    padding: 10,
  },
  btnSave: {
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: "#415a6b",
  },
  header: {
    backgroundColor: "#ef3e5c",
  },
});

export default EditRecipe;
