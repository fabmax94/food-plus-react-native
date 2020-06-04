import React, {useState} from 'react';
import {StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {View, Text} from 'native-base';
const ListItems = ({list, title}) => {
  const [markList, setMarkList] = useState(list.map(item => false));
  const listSeparator = item => {
    if (list.indexOf(item) + 1 !== list.length) {
      return (
        <View
          style={{
            height: 1,
            width: '100%',
            backgroundColor: '#e9ebf0',
          }}
        />
      );
    }
  };

  const onMark = item => {
    markList[list.indexOf(item)] = !markList[list.indexOf(item)];
    setMarkList([...markList]);
  };

  const textStyle = item => {
    let index = list.indexOf(item);
    if (markList[index]) {
      return {...styles.text, backgroundColor: '#d3f1da'};
    } else {
      return {...styles.text};
    }
  };
  return (
    <View style={{flex: 1, paddingBottom: 10}}>
      <View style={{alignSelf: 'flex-start', padding: 15}}>
        <Text style={styles.title}>{title}</Text>
      </View>
      {list.length ? (
        list.map(item => {
          return (
            <>
              <TouchableWithoutFeedback
                onPress={() => onMark(item)}
                key={`${title}-${list.indexOf(item)}`}>
                <Text style={textStyle(item)}>{item}</Text>
              </TouchableWithoutFeedback>
              {listSeparator(item)}
            </>
          );
        })
      ) : (
        <Text style={styles.text}>Nenhum item</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    flex: 1,
    padding: 15,
    color: '#4d4e52',
  },
  title: {
    fontSize: 18,
    color: '#777777',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});

export default ListItems;
