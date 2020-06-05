import React, {useEffect, useState, useContext} from 'react';
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
  Right,
  Body,
  Title,
  Icon,
  View,
  Fab,
  Text,
  Content,
  Card,
  CardItem,
  Spinner,
  Thumbnail,
  Item,
  Input,
  Form,
} from 'native-base';
import {SwipeListView} from 'react-native-swipe-list-view';
import FastImage from 'react-native-fast-image';
import {FirebaseService, PathRecipe} from '../services/FirebaseService';
import {ContextAuth} from '../contexts/authContext';

const ListRecipe = ({navigation}) => {
  const {auth, signOut} = useContext(ContextAuth);
  const [recipeList, setRecipeList] = useState([]);
  const [recipeFilter, setRecipeFilter] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  useEffect(() => {
    FirebaseService.getDataList(PathRecipe, result => {
      setRecipeList(result);
      setRecipeFilter(result);
      setIsLoading(false);
    });
  }, []);

  const onHandleEdit = item => {
    if (item.author === auth.userToken) {
      navigation.navigate('EditRecipe', item);
    } else {
      alert('Somente o autor da receita pode edita-lá');
    }
  };
  const onHandleDelete = item => {
    if (item.author === auth.userToken) {
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
            onPress: () => FirebaseService.popData(PathRecipe, {key: item.key}),
          },
        ],
        {cancelable: false},
      );
    } else {
      alert('Somente o autor da receita pode deleta-lá');
    }
  };

  const onSignOut = () => {
    Alert.alert(
      'Sair',
      'Você deseja se desconectar?',
      [
        {
          text: 'Não',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: signOut,
        },
      ],
      {cancelable: false},
    );
  };

  const onSearch = e =>
    setRecipeFilter(
      recipeList.filter(
        item =>
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.author.toLowerCase().includes(search.toLowerCase()) ||
          item.description.toLowerCase().includes(search.toLowerCase()),
      ),
    );

  return (
    <Container>
      <Header androidStatusBarColor="#ef3e5c" style={styles.header}>
        <Body>
          <Title>Food Plus</Title>
        </Body>
        <Right>
          <TouchableOpacity onPress={onSignOut}>
            <Icon name="sign-in" type="FontAwesome" style={{color: 'white'}} />
          </TouchableOpacity>
        </Right>
      </Header>
      <Content>
        {isLoading ? (
          <Spinner color={'#ef3e5c'} />
        ) : (
          <Form style={{marginTop: 10}}>
            <Item rounded style={{borderColor: '#415a6b'}}>
              <Icon
                name={'search'}
                type="FontAwesome"
                style={{color: '#415a6b'}}
              />
              <Input
                placeholder={'Pesquisar'}
                style={{color: '#415a6b'}}
                value={search}
                onChangeText={text => setSearch(text)}
                onSubmitEditing={onSearch}
              />
            </Item>
          </Form>
        )}

        <SwipeListView
          data={recipeFilter}
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
                      {data.item.avatar ? (
                        <Thumbnail
                          source={{
                            uri: data.item.avatar,
                          }}
                        />
                      ) : (
                        <Icon
                          name="user-secret"
                          type="FontAwesome"
                          style={{color: '#415a6b'}}
                        />
                      )}
                      <Body>
                        <Text
                          style={{
                            fontSize: 15,
                            textTransform: 'uppercase',
                            color: '#777777',
                            fontWeight: 'bold',
                          }}>
                          {data.item.name}
                        </Text>
                        <Text note>{data.item.author}</Text>
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
                  onHandleEdit(data.item);
                }}>
                <Text style={styles.textBtn}>Editar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.deleteBtn, styles.rowBtn]}
                onPress={() => onHandleDelete(data.item)}>
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
    backgroundColor: '#ef3e5c',
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
    backgroundColor: '#ef3e5c',
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
    backgroundColor: '#68e1f8',
    left: 5,
  },
  deleteBtn: {
    backgroundColor: '#f1726e',
    right: 5,
  },
  textBtn: {
    color: '#FFF',
  },
});

export default ListRecipe;
