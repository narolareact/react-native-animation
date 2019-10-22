import React from 'react'
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Animated,
    Image,
    Easing,
    TouchableOpacity,
    TextInput,
    Dimensions
} from 'react-native'

const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height
var available_width = width - 40 - 4

class Animation extends React.Component {

    constructor() {
        super()
        this.state = {
            opacity: new Animated.Value(0),
            password: '',
            progress: 0
        }
        this.spinValue = new Animated.Value(0)
        this.textAnimated = new Animated.Value(0)
        this.scaleAnimationValue = new Animated.Value(0)
        this.shakeAnimation = new Animated.Value(0)
        this.progress = new Animated.Value(0)
        this.bgColor = new Animated.Value(0)
    }

    componentDidMount() {
        this.textAnimate()
        this.bgColorContainer()
        this.progress.setValue(0);
        this.progress.addListener((progress) => {
            this.setState({
                progress: parseInt(progress.value) + '%'
            });
        });

        Animated.timing(this.progress, {
            duration: 5000,
            toValue: 100
        }).start(() => {
            this.setState({
                progress: 'done!'
            })
        });
    }

    bgColorContainer = () => {

        Animated.timing(this.bgColor, {
            toValue: 100,
            duration: 300,
            easing: Easing.linear,
        }).start()
    }

    checkPassword = () => {
        if (this.state.password == 123456) {
            return
        }
        else {
            this.shakeAnimationText()
            return
        }
    }

    // shake animation 
    shakeAnimationText = () => {
        Animated.timing(this.shakeAnimation, {
            toValue: 1,
            duration: 300,
            easing: Easing.linear,
        }).start(this.shakeAnimation.setValue(0))
    }

    // scale image with animation
    handleAnimation = () => {
        Animated.timing(this.scaleAnimationValue, {
            toValue: 1,
            duration: 1000,
            // easing: Easing.elastic(2)

        }).start()
    }

    // rotation
    spin = (val) => {

        if (val) {
            Animated.loop(
                Animated.timing(this.spinValue, {
                    toValue: 1,
                    duration: 2000,
                    easing: Easing.linear,
                    delay: 200
                }),
                {
                    iterations: -1
                }
            ).start()

        } else {
            Animated.loop(
                Animated.timing(this.spinValue, {
                    toValue: 0,
                }),
                {
                    iterations: -1
                }
            ).stop()
        }
    }

    // fade in out 
    _start = () => {

        Animated.timing(this.state.opacity, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: true,
        }).start();
    }

    // text animation
    textAnimate = () => {
        Animated.loop(
            Animated.timing(this.textAnimated, {
                toValue: 1,
                duration: 1500,
                easing: Easing.linear,
                delay: 200
            }),
            {
                iterations: -1
            }
        ).start()
    }

    render() {
        const spin = this.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        })

        const textSize = this.textAnimated.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [32, 18, 32]
        })

        const scaleX = this.scaleAnimationValue.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 7]
        })

        const scaleY = this.scaleAnimationValue.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 6.50]
        })

        const marginLeft = this.shakeAnimation.interpolate({
            inputRange: [0, 0.2, 0.4, 0.6, 0.8, 0.9, 1],
            outputRange: [0, -20, 20, -20, 20, -20, 0]
        })

        var animated_width = this.progress.interpolate({
            inputRange: [0, 100],
            outputRange: [0, available_width - 4]
        });
        //red -> orange -> green
        const progress_color = this.progress.interpolate({
            inputRange: [0, 100],
            outputRange: ['red', 'green']
        });

        var animated_height = this.progress.interpolate({
            inputRange: [0, 100],
            outputRange: [0, height]
        });
        //red -> orange -> green
        const bgColorBack = this.progress.interpolate({
            inputRange: [0, 100],
            outputRange: ['blue', 'yellow']
        });

        return (
            <Animated.View style={[styles.container, { backgroundColor: bgColorBack, width: '100%', height: '100%' }]}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <TouchableOpacity style={styles.startStopButton} onPress={() => this.spin(true)}>
                        <Text style={styles.startStopText}>Start</Text>
                    </TouchableOpacity>
                    <Animated.Image
                        style={{
                            width: 100,
                            height: 100,
                            transform: [{ rotate: spin }]
                        }}
                        resizeMode='contain'
                        source={{ uri: 'https://s3.amazonaws.com/media-p.slid.es/uploads/alexanderfarennikov/images/1198519/reactjs.png' }}
                    />
                    <TouchableOpacity style={styles.startStopButton} onPress={() => this.spin(false)}>
                        <Text style={styles.startStopText}>Stop</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ marginTop: 10, alignItems: 'center' }}>
                    <TouchableOpacity style={styles.startStopButton} onPress={() => this._start()}>
                        <Text style={styles.startStopText}>Fade in Fade out</Text>
                    </TouchableOpacity>
                    <Animated.Image
                        style={{
                            width: 100,
                            height: 100,
                            opacity: this.state.opacity
                        }}
                        resizeMode='contain'
                        source={{ uri: 'https://s3.amazonaws.com/media-p.slid.es/uploads/alexanderfarennikov/images/1198519/reactjs.png' }}
                    />
                </View>

                {/* <View>
                    <Animated.Text
                        style={{
                            fontSize: textSize,
                            marginTop: 10,
                            color: 'green'
                        }} >
                        Animated Text!
                    </Animated.Text>
                </View> */}

                <View style={{ marginTop: 10 }}>
                    <TouchableOpacity onPress={this.handleAnimation}>
                        <Text>Transform</Text>
                    </TouchableOpacity>
                    <Animated.Image
                        source={{ uri: 'https://s3.amazonaws.com/media-p.slid.es/uploads/alexanderfarennikov/images/1198519/reactjs.png' }}
                        resizeMode='contain'
                        style={{
                            top: 10,
                            height: 20,
                            width: 20,
                            transform: [{ scaleX: scaleX }, { scaleY: scaleY }]
                        }}
                    />
                </View>

                <View style={{ marginTop: 50 }}>
                    <Animated.View style={{ height: 30, width: 300, marginLeft: marginLeft }}>
                        <TextInput
                            style={{ flex: 1, backgroundColor: 'rgb(200,200,200)' }}
                            value={this.state.password}
                            onChangeText={(password) => this.setState({ password })}
                        />
                    </Animated.View>
                </View>
                <TouchableOpacity style={styles.startStopButton} onPress={() => this.checkPassword()}>
                    <Text style={styles.startStopText}>Password Shake</Text>
                </TouchableOpacity>

                <View style={{ height: 40, borderWidth: 2, marginTop: 10, width: available_width }}>
                    <Animated.View style={{ width: animated_width, backgroundColor: progress_color, height: 40 - 4 }}>
                    </Animated.View>
                </View>
                <Text>{this.state.progress}</Text>
            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 50,
    },
    startStopButton: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center'
    },
    startStopText: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        color: 'white',
        fontWeight: '500',
        fontSize: 18,
    }
})

export default Animation