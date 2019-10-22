import React from 'react'
import { View, StyleSheet, Animated, Easing, Dimensions, Text } from 'react-native'

const width = Dimensions.get('screen').width

class SequenceAndParreralAnimation extends React.Component {

    constructor() {
        super()
        this.textAnimated = new Animated.Value(0)
        this.textRotateAnimated = new Animated.Value(0)
        this.ball = new Animated.Value(0)
        this.ballRight = new Animated.Value(0)
    }

    componentDidMount() {
        // this.animate()
        this.moveBall()
    }

    moveBall() {

        Animated.parallel([
            Animated.timing(this.ball, {
                toValue: 1,
                duration: 1500,
                useNativeDriver: true
            }),
            Animated.timing(this.ballRight, {
                toValue: 1,
                duration: 1500,
                useNativeDriver: true
            })
        ]).start()
    }

    animate = () => {
        Animated.parallel([
            Animated.loop(
                Animated.timing(this.textAnimated, {
                    toValue: 1,
                    duration: 1500,
                    easing: Easing.linear,
                }),
                {
                    iterations: -1
                }
            ),
            Animated.loop(
                Animated.timing(this.textRotateAnimated, {
                    toValue: 1,
                    duration: 1000,
                    easing: Easing.linear,
                }),
                {
                    iterations: -1
                }
            )
        ]).start()
    }

    render() {

        const textSize = this.textAnimated.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [32, 18, 32]
        })

        const rotateX = this.textRotateAnimated.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: ['0deg', '180deg', '0deg']
        })

        const xVal = this.ball.interpolate({
            inputRange: [0, 1],
            outputRange: [-width, width - width]
        });

        const xValRight = this.ballRight.interpolate({
            inputRange: [0, 1],
            outputRange: [width + 1, 0]
        });

        return (
            <View style={styles.container}>
                <View style={{ flex: 1, width: '100%' }}>
                    <View>
                        <Animated.Text
                            style={{
                                fontSize: textSize,
                                marginTop: 10,
                                color: 'green'
                            }} >
                            Animated Text!
                        </Animated.Text>
                    </View>

                    <View>
                        <Animated.Text
                            style={{
                                transform: [{ rotateX }],
                                fontSize: 16,
                                marginTop: 10,
                                color: 'green'
                            }} >
                            Animated  Rotate Text!
                        </Animated.Text>
                    </View>

                    <View style={{ height: 80, marginTop: 5 }}>
                        <Animated.View style={{ backgroundColor: 'rgb(200,200,200)', height: 80, width: width, transform: [{ translateX: xVal }], justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 18, color: 'black', fontWeight: '500' }}> Left to Right</Text>
                        </Animated.View>
                    </View>

                    <View style={{ flex: 1, marginTop: 5 }}>
                        <Animated.View style={{ backgroundColor: 'yellow', height: 80, width: width, transform: [{ translateX: xValRight }], justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 18, color: 'black', fontWeight: '500' }}> Right to Left</Text>
                        </Animated.View>
                    </View>

                </View>
            </View >
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
    }
})

export default SequenceAndParreralAnimation