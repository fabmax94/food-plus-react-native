import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
const List = ({ list }) => {
    return (
        <View>
            <FlatList
                data={list}
                renderItem={({ item }) =>
                    <Text style={styles.text}>{item.name}</Text>
                }
            />
        </View>
    )
};

const styles = StyleSheet.create({
    text: {
        fontSize: 24,
        fontWeight: '600',
    }
});

export default List;