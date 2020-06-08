import React from 'react';
import {StyleSheet, ScrollView, Share} from 'react-native';
import {
  Container,
  Header,
  Left,
  Body,
  Button,
  Icon,
  Text,
  Content,
  CardItem,
  Card,
  View,
  Right,
} from 'native-base';
import FastImage from 'react-native-fast-image';
import DetailItems from '../components/DetailItems';

const DetailRecipe = ({navigation, route}) => {
  const recipe = {
    key: route.params.key,
    name: route.params.name,
    description: route.params.description,
    ingredients: route.params.ingredients ?? [],
    steps: route.params.steps ?? [],
    image: route.params.image,
  };

  const onShare = async () => {
    let ingredients = '';
    let steps = '';
    if (recipe.ingredients.length) {
      ingredients =
        '*Ingredientes*:\n' +
        recipe.ingredients
          .map(
            item =>
              `* ${item}${
                recipe.ingredients.indexOf(item) ==
                recipe.ingredients.length - 1
                  ? '.'
                  : ';'
              }`,
          )
          .join('\n');
    }

    if (recipe.steps.length) {
      steps =
        '*Passos*:\n' +
        recipe.steps
          .map(
            item =>
              `* ${item}${
                recipe.steps.indexOf(item) == recipe.steps.length - 1
                  ? '.'
                  : ';'
              }`,
          )
          .join('\n');
    }

    let message = `*${recipe.name}*\n\n${
      recipe.description
    }\n\n${ingredients}\n\n${steps}`;
    try {
      await Share.share({
        title: recipe.name,
        message: message,
      });
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <Container style={styles.container}>
      <ScrollView>
        {recipe.image ? (
          <FastImage source={{uri: recipe.image}} style={styles.image}>
            <Header
              androidStatusBarColor="transparent"
              style={styles.headerImage}
              transparent>
              <Left>
                <Button transparent onPress={navigation.goBack}>
                  <Icon name="arrow-back" />
                </Button>
              </Left>
              <Body />
              <Right>
                <Button transparent onPress={onShare}>
                  <Icon name="share" />
                </Button>
              </Right>
            </Header>
          </FastImage>
        ) : (
          <Header androidStatusBarColor="#ef3e5c" style={styles.header}>
            <Left>
              <Button transparent onPress={navigation.goBack}>
                <Icon name="arrow-back" />
              </Button>
            </Left>
            <Body />
            <Right>
              <Button transparent onPress={onShare}>
                <Icon name="share" />
              </Button>
            </Right>
          </Header>
        )}

        <Content>
          <Card>
            <CardItem>
              <Content>
                <View style={styles.viewTitle}>
                  <Text style={styles.title}>{recipe.name}</Text>
                </View>
                {recipe.description ? (
                  <Text style={styles.description}>{recipe.description}</Text>
                ) : null}
              </Content>
            </CardItem>
          </Card>
          <Card>
            <CardItem cardBody>
              <DetailItems list={recipe.ingredients} title={'Ingredientes'} />
            </CardItem>
          </Card>
          <Card>
            <CardItem cardBody>
              <DetailItems list={recipe.steps} title={'Passos'} />
            </CardItem>
          </Card>
        </Content>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {backgroundColor: '#ecedf3'},
  headerImage: {
    height: 100,
  },
  viewTitle: {
    flex: 1,
    alignSelf: 'center',
  },
  description: {
    marginTop: 10,
    color: '#4d4e52',
    textAlign: 'justify',
  },
  title: {
    fontSize: 20,
    textTransform: 'uppercase',
    color: '#777777',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  content: {
    margin: 0,
    padding: 0,
  },
  btnSave: {
    marginTop: 20,
  },
  image: {
    height: 200,
    width: null,
    resizeMode: 'cover',
    margin: 0,
  },
  header: {
    backgroundColor: '#ef3e5c',
  },
});

export default DetailRecipe;
