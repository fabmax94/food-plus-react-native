import React, {useState, useContext} from 'react';
import {StyleSheet} from 'react-native';
import {
  Content,
  Form,
  Item,
  Container,
  Input,
  Button,
  Text,
  Icon,
} from 'native-base';
import {ContextAuth} from '../contexts/authContext';

const SigIn = () => {
  const {signIn, auth} = useContext(ContextAuth);
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  });
  return auth.isLoading ? null : (
    <Container>
      <Content style={style.content}>
        <Form>
          <Item>
            <Icon active name={'person'} />
            <Input
              placeholder={'Nome'}
              value={data.name}
              onChangeText={name => setData({...data, name})}
            />
          </Item>
          <Item>
            <Icon active name={'mail'} />
            <Input
              placeholder={'Email'}
              value={data.email}
              keyboardType={'email-address'}
              onChangeText={email => setData({...data, email})}
            />
          </Item>
          <Item>
            <Icon active name={'key'} />
            <Input
              placeholder={'Password'}
              value={data.password}
              password
              onChangeText={password => setData({...data, password})}
            />
          </Item>
        </Form>
        <Button success full style={style.btn} onPress={() => signIn(data)}>
          <Text>Entrar ou Cadastrar</Text>
        </Button>
      </Content>
    </Container>
  );
};

const style = StyleSheet.create({
  content: {
    padding: 10,
  },
  btn: {
    marginTop: 30,
  },
});

export default SigIn;
