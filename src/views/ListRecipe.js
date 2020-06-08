import React, {useEffect, useContext, useReducer} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
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
import {listReducer} from '../reducers/listReducer';
import AlertDialog from '../utils/AlertDialog';

const ListRecipe = ({navigation}) => {
  const {auth, signOut} = useContext(ContextAuth);

  const [state, dispatch] = useReducer(listReducer, {
    recipeList: [],
    recipeFilter: [],
    isLoading: true,
    search: '',
  });

  useEffect(() => {
    FirebaseService.getDataList(PathRecipe, result => {
      dispatch({type: 'SET_LIST', recipeList: result, recipeFilter: result});
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
      AlertDialog(
        'Deletar Receita',
        'Você tem certeza que quer deletar a receita?',
        () => FirebaseService.popData(PathRecipe, {key: item.key}),
      );
    } else {
      alert('Somente o autor da receita pode deleta-lá');
    }
  };

  const onSignOut = () =>
    AlertDialog('Sair', 'Você deseja se desconectar?', signOut);

  const onSearch = e =>
    dispatch({
      type: 'SET_LIST',
      recipeList: state.recipeList,
      recipeFilter: state.recipeList.filter(
        item =>
          item.name.toLowerCase().includes(state.search.toLowerCase()) ||
          item.author.toLowerCase().includes(state.search.toLowerCase()) ||
          item.description.toLowerCase().includes(state.search.toLowerCase()),
      ),
    });

  return (
    <Container style={styles.container}>
      <Header androidStatusBarColor="#ef3e5c" style={styles.header}>
        <Left style={{flex: 1}}>
          <Thumbnail small source={require('../assets/app_icon.png')} />
        </Left>
        <Body style={{flex: 4}}>
          <Title>Receitas com Amor</Title>
        </Body>
        <Right style={{flex: 1}}>
          <TouchableOpacity onPress={onSignOut}>
            <Icon name="sign-in" type="FontAwesome" style={styles.signOutBtn} />
          </TouchableOpacity>
        </Right>
      </Header>
      <Content style={styles.content}>
        {state.isLoading ? (
          <Spinner color={'#ef3e5c'} />
        ) : (
          <Form style={styles.form}>
            <Item rounded style={styles.formItem}>
              <Icon name={'search'} type="FontAwesome" style={styles.icon} />
              <Input
                placeholder={'Pesquisar'}
                style={styles.icon}
                value={state.search}
                onChangeText={search => dispatch({type: 'SET_SEARCH', search})}
                onSubmitEditing={onSearch}
              />
            </Item>
          </Form>
        )}

        <SwipeListView
          data={state.recipeFilter}
          renderItem={(data, rowMap) => (
            <TouchableWithoutFeedback
              onPress={() => {
                rowMap[data.item.key].closeRow();
                navigation.navigate('DetailRecipe', data.item);
              }}>
              <View>
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
                        <Text style={styles.title}>{data.item.name}</Text>
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
          rightOpenValue={-80}
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
  container: {backgroundColor: '#ecedf3'},
  content: {padding: 5},
  form: {marginTop: 10},
  formItem: {borderColor: '#415a6b', backgroundColor: 'white'},
  icon: {color: '#415a6b'},
  title: {
    fontSize: 15,
    textTransform: 'uppercase',
    color: '#777777',
    fontWeight: 'bold',
  },
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
    width: 80,
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
  signOutBtn: {color: 'white'},
});

export default ListRecipe;
