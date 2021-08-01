import React, {useState, useEffect} from 'react';
import {Center, Button, ScrollView} from 'native-base';
import {useFocusEffect} from '@react-navigation/native';

import Loader from '../../components/Loader';
import DisplayFollowProfile from '../../components/DisplayFollowProfile';

import {getFollowedProfiles} from './services';

export default function FollowedProfileScreen() {
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('idle');
  const [data, setData] = useState<string[] | null>([]);

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      setStatusMessage('Loading...');
      getFollowedProfiles().then(res => {
        if (res) setData(res);
        setLoading(false);
        setStatusMessage('');
      });
    }, []),
  );

  return (
    <>
      {loading ? (
        <Loader statusMessage={statusMessage} />
      ) : (
        <DisplayFollowProfile data={data} />
      )}
    </>
  );
}
