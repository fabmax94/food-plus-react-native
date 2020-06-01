import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {
  Container,
  Header,
  Left,
  Right,
  Body,
  Title,
  Button,
  Icon,
  View,
  Fab,
  Text,
  Content,
  Card,
  CardItem,
} from 'native-base';
import {SwipeListView} from 'react-native-swipe-list-view';
import {FirebaseService, PathRecipe} from '../services/FirebaseService';

const ListRecipe = ({navigation}) => {
  const [recipeList, setRecipeList] = useState([]);
  useEffect(() => {
    FirebaseService.getDataList(PathRecipe, result => {
      setRecipeList(result);
    });
  }, []);
  return (
    <Container>
      <Header androidStatusBarColor="#573ea8" style={styles.header}>
        <Body>
          <Title>Food Plus</Title>
        </Body>
      </Header>
      <Content>
        <SwipeListView
          data={recipeList}
          renderItem={(data, rowMap) => (
            <View style={styles.rowFront}>
              <Card key={data.item.key}>
                <CardItem>
                  <Left>
                    <Body>
                      <Text>{data.item.name}</Text>
                      <Text note>Fabio Alexandre</Text>
                    </Body>
                  </Left>
                </CardItem>
                {data.item.image ? (
                  <CardItem cardBody>
                    <Image
                      source={{uri: data.item.image}}
                      style={styles.image}
                    />
                  </CardItem>
                ) : null}
                <CardItem>
                  <Left>
                    <Button transparent>
                      <Icon active name="thumbs-up" />
                      <Text>0</Text>
                    </Button>
                  </Left>
                  <Body>
                    <Button transparent>
                      <Icon active name="chatbubbles" />
                      <Text>0</Text>
                    </Button>
                  </Body>
                  <Right>
                    <Text note>05/05/2020</Text>
                  </Right>
                </CardItem>
              </Card>
            </View>
          )}
          renderHiddenItem={(data, rowMap) => (
            <View style={styles.rowBack}>
              <TouchableOpacity style={[styles.editBtn, styles.rowBtn]}>
                <Text style={styles.textBtn}>Editar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.deleteBtn, styles.rowBtn]}>
                <Text style={styles.textBtn}>Deletar</Text>
              </TouchableOpacity>
            </View>
          )}
          leftOpenValue={75}
          rightOpenValue={-75}
        />
      </Content>
      <Fab
        direction="up"
        position="bottomRight"
        onPress={() => navigation.navigate('NewRecipe')}
        style={styles.fab}>
        <Icon type="FontAwesome" name="plus" />
      </Fab>
    </Container>
  );
};

const styles = StyleSheet.create({
  fab: {
    backgroundColor: '#7159C1',
  },
  image: {
    height: 200,
    width: null,
    flex: 1,
  },
  tabHeading: {
    backgroundColor: '#7159C1',
  },
  header: {
    backgroundColor: '#7159C1',
  },
  container: {
    flex: 1,
  },
  rowBack: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 15,
  },
  rowBtn: {
    alignItems: 'center',
    bottom: 5,
    justifyContent: 'center',
    position: 'absolute',
    top: 5,
    width: 75,
  },
  editBtn: {
    backgroundColor: 'blue',
    left: 5,
  },
  deleteBtn: {
    backgroundColor: '#ff0000',
    right: 5,
  },
  textBtn: {
    color: '#FFF',
  },
});

export default ListRecipe;
