import React, { Component } from "react";
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Animated
} from "react-native";

class temp extends Component {

    componentWillMount() {
        this._animatedValue = new Animated.Value(0);
    }

    componentDidMount() {
        Animated.timing(this._animatedValue, {
            toValue: 600,
            duration: 6000
        }).start();
    }

    render() {

        // const interpolatedRotateAnimation = this._animatedValue.interpolate({
        //     inputRange: [0, 600],
        //     outputRange: ['0deg', '360deg']
        // });

        const interpolatedColorAnimation = this._animatedValue.interpolate({
            inputRange: [0, 600],
            outputRange: ['rgba(255,255,255, 1)', 'rgba(51,156,177, 1)']
        });

        return (
            <View style={styles.container}>
                <Animated.View
                    style={[styles.box, {
                        backgroundColor: interpolatedColorAnimation,
                        transform: [{ translateY: this._animatedValue },

                        ]
                    }
                    ]}
                />
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    box: {
        backgroundColor: 'red',
        position: 'absolute',
        top: 100,
        left: 100,
        width: 100,
        height: 100
    }
});
export default temp