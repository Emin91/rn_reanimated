import React from 'react';
import {  View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';

const TransformSlider = ({ axis, onChange, endValue }) => {
	return (
		<View style={style.container}>
			<Text>{axis}</Text> 
			<Slider
				onValueChange={(e) => onChange(e)}
				style={{ width: '90%', height: 40 }}
				minimumValue={0}
				maximumValue={endValue}
				minimumTrackTintColor="#34495e"
				maximumTrackTintColor="#000000"
			/>
		</View>
	);
};

const style = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	}
})

export default TransformSlider;
