import React, { Component } from 'react'
import { AsyncStorage, ActivityIndicator, ScrollView, StyleSheet } from 'react-native'
import { Block, Text, Input, Button, Switch, Divider, ColorPalette } from '../components'
import Slider from 'react-native-slider'
import DatePicker from 'react-native-datepicker'
import { AppConsumer } from '../AppContextProvider'

import { theme } from '../constants';

export default class Settings extends Component {
    state = {
        username: "RANDOM",
        weight: 75,
        height: 180,
        newsletter: true,
        errors: []
    }
    _signOutAsync = async () => {
        const { navigation } = this.props;
        await AsyncStorage.clear();
        navigation.navigate('Welcome');
    };
    render() {
        const { loading, errors } = this.state;
        let selectedColor = '#6EBEE7';
        return (
            <AppConsumer>
                {appConsumer => (
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Block padding={[0, theme.sizes.base * 2]}>
                            <Block middle>
                                <Input
                                    label="Email"
                                    style={[styles.input]}
                                    defaultValue={this.state.username}
                                    onChangeText={text => this.setState({ weight: text })}
                                />
                                <Text gray2 style={{ marginBottom: 10 }}>Weight</Text>
                                <Slider
                                    minimumValue={50}
                                    maximumValue={150}
                                    step={1}
                                    style={{ height: 19 }}
                                    thumbStyle={styles.thumb, {backgroundColor: appConsumer.theme.colors.primary}}
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
                                    thumbStyle={styles.thumb, {backgroundColor: appConsumer.theme.colors.primary}}
                                    trackStyle={{ height: 6, borderRadius: 6 }}
                                    minimumTrackTintColor={appConsumer.theme.colors.secondary}
                                    maximumTrackTintColor="rgba(157, 163, 180, 0.10)"
                                    value={this.state.height}
                                    onValueChange={value => this.setState({ height: value })}
                                />
                                <Text caption gray right>{this.state.height}cm</Text>

                                <DatePicker
                                    style={{ width: 200 }}
                                    date={this.state.date}
                                    mode="date"
                                    format="YYYY-MM-DD"
                                    minDate="2016-05-01"
                                    maxDate="2016-06-01"
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    showIcon={false}
                                    customStyles={{
                                        dateInput: {
                                            borderWidth: 0,
                                            marginLeft: 36
                                        }
                                    }}
                                    onDateChange={(date) => { this.setState({ date: date }) }}
                                />

                                <Divider margin={0} />
                                <Block row center space="between">
                                    <Text>Theme</Text>
                                <ColorPalette
                                    onChange={color => {
                                        selectedColor = color;
                                        switch (color) {
                                            case '#6EBEE7':
                                                    appConsumer.updateTheme(theme.blueTheme);
                                                    break;
                                            case '#62B33E':
                                                    appConsumer.updateTheme(theme.greenTheme);
                                                    break;
                                            case '#DA4A55':
                                                    appConsumer.updateTheme(theme.redTheme);
                                                    break;
                                            case '#E47D3C':
                                                    appConsumer.updateTheme(theme.yellowTheme);
                                                    break;
                                            }}}
                                    value={selectedColor}
                                    colors={['#6EBEE7', '#62B33E', '#DA4A55', '#E47D3C']}
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
                                <Button gradient onPress={() => console.warn("nothing")}>
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
                )}
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
    header: {
        paddingHorizontal: theme.sizes.base * 2,
    },
    avatar: {
        height: theme.sizes.base * 2.2,
        width: theme.sizes.base * 2.2,
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