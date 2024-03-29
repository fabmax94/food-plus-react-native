import React, { useState } from "react";
import { StyleSheet, FlatList, TouchableOpacity } from "react-native";
import {
  Label,
  Item,
  Input,
  Button,
  Icon,
  Text,
  Content,
  View,
  Textarea, Spinner,
} from "native-base";
import Video from "react-native-video";
import FastImage from "react-native-fast-image";

import FormItems from "./form-items";
import AlertDialog from "../utils/alert-dialog";
import { imagePicker, videoPicker } from "../utils/media-picker";

const initState = {
  name: "",
  description: "",
  ingredients: [],
  steps: [],
  image: "",
  ingredientsText: "",
  stepsText: "",
  gallery: [],
};
const Form = ({ initRecipe, onHandleSave, isLoading }) => {
  const [recipe, setRecipe] = useState({ ...initState, ...initRecipe });

  const removeMedia = (item) => {
    const newGallery = recipe.gallery.filter(media => media !== item);
    setRecipe({ ...recipe, gallery: newGallery });
  };
  return (
    <>
      <Content>
        <Label style={styles.label}>Nome</Label>
        <Item regular style={{ backgroundColor: "white" }}>
          <Input
            value={recipe.name}
            onChangeText={name => {
              setRecipe({ ...recipe, name });
            }}
            style={styles.inputColor}
          />
        </Item>
        <Label style={styles.label}>Descrição</Label>
        <Textarea
          rowSpan={5}
          bordered
          value={recipe.description}
          onChangeText={description => {
            setRecipe({ ...recipe, description });
          }}
          style={styles.textarea}
        />
        <Label style={styles.label}>Ingredientes</Label>
        <FormItems
          itemText={recipe.ingredientsText}
          items={recipe.ingredients}
          placeholder={"Ingrediente"}
          onChange={(ingredients, ingredientsText) => {
            setRecipe({ ...recipe, ingredients, ingredientsText });
          }}
        />
        <Label style={styles.label}>Passos</Label>
        <FormItems
          itemText={recipe.stepsText}
          items={recipe.steps}
          placeholder={"Passo"}
          onChange={(steps, stepsText) => {
            setRecipe({ ...recipe, steps, stepsText });
          }}
        />
        <Label style={styles.label}>Galeria</Label>
        {recipe.gallery?.length ? (
          <FlatList
            data={recipe.gallery}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.img}
                onPress={() => {
                  if (item.type !== "video") {
                    setRecipe({ ...recipe, image: item.media });
                  }
                }}
                onLongPress={() => {
                  AlertDialog("Deletar", "Você deseja deletar está media?", () => removeMedia(item));
                }}>
                {item.type === "video" ? (
                  <Video repeat resizeMode={"cover"} source={{ uri: item.media }} style={styles.img} />
                ) : (
                  <FastImage source={{ uri: item.media }}
                             style={{ ...styles.img, ...(item.media === recipe.image ? styles.mediaSelected : {}) }} />
                )}
              </TouchableOpacity>
            )}
            numColumns={3}
            keyExtractor={(item, index) => index}
          />

        ) : (
          <Text style={styles.empty}>Nenhuma Imagem</Text>
        )}

        <View style={styles.viewBtn}>
          <Button
            onPress={() => videoPicker(video => {
              const gallery = [...recipe.gallery, { type: "video", media: video }];
              setRecipe({ ...recipe, gallery });
            })}
            bordered
            rounded
            style={{ ...styles.btn, marginRight: 10 }}>
            <Icon name="film" type="FontAwesome" style={styles.textBtn} />
            <Text style={styles.textBtn}>Video</Text>
          </Button>
          <Button
            onPress={() => imagePicker(image => {
              const gallery = [...recipe.gallery, { type: "photo", media: image }];
              let newRecipe = { ...recipe, gallery };
              if (!recipe.image) {
                newRecipe = { ...newRecipe, image: gallery[0].media };
              }
              setRecipe(newRecipe);
            })}
            bordered
            rounded
            style={styles.btn}>
            <Icon name="image" type="FontAwesome" style={styles.textBtn} />
            <Text style={styles.textBtn}>Foto</Text>
          </Button>
        </View>
      </Content>
      <Button
        disabled={isLoading}
        onPress={() => onHandleSave(recipe)}
        full
        rounded
        style={styles.btnSave}>
        {isLoading ? (<Spinner color={"white"} />) : null}
        <Text style={{ color: "white" }}>Salvar</Text>
      </Button>
    </>
  );
};

const styles = StyleSheet.create({
  empty: {
    alignSelf: "center",
    color: "#4d4e52",
  },
  img: {
    height: 100,
    width: 100,
    flex: 1,
    alignSelf: "center",
  },
  mediaSelected: {
    borderColor: "#22dffc",
    borderWidth: 1,
  },
  textBtn: { color: "#ef3e5c" },
  inputColor: { color: "#4d4e52" },
  textarea: {
    backgroundColor: "white",
    color: "#4d4e52",
  },
  label: {
    marginTop: 10,
    color: "#4d4e52",
  },
  btn: { borderColor: "#ef3e5c" },
  viewBtn: {
    flexDirection: "row",
    alignSelf: "flex-end",
    marginTop: 20,
  },
  btnSave: {
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: "#415a6b",
  },
});

export default Form;
