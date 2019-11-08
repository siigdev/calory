import React, { Component } from 'react'
import { AsyncStorage, ActivityIndicator, ScrollView, StyleSheet, TextInput, TouchableOpacity, Image, View } from 'react-native'
import { Block, Text, Input, Button, Switch, Divider, ColorPalette } from '../components'
import Slider from 'react-native-slider'
import DatePicker from 'react-native-datepicker'
import { AppConsumer } from '../AppContextProvider'
import firebase from 'firebase';

import { theme } from '../constants';

export default class Settings extends Component {
    state = {
        gender: 'Male',
        name: '',
        weight: 75,
        height: 180,
        email: '',
        newsletter: true,
        notifications: true,
        profile: { name: 'Sebastian' },
        editing: null,
        errors: [],
        isLoading: true,
    }
    componentWillMount() {
        const currUser = firebase.auth().currentUser.uid;
        const email = firebase.auth().currentUser.email;

        firebase.database().ref('users/').child(currUser).once('value', (snapshot) => {
            this.setState({
                gender: snapshot.val().gender,
                name: snapshot.val().name,
                weight: snapshot.val().weight+0,
                height: snapshot.val().height+0,
                email: email,
                newsletter: snapshot.val().newsletter,
                notifications: snapshot.val().notifications,
                isLoading: false
            })
        });
    }
    handleEdit(text) {
        this.setState({ name: text });
    }
    renderEdit(value) {
        const { name, editing } = this.state;

        if (editing === value) {
            return (
                <TextInput
                    autoFocus={true}
                    
                    defaultValue={name}
                    onChangeText={text => this.handleEdit(text)}
                    style={{ height:25, borderBottomWidth: StyleSheet.hairlineWidth, borderColor: theme.colors.black, marginRight: 20 }}
                />
            )
        }

        return <Text style={{ height:25}}>{name}</Text>
    }
    toggleEdit(name) {
        const { editing } = this.state;
        this.setState({ editing: !editing ? name : null });
    }
    saveSettings() {
        const currUser = firebase.auth().currentUser.uid;
        firebase.database().ref('users/').child(currUser).set({
            name: this.state.name,
            gender: this.state.gender,
            height: this.state.height + 0,
            weight: this.state.weight + 0,
            notifications: this.state.notifications,
            newsletter: this.state.newsletter,
        }).then((data) => {
            //success callback
            console.log('data ', data)
        }).catch((error) => {
            //error callback
            console.log('error ', error)
        })
    }
    _signOutAsync = async () => {
        const { navigation } = this.props;
        await AsyncStorage.clear();
        firebase.auth().signOut();
        navigation.navigate('Welcome');
    }
    render() {
        const { isLoading, editing, gender, email } = this.state;
        let selectedColor = '#6EBEE7';
        return (
            <AppConsumer>
                {appConsumer => (
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                    }}>
                        {isLoading ?
                            <Block middle><ActivityIndicator size={100} color={appConsumer.theme.colors.primary} /></Block> :
                            <ScrollView showsVerticalScrollIndicator={false}>
                                <Block padding={[0, theme.sizes.base * 2]}>

                                    <Block middle>
                                        <Image source={require('../assets/images/avatar.png')} style={styles.avatar}></Image>
                                        <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
                                            <Block>
                                                <Text gray2 style={{ marginBottom: 5 }}>Name</Text>
                                                {this.renderEdit('name')}
                                            </Block>
                                            <Text medium primary style={{ marginBottom: 5 }} onPress={() => this.toggleEdit('name')}>
                                                {editing === 'name' ? 'Save' : 'Edit'}
                                            </Text>
                                        </Block>
                                        <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
                                            <Block>
                                                <Text gray2 style={{ marginBottom: 5 }}>Email</Text>
                                                <Text style={{ marginBottom: theme.sizes.base }}>{email}</Text>
                                            </Block>
                                        </Block>
                                        <Text gray2 style={{ marginBottom: 5 }}>Weight</Text>
                                        <Slider
                                            minimumValue={0}
                                            maximumValue={150}
                                            step={1}
                                            style={{ height: 19 }}
                                            thumbStyle={styles.thumb, { backgroundColor: appConsumer.theme.colors.primary }}
                                            trackStyle={{ height: 6, borderRadius: 6 }}
                                            minimumTrackTintColor={appConsumer.theme.colors.secondary}
                                            maximumTrackTintColor="rgba(157, 163, 180, 0.10)"
                                            value={this.state.weight}
                                            onValueChange={value => this.setState({ weight: value })}
                                        />
                                        <Text caption gray2 right>{this.state.weight}kg</Text>
                                        <Text gray2 style={{ marginBottom: 5 }}>Height</Text>
                                        <Slider
                                            minimumValue={0}
                                            maximumValue={220}
                                            step={1}
                                            style={{ height: 19 }}
                                            thumbStyle={styles.thumb, { backgroundColor: appConsumer.theme.colors.primary }}
                                            trackStyle={{ height: 6, borderRadius: 6 }}
                                            minimumTrackTintColor={appConsumer.theme.colors.secondary}
                                            maximumTrackTintColor="rgba(157, 163, 180, 0.10)"
                                            value={this.state.height}
                                            onValueChange={value => this.setState({ height: value })}
                                        />
                                        <Text caption gray2 right>{this.state.height}cm</Text>

                                        <Text gray2 style={{ marginBottom: 5 }}>Birthday</Text>
                                        <DatePicker
                                            style={{ width: 200 }}
                                            date={this.state.date}
                                            mode="date"
                                            format="MMMM Do YYYY"
                                            minDate="2016-05-01"
                                            maxDate="2016-06-01"
                                            confirmBtnText="Confirm"
                                            cancelBtnText="Cancel"
                                            showIcon={false}
                                            customStyles={{
                                                dateInput: {
                                                    justifyContent: 'flex-start',
                                                    alignItems: 'flex-start',
                                                    borderWidth: 0,
                                                    marginLeft: 0,
                                                    paddingLeft: 0
                                                }
                                            }}
                                            onDateChange={(date) => { this.setState({ date: date }) }}
                                        />
                                        <Block row style={{
                                            flexDirection: 'row',
                                            borderRadius: 14,
                                            borderWidth: 1,
                                            justifyContent: 'space-between',
                                            borderColor: appConsumer.theme.colors.primary
                                        }}>
                                            <TouchableOpacity
                                                style={[styles.button, styles.first, gender === 'Male' ? { backgroundColor: appConsumer.theme.colors.primary } : null]}
                                                onPress={() => this.setState({ gender: 'Male' })}
                                            >
                                                <Text style={[styles.buttonText, gender === 'Male' ? styles.activeText : null]}>Male</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                style={[styles.button, styles.last, gender === 'Female' ? { backgroundColor: appConsumer.theme.colors.primary } : null]}
                                                onPress={() => this.setState({ gender: 'Female' })}
                                            >
                                                <Text style={[styles.buttonText, gender === 'Female' ? styles.activeText : null]}>Female</Text>
                                            </TouchableOpacity>
                                        </Block>


                                        <Divider />
                                        <Block row center space="between">
                                            <Text gray2>Theme</Text>
                                            <ColorPalette
                                                onChange={color => {
                                                    selectedColor = color;
                                                    switch (color) {
                                                        case '#64baff':
                                                            appConsumer.updateTheme(theme.blueTheme);
                                                            break;
                                                        case '#50CA58':
                                                            appConsumer.updateTheme(theme.greenTheme);
                                                            break;
                                                        case '#FF6559':
                                                            appConsumer.updateTheme(theme.redTheme);
                                                            break;
                                                        case '#FFAE59':
                                                            appConsumer.updateTheme(theme.yellowTheme);
                                                            break;
                                                    }
                                                }}
                                                value={appConsumer.theme.colors.primary}
                                                colors={['#64baff', '#50CA58', '#FF6559', '#FFAE59']}
                                                title={""}
                                                icon={<Text white>✔</Text>}
                                            />
                                        </Block>
                                        <Block row center space="between" style={{ marginBottom: theme.sizes.base }}>
                                            <Text gray2>Newsletter</Text>
                                            <Switch
                                                value={this.state.newsletter}
                                                onValueChange={value => this.setState({ newsletter: value })}
                                            />
                                        </Block>
                                        <Block row center space="between" style={{ marginBottom: theme.sizes.base }}>
                                            <Text gray2>Notifications</Text>
                                            <Switch
                                                value={this.state.notifications}
                                                onValueChange={value => this.setState({ notifications: value })}
                                            />
                                        </Block>
                                        <Button gradient onPress={() => this.saveSettings()}>
                                            <Text bold white center>Save Settings</Text>
                                        </Button>

                                        <Button title="Actually, sign me out :)" onPress={this._signOutAsync}>
                                            <Text bold black center>Log Out</Text>
                                        </Button>
                                    </Block>
                                </Block>
                            </ScrollView>
                        }
                    </View>
                )
                }
            </AppConsumer>
        )
    }
}
const styles = StyleSheet.create({
    login: {
        flex: 1,
        justifyContent: 'center',
    },
    input: {
        borderRadius: 0,
        borderWidth: 0,
        borderBottomWidth: 1
    },
    activeText: {
        color: '#FFF'
    },
    avatar: {
        alignSelf: 'center',
        marginTop: 10,
        width: 75,
        height: 75,
        borderRadius: 150 / 2,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "#abacae"
    },
    first: {
        borderTopLeftRadius: 13,
        borderBottomLeftRadius: 13,
    },

    last: {
        borderTopRightRadius: 13,
        borderBottomRightRadius: 13,
    },
    button: {
        flex: 1,
        padding: 10,
        alignContent: 'center',
        alignItems: 'center',
    },
    inputs: {
        marginTop: theme.sizes.base * 0.7,
        paddingHorizontal: theme.sizes.base * 2,
    },
    inputRow: {
        alignItems: 'flex-end'
    },
    sliders: {
        marginTop: theme.sizes.base * 0.7,
        paddingHorizontal: theme.sizes.base * 2,
    },
    thumb: {
        width: theme.sizes.base,
        height: theme.sizes.base,
        borderRadius: theme.sizes.base,
        borderColor: 'white',
        borderWidth: 3,
    },
    toggles: {
        paddingHorizontal: theme.sizes.base * 2,
    }
})  