import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { SafeAreaView, Text, View, StyleSheet, TouchableOpacity, Dimensions, Button } from 'react-native';
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue, withDelay, withSpring, withTiming } from 'react-native-reanimated';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const ScreenOne = ({ navigation }) => {
	const isFocus = useIsFocused();
	const [show, setShow] = useState(true);
	const [state, setState] = useState(true);
	const border = useSharedValue(0);
	const opacity = useSharedValue(0);
	const width = useSharedValue(150);
	const scale = useSharedValue(1.8);
	const progress = useSharedValue(0);
	const height = useSharedValue(150);

	const animStyle = useAnimatedStyle(() => {
		const bgColor = interpolateColor(progress.value, [0, 1], ['#325182', '#541236']);

		return {
			width: width.value,
			height: height.value,
			opacity: opacity.value,
			backgroundColor: bgColor,
			borderRadius: border.value,
			transform: [{ scale: scale.value }]
		}
	}, [])

	useEffect(() => {
		opacity.value = withTiming(isFocus ? 1 : 0, { duration: 600 });
		scale.value = withSpring(isFocus ? 1 : 1.8, { damping: 8 });
		border.value = withTiming(isFocus ? 15 : 0, { duration: 600 });
	}, [isFocus])

	const animate = () => {
		'worklet'
		width.value = withTiming(show ? screenWidth : 150, { duration: show ? 600 : 400 });
		height.value = withTiming(show ? screenHeight : 150, { duration: show ? 600 : 400 });
		border.value = withDelay(0, withTiming(show ? 0 : 15, { duration: 500 }));
		progress.value = withTiming(show ? 1 : 0);
		setState(show ? false : true);
		setShow(!show);
	}

	return (
		<SafeAreaView style={style.container}>
			<View style={style.animationContainer}>
				<Animated.View style={[style.box, animStyle]}>
					<TouchableOpacity onPress={animate}>
						<Text style={{color: 'white'}}>{state ? 'Open' : 'Close'}</Text>
					</TouchableOpacity>
				</Animated.View>
			</View>
			<View style={style.navigationButtonContainer}>
				<Button onPress={() => {}} title="Previous screen" />
				<Text>Screen One</Text>
				<Button onPress={() => navigation.navigate({ name: 'ScreenTwo' })} title="Next screen" />
			</View>
		</SafeAreaView>
	);
};

const style = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	animationContainer: {
		flex: 1,
		width: '100%',
		height: '100%',
		alignItems: 'center',
		justifyContent: "center",
	},
	box: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	navigationButtonContainer: {
		bottom: 0,
		zIndex: 2,
		width: '100%',
		justifyContent: 'space-between',
		flexDirection: 'row',
		position: 'absolute',
	},
})

export default ScreenOne;
