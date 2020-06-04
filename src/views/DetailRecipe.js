import React, {useState} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
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
} from 'native-base';
import FastImage from 'react-native-fast-image';
import ListItems from '../components/ListItems';
const DetailRecipe = ({navigation, route}) => {
  const [state, setState] = useState({
    key: route.params.key,
    name: route.params.name,
    ingredients: route.params.ingredients ?? [],
    steps: route.params.steps ?? [],
    image: route.params.image,
  });
  console.log(route.params.image);
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
          </Header>
        </FastImage>
        <Content>
          <Card>
            <CardItem>
              <Content>
                <View style={{flex: 1, alignSelf: 'flex-start'}}>
                  <Text style={styles.title}>{state.name}</Text>
                </View>
                <Text style={{marginTop: 10, color: '#4d4e52'}}>
                  Esta receita dá pra 3 pessoas, lembrando que no preparo
                  tradicional não conterá os ingredientes de receita clássico.
                  Ela em geral dá pra 3 pessoas, mas se duplicar os ingredientes
                  dá pra mais.
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
