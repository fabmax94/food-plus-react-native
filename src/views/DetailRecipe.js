import React, {useState} from 'react';
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
import ListItems from '../components/ListItems';
const DetailRecipe = ({navigation, route}) => {
  const [state, setState] = useState({
    key: route.params.key,
    name: route.params.name,
    description: route.params.description,
    ingredients: route.params.ingredients ?? [],
    steps: route.params.steps ?? [],
    image: route.params.image,
  });
  const onShare = async () => {
    let ingredients = '';
    let steps = '';
    if (state.ingredients.length) {
      ingredients =
        '*Ingredientes*:\n' +
        state.ingredients
          .map(
            item =>
              `* ${item}${
                state.ingredients.indexOf(item) == state.ingredients.length - 1
                  ? '.'
                  : ';'
              }`,
          )
          .join('\n');
    }
    if (state.steps.length) {
      steps =
        '*Passos*:\n' +
        state.steps
          .map(
            item =>
              `* ${item}${
                state.steps.indexOf(item) == state.steps.length - 1 ? '.' : ';'
              }`,
          )
          .join('\n');
    }
    let message = `*${state.name}*\n\n${
      state.description
    }\n\n${ingredients}\n\n${steps}`;
    try {
      const result = await Share.share({
        title: state.name,
        message: message,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <Container>
      <ScrollView>
        <FastImage source={{uri: state.image}} style={styles.image}>
          <Header
            androidStatusBarColor="transparent"
            style={{
              height: 100,
            }}
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
        <Content>
          <Card>
            <CardItem>
              <Content>
                <View style={{flex: 1, alignSelf: 'center'}}>
                  <Text style={styles.title}>{state.name}</Text>
                </View>
                <Text
                  style={{
                    marginTop: 10,
                    color: '#4d4e52',
                    textAlign: 'justify',
                  }}>
                  {state.description}
                </Text>
              </Content>
            </CardItem>
          </Card>
          <Card>
            <CardItem cardBody>
              <ListItems list={state.ingredients} title={'Ingredientes'} />
            </CardItem>
          </Card>
          <Card>
            <CardItem cardBody>
              <ListItems list={state.steps} title={'Passos'} />
            </CardItem>
          </Card>
        </Content>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
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
});

export default DetailRecipe;
