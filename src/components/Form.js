import React from 'react';
import ImagePicker from 'react-native-image-picker';
import { StyleSheet, Image } from 'react-native';
import { Label, Item, Input, Button, Icon, Text, Content, View } from 'native-base';
import FormItems from './FormItems';
const Form = ({ recipe, onChangeRecipe }) => {
    chooseImage = () => {
        let options = {
            title: 'Select Image',
            customButtons: [
                { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
            ],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                alert(response.customButton);
            } else {
                recipe.image = response.uri;
                onChangeRecipe(recipe);
            }
        });
    }
    return (
        <Content>
            <Label>Nome</Label>
            <Item>
                <Input
                    text={recipe.name}
                    onChangeText={(text) => {
                        recipe.name = text;
                        onChangeRecipe(recipe);
                    }} />
            </Item>
            <Label style={styles.label}>Ingredientes</Label>
            <FormItems items={recipe.ingredients} placeholder={"Ingrediente"} onChange={(ingredients) => {
                recipe.ingredients = ingredients;
                onChangeRecipe(recipe);
            }} />
            <Label style={styles.label}>Passos</Label>
            <FormItems items={recipe.steps} placeholder={"Passo"} onChange={(steps) => {
                recipe.steps = steps;
                onChangeRecipe(recipe);
            }} />
            <Label style={styles.label}>Foto</Label>
            {recipe.image ? (
                <Image source={{ uri: recipe.image }} style={{ height: 100, width: 100, flex: 1, alignSelf: 'center' }} />
            ) : (<Text style={{ alignSelf: 'center' }}>Nenhuma Imagem</Text>)}

            <View style={{ alignSelf: 'flex-end', marginTop: 20 }}>
                <Button onPress={chooseImage} bordered>
                    <Icon name='file' type='FontAwesome' />
                    <Text>Escolha uma foto</Text>
                </Button>
            </View>
        </Content>
    )
};

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1
    },
    label: {
        marginTop: 10
    }
});

export default Form;