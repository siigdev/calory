import React, { Component } from 'react';
import { Text, Block, Card, Button, Input } from '../components'
import { ScrollView, StyleSheet } from 'react-native';
import { theme } from '../constants';
import firebase from 'firebase';

export default class Friends extends Component {
    state = {
        friendEmail: ''
    }
    addFriend() {


        //const currUser = firebase.auth().currentUser.uid;
        firebase.auth().fetchSignInMethodsForEmail(this.state.friendEmail)
        .then(result => {
            if (result.length === 0){
                console.warn('nono')
            }
            else {
                console.warn('yesyes')
            }
        })
    }
    render() {
        return (
            <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: theme.colors.gray4 }}>
                <Block padding={[0, theme.sizes.base]}>

                    <Input
                        label="Email"
                        style={[styles.input]}
                        defaultValue={this.state.friendEmail}
                        onChangeText={text => this.setState({ friendEmail: text })}
                    />
                    <Button gradient onPress={() => this.addFriend()}>
                        <Text bold white center>Add new friend</Text>
                    </Button>
                    <Block style={{ marginBottom: theme.sizes.base / 2 }}>
                        <Text spacing={0.4} transform="uppercase">Recent friend activity</Text>
                    </Block>
                    <Card><Text>You friend did this :) </Text></Card>
                    <Card><Text>You friend did this :) </Text></Card>
                    <Card><Text>You friend did this :) </Text></Card>
                </Block>
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    input: {
        borderRadius: 0,
        borderWidth: 0,
        borderBottomColor: theme.colors.gray,
        borderBottomWidth: 1
    }
})  