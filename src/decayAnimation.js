import React from 'react'
import { View, Animated, StyleSheet, PanResponder } from 'react-native'
import clamp from 'clamp'

var SWIPE_THRESHOLD = 60;

class decayAnimation extends React.Component {

    constructor() {
        super()
        this.state = {
            pan: new Animated.ValueXY()
        }
        this._animatedValue = new Animated.ValueXY();

    }

    componentWillMount() {
        this._panResponder = PanResponder.create({
            onMoveShouldSetResponderCapture: () => true,
            onMoveShouldSetPanResponderCapture: () => true,

            onPanResponderGrant: (e, gestureState) => {
                this.state.pan.setOffset({ x: this.state.pan.x._value, y: this.state.pan.y._value });
                this.state.pan.setValue({ x: 0, y: 0 });
            },

            onPanResponderMove: Animated.event([
                null, { dx: this.state.pan.x, dy: this.state.pan.y },
            ]),

            onPanResponderRelease: (e, { vx, vy }) => {
                this.state.pan.flattenOffset();
                let velocity;

                if (vx >= 0) {
                    velocity = clamp(vx, 3, 5);
                    // velocity = vx * 3
                } else if (vx < 0) {
                    velocity = clamp(vx * -1, 3, 5) * -1;
                }

                if (Math.abs(this.state.pan.x._value) > SWIPE_THRESHOLD) {
                    Animated.decay(this.state.pan, {
                        velocity: { x: velocity, y: vy },
                        deceleration: 0.98
                    }).start(this._resetState)
                } else {
                    Animated.spring(this.state.pan, {
                        toValue: { x: 0, y: 0 },
                        friction: 4
                    }).start()
                }
            }
        })
    }

    componentDidMount() {
        // this.decay();
    }

    decay() {
        Animated.decay(this._animatedValue, {   // coast to a stop
            // velocity: { x: gestureState.vx, y: gestureState.vy }, // velocity from gesture release
            deceleration: 0.997,
        })
    }

    render() {

        let { pan } = this.state;

        let [translateX, translateY] = [pan.x, pan.y];

        return (
            <View style={styles.conatainer}>
                <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', }}>
                    <Animated.View style={{ height: 50, width: 50, backgroundColor: 'green', transform: [{ translateX }] }} {...this._panResponder.panHandlers}>
                    </Animated.View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    conatainer: {
        flex: 1,
        marginTop: 50
    }
})
export default decayAnimation