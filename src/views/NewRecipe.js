import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Header, Left, Body, Title, Button, Icon, Text, Content } from 'native-base';
import Form from '../components/Form';
import { FirebaseService, PathRecipe } from '../services/FirebaseService';
class NewRecipe extends Component {
    state = {
        name: "",
        ingredients: [],
        steps: [],
        image: ""
    };
    onSave = () => {
        if (this.state.image) {
            FirebaseService.pushFile(this.state.image, url => {
                this.state.image = url
                FirebaseService.pushData(PathRecipe, this.state);
            });
        } else {
            FirebaseService.pushData(PathRecipe, this.state);
        }

        this.props.navigation.goBack();
    };
    render = () =>
        <Container>
            <Header androidStatusBarColor="#573ea8" style={styles.header}>
                <Left>
                    <Button transparent>
                        <Icon name='arrow-back' />
                    </Button>
                </Left>
                <Body>
                    <Title>Nova Receita</Title>
                </Body>
            </Header>
            <Content style={styles.content}>
                <Form recipe={this.state} onChangeRecipe={(recipe) => this.setState(recipe)} />
                <Button onPress={this.onSave} full success style={styles.btnSave}>
                    <Text>Salvar</Text>
                </Button>
            </Content>
        </Container>



};

const styles = StyleSheet.create({
    content: {
        padding: 10
    },
    btnSave: {
        marginTop: 20
    }
});

export default NewRecipe;