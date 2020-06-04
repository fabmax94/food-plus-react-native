import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Alert,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  Container,
  Header,
  Left,
  Body,
  Title,
  Icon,
  View,
  Fab,
  Text,
  Content,
  Card,
  CardItem,
} from 'native-base';
import {SwipeListView} from 'react-native-swipe-list-view';
import FastImage from 'react-native-fast-image';
import {FirebaseService, PathRecipe} from '../services/FirebaseService';

const ListRecipe = ({navigation}) => {
  const [recipeList, setRecipeList] = useState([]);
  useEffect(() => {
    FirebaseService.getDataList(PathRecipe, result => {
      setRecipeList(result);
    });
  }, []);

  const onHandleDelete = key =>
    Alert.alert(
      'Deletar Receita',
      'Você tem certeza que quer deletar a receita?',
      [
        {
          text: 'Não',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: () => FirebaseService.popData(PathRecipe, {key: key}),
        },
      ],
      {cancelable: false},
    );
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
            <TouchableWithoutFeedback
              onPress={() => {
                rowMap[data.item.key].closeRow();
                navigation.navigate('DetailRecipe', data.item);
              }}>
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
                      <FastImage
                        source={{uri: data.item.image}}
                        style={styles.image}
                      />
                    </CardItem>
                  ) : null}
                </Card>
              </View>
            </TouchableWithoutFeedback>
          )}
          renderHiddenItem={(data, rowMap) => (
            <View style={styles.rowBack}>
              <TouchableOpacity
                style={[styles.editBtn, styles.rowBtn]}
                onPress={() => {
                  rowMap[data.item.key].closeRow();
                  navigation.navigate('EditRecipe', data.item);
                }}>
                <Text style={styles.textBtn}>Editar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.deleteBtn, styles.rowBtn]}
                onPress={() => onHandleDelete(data.item.key)}>
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
