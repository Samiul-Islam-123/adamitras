import React from 'react';
import { SignIn } from '@clerk/clerk-react';

function Login() {
  return (
    <div className=' w-full h-full flex items-center justify-center'>
      <SignIn />
    </div>
  );
}

export default Login;
