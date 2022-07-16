import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import {
  Item,
  Input,
  Button,
  Icon,
  Text,
  Content,
  View,
  Textarea,
} from "native-base";
import DraggableFlatList from "react-native-draggable-flatlist";
import { getInitText } from "../utils/functions";

const FormItems = ({ itemText, items, onChange, placeholder }) => {
  const [itemList, setItemList] = useState(items);
  const [isList, setIsList] = useState(false);
  const handleChangeList = (index, newValue) => {
    itemList[index] = newValue;
    setItemList(itemList);
    onChange(itemList, itemList.join("\n"));
  };
  const handleChangeText = (ingredientsText) => {
    const ingredients = ingredientsText
      .split("\n")
      .filter(t => t.trim())
      .map(t => t.trim());
    setItemList(ingredients);
    onChange(ingredients, ingredientsText);
  };
  const deleteItem = indexToDelete => {
    setItemList(itemList.filter((item, index) => index !== indexToDelete));
    const newList = itemList.filter((item, index) => index !== indexToDelete);
    onChange(newList, newList.join("\n"));
  };
  const addItem = () => {
    setItemList([...itemList, ""]);
  };
  return (
    <Content>
      {isList ? (
        <View style={styles.listContainer}>
          <DraggableFlatList
            data={itemList}
            renderItem={({ item, index, drag }) => (
              <TouchableOpacity
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onLongPress={drag}>
                <View style={styles.itemContainer}>
                  <Icon
                    name={"sort"}
                    type={"FontAwesome"}
                    style={{
                      alignSelf: "center",
                      marginLeft: 5,
                      color: "#4d4e52",
                      flex: 0.1
                    }}
                  />
                  <Item regular style={styles.input}>
                    <Input
                      value={item}
                      onChangeText={text => handleChangeList(index, text)}
                      placeholder={placeholder}
                      style={{ color: "#4d4e52" }}
                    />
                  </Item>
                  <Button danger onPress={() => deleteItem(index)} transparent>
                    <Icon name="trash" />
                  </Button>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => `${placeholder}${index}`}
            onDragEnd={({ data }) => {
              const newList = [...data];
              setItemList(newList);
              onChange(newList, newList.join("\n"));
            }}
          />
          {!itemList.length ? (
            <Text style={{ alignSelf: "center", color: "#4d4e52" }}>
              Nenhum {placeholder}
            </Text>
          ) : null}
        </View>
      ) : (
        <View style={styles.listContainer}>
          <Textarea
            rowSpan={5}
            bordered
            value={getInitText(itemText, items)}
            onChangeText={handleChangeText}
            style={styles.textarea}
          />
        </View>
      )}

      <View style={{ alignSelf: "flex-end", flexDirection: "row", flex: 1 }}>
        <Button
          onPress={() => setIsList(!isList)}
          bordered
          rounded
          style={{ borderColor: "#3e70ef", marginRight: 5 }}>
          <Icon name="swap" type="Entypo" style={{ color: "#3e70ef" }} />
          <Text style={{ color: "#3e70ef" }}>
            {isList ? "Texto" : "Lista"}
          </Text>
        </Button>
        {isList ? (
          <Button
            onPress={addItem}
            bordered
            rounded
            style={{ borderColor: "#ef3e5c" }}>
            <Icon name="plus" type="FontAwesome" style={{ color: "#ef3e5c" }} />
            <Text style={{ color: "#ef3e5c" }}>{placeholder}</Text>
          </Button>
        ) : null}
      </View>
    </Content>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    marginBottom: 20,
    marginTop: 10,
  },
  itemContainer: {
    flexDirection: "row",
    marginBottom: 5,
  },
  input: {
    flex: 1,
    backgroundColor: "white",
  },
  textarea: {
    backgroundColor: "white",
    color: "#4d4e52",
  },
});

export default FormItems;
