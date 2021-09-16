import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { RootNavigation } from './src/navigation/rootNavigation';

const App = () => {
  return (
    <SafeAreaView style={style.container}>
      <RootNavigation />
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1, 
  }
})

export default App;
