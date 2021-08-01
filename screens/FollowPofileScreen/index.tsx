import React, {useState, useEffect} from 'react';
import {Center, Button} from 'native-base';

import Loader from '../../components/Loader';
import FollowProfile from '../../components/FollowProfile';

import {followProfileService} from './services';

export default function FollowProfileScreen() {
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('idle');

  const handleSubmit = (username: string, publicPin: string) => {
    setLoading(true);
    setStatusMessage('Loading...');
    followProfileService(username, publicPin).then(res => {
      if (res) {
        setStatusMessage('Profile Followed');
        setTimeout(() => {
          setLoading(false);
          setStatusMessage('');
        }, 1000);
      } else {
        setStatusMessage('Something Went Wrong');
        setTimeout(() => {
          setLoading(false);
          setStatusMessage('');
        }, 1000);
      }
    });
  };

  return (
    <>
      {loading ? (
        <Loader statusMessage={statusMessage} />
      ) : (
        <>
          <FollowProfile onSubmit={handleSubmit} />
        </>
      )}
    </>
  );
}
