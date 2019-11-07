import React, { Component } from 'react'
import { AsyncStorage, ActivityIndicator, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { Block, Text, Input, Button, Switch, Divider, ColorPalette } from '../components'
import Slider from 'react-native-slider'
import DatePicker from 'react-native-datepicker'
import { AppConsumer } from '../AppContextProvider'
import firebase from 'firebase';

import { theme } from '../constants';

export default class Settings extends Component {
    state = {
        gender: 'Male',
        username: "RANDOM",
        weight: 75,
        height: 180,
        newsletter: true,
        profile: { name: 'Sebastian' },
        editing: null,
        errors: []
    }
    componentWillMount(){
        const currUser = firebase.auth().currentUser.uid;
        
        firebase.database().ref('users/').child(currUser).once('value', (snapshot) => {
            this.setState({
                gender: snapshot.val().gender})
        });
    }

    renderEdit(name) {
        const { profile, editing } = this.state;

        if (editing === name) {
            return (
                <TextInput
                    autoFocus={true}
                    defaultValue={profile.name}
                    onChangeText={text => this.handleEdit([name], text)}
                    style={{ borderBottomWidth: StyleSheet.hairlineWidth, borderColor: theme.colors.black, marginRight: 20 }}
                />
            )
        }

        return <Text >{profile.name}</Text>
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
            height: this.state.height,
            weight: this.state.weight,
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
        navigation.navigate('Welcome');
    }
    render() {
        const { loading, errors, profile, editing, gender } = this.state;
        let selectedColor = '#6EBEE7';
        return (
            <AppConsumer>
                {appConsumer => (
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Block padding={[0, theme.sizes.base * 2]}>
                            <Block middle>
                                <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
                                    <Block>
                                        <Text gray2 style={{ marginBottom: 10 }}>Username</Text>
                                        {this.renderEdit('username')}
                                    </Block>
                                    <Text medium primary onPress={() => this.toggleEdit('username')}>
                                        {editing === 'username' ? 'Save' : 'Edit'}
                                    </Text>
                                </Block>
                                <Text gray2 style={{ marginBottom: 10 }}>Weight</Text>
                                <Slider
                                    minimumValue={50}
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
                                <Text caption gray right>{this.state.weight}kg</Text>
                                <Text gray2 style={{ marginBottom: 10 }}>Height</Text>
                                <Slider
                                    minimumValue={100}
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
                                <Text caption gray right>{this.state.height}cm</Text>

                                <Text gray2 style={{ marginBottom: 10 }}>Birthday</Text>
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


                                <Divider margin={0} />
                                <Block row center space="between">
                                    <Text>Theme</Text>
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
                                <Block row center space="between" style={{ marginBottom: theme.sizes.base * 2 }}>
                                    <Text gray2>Newsletter</Text>
                                    <Switch
                                        value={this.state.newsletter}
                                        onValueChange={value => this.setState({ newsletter: value })}
                                    />
                                </Block>
                                <Button gradient onPress={() => this.saveSettings()}>
                                    {loading ?
                                        <ActivityIndicator size="small" color="white" /> :
                                        <Text bold white center>Save Settings</Text>
                                    }
                                </Button>

                                <Button title="Actually, sign me out :)" onPress={this._signOutAsync}>
                                    <Text bold black center>Log Out</Text>
                                </Button>
                            </Block>
                        </Block>
                    </ScrollView>
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
        padding: 14,
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