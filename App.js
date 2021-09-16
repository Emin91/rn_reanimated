import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue, withDelay, withSpring, withTiming } from 'react-native-reanimated';

const App = () => {
  const [state, setState] = useState(true);
  const [show, setShow] = useState(true);
  const progress = useSharedValue(0);
  const opacity = useSharedValue(0);
  const border = useSharedValue(0);
  const width = useSharedValue(150);
  const height = useSharedValue(150);
  const scale = useSharedValue(1.8);

  const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

  const animStyle = useAnimatedStyle(() => {
    const bgColor = interpolateColor(progress.value, 
      [0, 1], ['#325182', '#541236'])
    return {
      width: width.value, 
      height: height.value, 
      opacity: opacity.value,
      borderRadius: border.value,
      backgroundColor: bgColor,
      transform: [{scale: scale.value}]
    }
  }, [])

  useEffect(() => {
    opacity.value = withTiming(1, {duration: 600});
    scale.value = withSpring(1, {damping: 8});
    border.value = withTiming(15, {duration: 600});
  }, [])

  const animate = () => {
    'worklet'
    width.value = withTiming(show ? screenWidth : 150, {duration: show ? 600 : 400});
    height.value = withTiming(show ? screenHeight : 150, {duration: show ? 600 : 400});
    border.value = withDelay(0, withTiming(show ? 0 : 15, {duration: 500}));
    progress.value = withTiming(show ? 1 : 0);
    setState(show ? false : true);
    setShow(!show);
    
  }

  return (
    <SafeAreaView style={style.container}>
      <Animated.View style={[style.box, animStyle]}>
        <TouchableOpacity onPress={animate}>
          <Text style={{color: 'white'}}>{state ? 'Open' : 'Close'}</Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  box: {
    justifyContent: 'center', 
    alignItems: 'center',
  }
})

export default App;
