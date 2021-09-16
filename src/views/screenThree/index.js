import React, { useState } from 'react';
import TransformSlider from './transformSlider';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { SafeAreaView, Text, View, StyleSheet, TouchableOpacity, Dimensions, Button } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const ScreenThree = ({ navigation }) => {
	const [show, setShow] = useState(true);
	const [state, setState] = useState(true);
	const border = useSharedValue(5);
	const width = useSharedValue(60);
	const rotate = useSharedValue(0);
	const height = useSharedValue(60);
	const progress = useSharedValue(0);
	const translateX = useSharedValue(0);
	const translateY = useSharedValue(0);

	const animStyle = useAnimatedStyle(() => {
		return {
			width: width.value,
			height: height.value,
			backgroundColor: 'green',
			borderRadius: border.value,
			transform: [{rotateZ: `${rotate.value}deg`}, {translateX: translateX.value}, {translateY: translateY.value},]
		}
	}, [])

	const animate = () => {
		'worklet'
		width.value = withTiming(!show ? screenWidth : 150, { duration: !show ? 600 : 400 });
		height.value = withTiming(!show ? screenHeight : 150, { duration: !show ? 600 : 400 });
		border.value = withTiming(!show ? 0 : 15, { duration: 600 });
		progress.value = withTiming(show ? 1 : 0);
		setState(state ? false : true);
		setShow(!show);
	}

	const onSlideRotate = (value) => {
		rotate.value = withTiming(value, { duration: 0 });
	}

	const onSlideTranslateX = (value) => {
		translateX.value = withTiming(value, { duration: 0 });
	}

	const onSlideTranslateY = (value) => {
		translateY.value = withTiming(value, { duration: 0 });
	}

	return (
		<SafeAreaView style={style.container}>
			<View style={style.animationContainer}>
				<Animated.View style={[style.box, animStyle]}>
					<TouchableOpacity onPress={animate}>
						<Text style={{color: 'white'}}>{!show ? 'Open' : 'Close'}</Text>
					</TouchableOpacity>
				</Animated.View>
			</View>
			<View style={style.controllerContainer}>
				<View style={{}}>
					<TransformSlider axis={'X'} endValue={(screenWidth / 2) - 31} onChange={(e) => onSlideTranslateX(e)}/>
					<TransformSlider axis={'Y'} endValue={screenHeight / 2} onChange={(e) => onSlideTranslateY(e)}/>
					<TransformSlider axis={'R'} endValue={360} onChange={(e) => onSlideRotate(e)}/>
				</View>
				<View style={style.navigationButtonContainer}>
					<Button onPress={() => navigation.goBack()} title="Previous screen" />
					<Text>Screen Two</Text>
					<Button onPress={() => navigation.navigate('ScreenTwo')} title="Next screen" />
				</View>
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
		alignItems: 'center',
		width: '100%',
		flex: 1,
		justifyContent: "center",
	},
	box: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	controllerContainer: {
		bottom: 0,
		zIndex: 2,
		width: '100%',
		position: 'absolute',
	},
	navigationButtonContainer: {
		width: '100%',
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
})

export default ScreenThree;
