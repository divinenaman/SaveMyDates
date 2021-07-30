import React, {useState} from 'react';

import Loader from '../../components/Loader';
import CreateProfile from '../../components/CreateProfile';

import {createProfileService} from './service';

interface createProfileProps {
  onProfileSet: () => void;
}

export default function CreateProfileScreen({
  onProfileSet,
}: createProfileProps) {
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('idle');

  const handleSubmit = (
    username: string,
    privatePin: string,
    publicPin: string,
  ) => {
    setLoading(true);
    setStatusMessage('loading...');
    createProfileService(username, privatePin, publicPin).then(res => {
      if (res) {
        setStatusMessage('success');
        setTimeout(() => {
          setLoading(false);
          setStatusMessage('');
          onProfileSet();
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

  return (
    <>
      {loading && <Loader statusMessage={statusMessage} />}
      {!loading && <CreateProfile onSubmit={handleSubmit} />}
    </>
  );
}
