import React from 'react';
import { Content, Form, Item, Container, Label, Input } from 'native-base';

const SigIn = () => {
    return (
        <Container>
            <Content style={{alignContent: 'center'}}>
                <Form>
                    <Item floatingLabel>
                        <Label>Nome</Label>
                        <Input />
                    </Item>
                    <Item floatingLabel>
                        <Label>Email</Label>
                        <Input />
                    </Item>
                    <Item floatingLabel>
                        <Label>Senha</Label>
                        <Input />
                    </Item>
                </Form>
                <Button success><Text>Entrar ou Cadastrar</Text></Button>
            </Content>
        </Container>
    )
};

export default SigIn;