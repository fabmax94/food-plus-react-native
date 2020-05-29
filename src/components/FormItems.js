import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Item, Input, Button, Icon, Text, Content, View } from 'native-base';
const FormItems = ({ items, onChange, placeholder }) => {
    const [itemList, setItemList] = useState(items);
    const handleChange = (index, newValue) => {
        itemList[index] = newValue;
        setItemList(itemList);
        onChange(itemList);
    };
    const deleteItem = (indexToDelete) => {
        setItemList(itemList.filter((item, index) => index != indexToDelete));
        onChange(itemList);
    };
    const addItem = () => {
        setItemList([...itemList, ""]);
        onChange(itemList);
    };
    return (
        <Content>
            <View style={styles.listContainer}>
                {itemList.length == 0 ? (
                    <Text style={{ alignSelf: 'center' }}>Nenhum {placeholder}</Text>
                ) : (null)}
                {itemList.map((item, index) =>
                    <View key={`container${index}`} style={styles.itemContainer}>
                        <Item regular style={styles.input}>
                            <Input text={item} onChangeText={(text) => handleChange(index, text)} placeholder={placeholder} />
                        </Item>
                        <Button danger onPress={() => deleteItem(index)} transparent >
                            <Icon name='trash' />
                        </Button>
                    </View>

                )}
            </View>
            <View style={{ alignSelf: 'flex-end' }}>
                <Button onPress={addItem} bordered>
                    <Icon name='plus' type='FontAwesome' />
                    <Text>{placeholder}</Text>
                </Button>
            </View>
        </Content>
    )
};

const styles = StyleSheet.create({
    listContainer: {
        marginBottom: 20,
        marginTop: 10
    },
    itemContainer: {
        flexDirection: 'row',
        marginBottom: 5
    },
    input: {
        flex: 1,
    }
});

export default FormItems;