import React, {useState} from 'react';

import Loader from '../../components/Loader';
import LoginProfile from '../../components/LoginProfile';

import {loginProfileService} from './service';

interface loginProfileProps {
  onProfileSet: () => void;
}

export default function LoginProfileScreen({onProfileSet}: loginProfileProps) {
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('idle');

  const handleSubmit = (username: string, privatePin: string) => {
    setLoading(true);
    setStatusMessage('Loading...');
    loginProfileService(username, privatePin).then(res => {
      if (res) {
        setStatusMessage('Success');
        setTimeout(() => {
          setLoading(false);
          setStatusMessage('');
          onProfileSet();
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
      {loading && <Loader statusMessage={statusMessage} />}
      {!loading && <LoginProfile onSubmit={handleSubmit} />}
    </>
  );
}
