import React, {useState, useEffect} from 'react';
import {Center, Button} from 'native-base';

import Loader from '../../components/Loader';
import FollowProfile from '../../components/FollowProfile';
import DisplayFollowProfile from '../../components/DisplayFollowProfile';

import {followProfileService, getFollowedProfiles} from './services';

export default function FollowProfileScreen() {
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('idle');
  const [followMore, setFollowMore] = useState(false);
  const [data, setData] = useState<string[] | null>([]);
  const [newFollow, setNewFollow] = useState(false);

  const handleSubmit = (username: string, publicPin: string) => {
    setLoading(true);
    setStatusMessage('loading...');
    followProfileService(username, publicPin).then(res => {
      if (res) {
        setStatusMessage('success');
        setTimeout(() => {
          setLoading(false);
          setStatusMessage('');
          setFollowMore(false);
          setNewFollow(true);
        }, 3000);
      } else {
        setStatusMessage('Something Went Wrong');
        setTimeout(() => {
          setLoading(false);
          setStatusMessage('');
        }, 3000);
      }
    });
  };

  useEffect(() => {
    if (setNewFollow) {
      setLoading(false);
      getFollowedProfiles().then(res => {
        if (res) setData(res);
        setLoading(false);
        setNewFollow(false);
      });
    }
  });

  return (
    <>
      {loading ? (
        <Loader statusMessage={statusMessage} />
      ) : followMore ? (
        <>
          <FollowProfile onSubmit={handleSubmit}>
            <Button onPress={() => setFollowMore(false)}>
              View Followed Profiles
            </Button>
          </FollowProfile>
        </>
      ) : (
        <>
          <DisplayFollowProfile data={data}>
            <Button onPress={() => setFollowMore(true)}>Follow Profile</Button>
          </DisplayFollowProfile>
        </>
      )}
    </>
  );
}
