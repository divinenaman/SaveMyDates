import React, {useState, useEffect} from 'react';

import {DrawerNavigationProp} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Loader from '../../components/Loader';

import ToDoListView from '../../screens/ToDoListView';
import ToDoAdd from '../../screens/ToDoAdd';

import CreateProfileScreen from '../../screens/CreateProfileScreen';
import LoginProfileScreen from '../../screens/LoginProfileScreen';
import FollowedProfileScreen from '../../screens/FollowedProfileScreen';
import FollowProfileScreen from '../../screens/FollowPofileScreen';

import {checkProfileService} from './service';

interface profileProps {
  username: string;
  publicPin: string;
  privatePin: string;
}

type MainNavigatorParamList = {
  Public: {} | undefined;
  Local: {} | undefined;
};

type MainNavigationProp = DrawerNavigationProp<
  MainNavigatorParamList,
  'Public'
>;

const Tab = createBottomTabNavigator();

export default function PublicSpace() {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<profileProps | null>(null);

  const checkProfile = () => {
    setLoading(true);
    checkProfileService().then(res => {
      setProfile(res);
      setLoading(false);
    });
  };

  useEffect(() => {
    checkProfile();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Tab.Navigator
            initialRouteName={!profile ? 'GetStarted' : 'DisplayToDo'}>
            {!profile && (
              <>
                <Tab.Screen
                  name="CreateProfile"
                  options={{title: 'Create Public Profile'}}>
                  {() => <CreateProfileScreen onProfileSet={checkProfile} />}
                </Tab.Screen>
                <Tab.Screen
                  name="LoginProfile"
                  options={{title: 'Login Public Profile'}}>
                  {() => <LoginProfileScreen onProfileSet={checkProfile} />}
                </Tab.Screen>
              </>
            )}
            {profile && (
              <>
                <Tab.Screen name="DisplayToDo" options={{title: 'To Do'}}>
                  {() => (
                    <ToDoListView type={'public'} username={profile.username} />
                  )}
                </Tab.Screen>
                <Tab.Screen name="AddToDo" options={{title: 'Add To Do'}}>
                  {() => <ToDoAdd type={'public'} />}
                </Tab.Screen>
                <Tab.Screen
                  name="FollowProfile"
                  options={{title: 'Follow Profiles'}}
                  component={FollowProfileScreen}
                />
                <Tab.Screen
                  name="FollowedProfiles"
                  options={{title: 'Followed Profiles'}}
                  component={FollowedProfileScreen}
                />
              </>
            )}
          </Tab.Navigator>
        </>
      )}
    </>
  );
}
