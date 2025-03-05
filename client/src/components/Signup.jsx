import React from 'react';
import { SignUp } from '@clerk/clerk-react';

function Signup() {
  return (
    <div className=' w-full h-full flex items-center justify-center'>
      <SignUp />
    </div>
  );
}

export default Signup;
