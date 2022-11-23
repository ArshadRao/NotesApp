/* eslint-disable react-native/no-inline-styles */

/**

 * Sample React Native App

 * https://github.com/facebook/react-native

 *

 * @format

 * @flow strict-local

 */

import React from 'react';

import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  Platform,
  Button,
} from 'react-native';

const MyTitle = props => {
  const { title } = props;

  return <Text style={{ fontSize: 22, paddingBottom: 16 }}>{title}</Text>;
};

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ padding: 16 }}>
        <MyTitle title="Hello World!" />
        <View style={{ flexDirection: 'row' }}>
          <TextInput
            style={{ borderWidth: 0.5, flex: 3 }}
            placeholder="Enter here..."
          />
          <View style={{ marginTop: 16, marginLeft: 8, flex: 2 }}>
            <Button title="press me" />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 0,
  },

  text: {
    fontSize: 42,
  },
});

export default App;
