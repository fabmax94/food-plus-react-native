import React, { useState, useContext } from "react";
import { StyleSheet } from "react-native";
import {
  Content,
  Form,
  Item,
  Container,
  Input,
  Button,
  Text,
  Icon,
  Header,
  View,
  Thumbnail, Spinner,
} from "native-base";
import FastImage from "react-native-fast-image";
import { ContextAuth } from "../contexts/auth";
import { imagePicker } from "../utils/media-picker";

const SigIn = () => {
  const { signIn, auth, isLoadingSignIn } = useContext(ContextAuth);
  const [data, setData] = useState({
    name: "",
    avatar: "",
  });
  return auth.isLoading || auth.userToken ? null : (
    <Container style={styles.container}>
      <Header androidStatusBarColor="#ecedf3" transparent />
      <Content style={styles.content}>
        <FastImage
          source={require("../assets/app_icon.png")}
          style={styles.logo}
        />
        <View>
          <Text style={styles.title}>Receitas com Amor</Text>
        </View>
        <Form style={styles.form}>
          <Item rounded style={styles.itemForm}>
            <Icon active name={"person"} style={styles.icon} />
            <Input
              placeholder={"Nome"}
              style={styles.icon}
              value={data.name}
              onChangeText={name => setData({ ...data, name })}
            />
          </Item>
        </Form>
        <View style={styles.viewBtn}>
          <Button
            bordered
            rounded
            style={styles.itemForm}
            onPress={() => imagePicker(avatar => setData({ ...data, avatar }))}>
            <Text style={styles.icon}>Escolha seu avatar</Text>
            {data.avatar ? (
              <Thumbnail
                style={styles.thumbnail}
                source={{
                  uri: data.avatar,
                }}
              />
            ) : (
              <Icon name="image" type="FontAwesome" style={styles.icon} />
            )}
          </Button>
          <Button rounded light style={styles.btn} onPress={() => signIn(data)}>
            {isLoadingSignIn ? (
              <Spinner color={"#ffffff"} style={{ marginHorizontal: 10 }} />
            ) : (
              <Icon
                name="arrow-right"
                type="FontAwesome"
                style={styles.iconArrow}
              />
            )}
          </Button>
        </View>
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
  btn: {
    backgroundColor: "#415a6b",
    alignSelf: "center",
  },
  logo: {
    width: 200,
    height: 200,
    alignSelf: "center",
    marginTop: 20,
  },
  form: { marginTop: 50 },
  itemForm: { borderColor: "#415a6b" },
  icon: { color: "#415a6b" },
  viewBtn: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  thumbnail: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  iconArrow: {
    color: "white",
  },
  title: {
    fontSize: 21,
    textTransform: "uppercase",
    color: "#ef3e5c",
    alignSelf: "center",
    fontWeight: "bold",
    marginTop: 20,
  },
});

export default SigIn;
