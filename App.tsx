import React from 'react';

import {createDrawerNavigator} from '@react-navigation/drawer';
import {NativeBaseProvider, Box} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';

import PersonalView from './routes/Personal';
import PublicView from './routes/Public';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Personal">
          <Drawer.Screen
            name="Personal"
            component={PersonalView}
            options={{title: 'Personal Space'}}
          />
          <Drawer.Screen
            name="Public"
            component={PublicView}
            options={{title: 'Public Space'}}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
