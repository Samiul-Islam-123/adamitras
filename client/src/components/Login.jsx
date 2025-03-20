import React from 'react';
import { SignIn } from '@clerk/clerk-react';

function Login() {
  return (
    <div className=' w-screen h-screen py-20 flex items-center justify-center'>
      <SignIn />
    </div>
  );
}

export default Login;
