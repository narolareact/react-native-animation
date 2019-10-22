import React from 'react'
import { View, Animated, StyleSheet, Text } from 'react-native'

class SpringAnimation extends React.Component {

    constructor() {
        super()
        this.springValue = new Animated.Value(0.40)
    }

    componentDidMount() {

    }

    spring() {
        this.springValue.setValue(0.40)
        Animated.spring(
            this.springValue,
            {
                toValue: 0.50,
                // friction: 0.6, // lower friction value gives more overshoot forece
                // tension: 100, // speed of animation

                // speed: 1,
                // bounciness: 0

                stiffness: 3000, // speed of animation
                damping: 0.3, // damping less time grater and damping more time is shorter
                mass: 30, // weight of obj

                // overshootClamping: false,

            }
        ).start()
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ flex: 1, width: '100%' }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                        <Text
                            onPress={this.spring.bind(this)}>Spring</Text>
                        <Animated.Image
                            resizeMode='contain'
                            style={{ width: 75, height: 75, transform: [{ scale: this.springValue }] }}
                            source={require('../download.jpeg')} />
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        flex: 1
    }
})

export default SpringAnimation