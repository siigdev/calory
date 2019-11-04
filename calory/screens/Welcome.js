import React, { Component } from 'react'
import { Button, Block, Text } from '../components';
import { Animated, Dimensions, Image, FlatList, StyleSheet, Modal, ScrollView } from 'react-native';
import { theme } from '../constants';

const { width, height } = Dimensions.get('window');

export default class Welcome extends Component {
  state = {
    showTerms: false,
  }
  renderTermsOfService() {
    return (
      <Modal animationType="slide" visible={this.state.showTerms} onRequestClose={() => this.setState({ showTerms: false })}>
        <Block padding={[theme.sizes.padding * 2, theme.sizes.padding]} space="between">
          <Text h2 light>Terms of Service</Text>

          <ScrollView style={{ marginVertical: theme.sizes.padding }}>
            <Text caption gray height={24} style={{ marginBottom: theme.sizes.base }}>
              1. Your use of the Service is at your sole risk. The service is provided on an "as is" and "as available" basis.  
            </Text>
          </ScrollView>

          <Block middle padding={[theme.sizes.base / 2, 0]}>
            <Button gradient onPress={() => this.setState({ showTerms: false })}>
              <Text center white>I understand</Text>
            </Button>
          </Block>
        </Block>
      </Modal>
    )
  }
    scrollX = new Animated.Value(0);
    renderIllustrations() {
        const { illustrations } = this.props;
    
        return (
          <FlatList
            horizontal
            pagingEnabled
            scrollEnabled
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            snapToAlignment="center"
            data={illustrations}
            extraDate={this.state}
            keyExtractor={(item, index) => `${item.id}`}
            renderItem={({ item }) => (
              <Image
                source={item.source}
                resizeMode="contain"
                style={{ width, height: height / 2, overflow: 'visible' }}
              />
            )}
            onScroll={
              Animated.event([{
                nativeEvent: { contentOffset: { x: this.scrollX } }
              }])
            }
          />
        )
      }
    
      renderSteps() {
        const { illustrations } = this.props;
        const stepPosition = Animated.divide(this.scrollX, width);
        return (
          <Block row center middle style={styles.stepsContainer}>
            {illustrations.map((item, index) => {
              const opacity = stepPosition.interpolate({
                inputRange: [index - 1, index, index + 1],
                outputRange: [0.4, 1, 0.4],
                extrapolate: 'clamp',
              });
    
              return (
                <Block 
                  flex={false}
                  key={`step-${index}`}
                  color="gray"
                  style={[styles.steps]}
                />
              )
            })}
          </Block>
        )
      }


    render() {
        const { navigation } = this.props;
        return (
            <Block>
                <Block center bottom flex={0.2}>
                    <Text h1 center bold>Keep track of your <Text h1 primary>Calory.</Text></Text>
                    <Text h3 gray2>Estimate required workout</Text>
                </Block>
                <Block center middle>
                    {this.renderIllustrations()}
                    {this.renderSteps()}
                </Block>
                <Block middle flex={0.5} margin={[0, theme.sizes.padding * 2]}>
                    <Button gradient onPress={() => navigation.navigate('Login')}>
                        <Text center semibold white>Login</Text>
                    </Button>
                    <Button style={[styles.button]} onPress={() => navigation.navigate('Signup')}>
                        <Text center semibold>Signup</Text>
                    </Button>
                    <Button onPress={() => this.setState({ showTerms: true })}>
                        <Text center caption gray>Terms of service</Text>
                    </Button>
                </Block>
                {this.renderTermsOfService()}
            </Block>
        )
    }
}
Welcome.defaultProps = {
    illustrations: [
      { id: 1, source: require('../assets/images/illustration_1.png') },
      { id: 2, source: require('../assets/images/illustration_2.png') },
      { id: 3, source: require('../assets/images/illustration_3.png') },
    ],
  };

const styles = StyleSheet.create({
    button: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: theme.colors.gray
    },
    stepsContainer: {
        position: 'absolute',
        bottom: theme.sizes.base * 3,
        right: 0,
        left: 0,
      },
      steps: {
        width: 5,
        height: 5,
        borderRadius: 5,
        marginHorizontal: 2.5,
      },
})  