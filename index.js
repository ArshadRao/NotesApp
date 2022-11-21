/**
 * @format
 */

// import { AppRegistry } from 'react-native';
// import App from './App';
// import { name as appName } from './app.json';

// AppRegistry.registerComponent(appName, () => App);

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppRegistry } from 'react-native';
import Notes from './src/screens/Notes/Notes';
import { name as appName } from './app.json';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import reducers from './src/core/reducers/root';
import rootSaga from './src/core/sagas/root';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NoteEditor } from './src/screens/NoteEditor/NoteEditor';

const Stack = createNativeStackNavigator();

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

const App = () => (
  <NavigationContainer>
    <Provider store={store}>
      <Stack.Navigator>
        <Stack.Screen
          name="Notes"
          component={Notes}
          options={{ title: 'My Notes' }}
        />
        <Stack.Screen
          name="NoteEditor"
          component={NoteEditor}
          options={{ title: 'Note Editor' }}
        />
      </Stack.Navigator>
      {/* <Notes /> */}
    </Provider>
  </NavigationContainer>
);

AppRegistry.registerComponent(appName, () => App);
