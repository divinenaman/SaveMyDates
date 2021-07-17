import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NativeBaseProvider, Box} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';

import ToDoListView from './screens/ToDoListView';
import ToDoAdd from './screens/ToDoAdd';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Tab.Navigator initialRouteName="DisplayToDo">
          <Tab.Screen
            name="DisplayToDo"
            component={ToDoListView}
            options={{title: 'To DO'}}
          />
          <Tab.Screen
            name="AddToDo"
            component={ToDoAdd}
            options={{title: 'Add To Do'}}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
