import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Item, Input, Button, Icon, Text, Content, View} from 'native-base';
import DraggableFlatList from 'react-native-draggable-flatlist';

const FormItems = ({items, onChange, placeholder}) => {
  const [itemList, setItemList] = useState(items);
  const handleChange = (index, newValue) => {
    itemList[index] = newValue;
    setItemList(itemList);
    onChange(itemList);
  };
  const deleteItem = indexToDelete => {
    setItemList(itemList.filter((item, index) => index != indexToDelete));
    onChange(itemList.filter((item, index) => index != indexToDelete));
  };
  const addItem = () => {
    setItemList([...itemList, '']);
    onChange(itemList);
  };
  return (
    <Content>
      <View style={styles.listContainer}>
        <DraggableFlatList
          data={itemList}
          renderItem={({item, index, drag, isActive}) => (
            <TouchableOpacity
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onLongPress={drag}>
              <View style={styles.itemContainer}>
                <Icon
                  name={'sort'}
                  type={'FontAwesome'}
                  style={{
                    alignSelf: 'center',
                    marginRight: 5,
                    color: '#4d4e52',
                  }}
                />
                <Item regular style={styles.input}>
                  <Input
                    value={item}
                    onChangeText={text => handleChange(index, text)}
                    placeholder={placeholder}
                    style={{color: '#4d4e52'}}
                  />
                </Item>
                <Button danger onPress={() => deleteItem(index)} transparent>
                  <Icon name="trash" />
                </Button>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => `${placeholder}${index}`}
          onDragEnd={({data}) => {
            setItemList([...data]);
            onChange([...data]);
          }}
        />
        {itemList.length == 0 ? (
          <Text style={{alignSelf: 'center', color: '#4d4e52'}}>
            Nenhum {placeholder}
          </Text>
        ) : null}
      </View>
      <View style={{alignSelf: 'flex-end'}}>
        <Button
          onPress={addItem}
          bordered
          rounded
          style={{borderColor: '#ef3e5c'}}>
          <Icon name="plus" type="FontAwesome" style={{color: '#ef3e5c'}} />
          <Text style={{color: '#ef3e5c'}}>{placeholder}</Text>
        </Button>
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
    flexDirection: 'row',
    marginBottom: 5,
  },
  input: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default FormItems;
