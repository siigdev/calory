import React, { Component } from 'react';
import { Text, Block, Card, Button, Input } from '../components'
import { ScrollView, StyleSheet } from 'react-native';
import { theme } from '../constants';
import firebase from 'firebase';

export default class Friends extends Component {
    state = {
        friendEmail: '',
        isLoading: false,
        friendsList: [],
        feedbackState: ''
    }
    componentDidMount() {
        this.setState({ isLoading: true });
        const currUser = firebase.auth().currentUser.uid;
        firebase.database().ref('friends/' + currUser).orderByChild('email').on('value', (snapshot) => {
            var friendsList = []
            snapshot.forEach(function (elem) {
                friendsList.push(elem.val());
            });
            this.setState({ friendsList: friendsList })
            console.warn(friendsList)
            this.setState({ isLoading: false });
        });

    }
    addFriend() {
        firebase.auth().fetchSignInMethodsForEmail(this.state.friendEmail)
            .then(result => {
                if (result.length === 0) {
                    this.setState({ feedbackState: 'This email does not exist in the database' })
                }
                else {
                    const currUser = firebase.auth().currentUser.uid;
                    firebase.database().ref('friends/').child(currUser).orderByChild('email').equalTo(this.state.friendEmail).once('value', snapshot => {
                        if (snapshot.exists()) {
                            this.setState({ feedbackState: 'This email is already in your friends list' })
                        }
                        else {
                            firebase.database().ref('friends').child(currUser).push({
                                email: this.state.friendEmail,
                                name: ''
                            })
                        }
                    })

                }
            })
    }
    renderCards() {
        firebase.database().ref('calories/').orderByChild()
        return (
            <Card><Text></Text></Card>
        )
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
                        <Text spacing={0.4}>{this.state.feedbackState}</Text>
                    </Block>
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