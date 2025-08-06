import { SignedIn, SignedOut, SignIn, SignInButton, UserButton } from '@clerk/clerk-react';

function Signup() {
  return (
    <header className='h-screen flex items-center justify-center'>
      <SignedOut>
        <SignIn
          appearance={{
            elements: {
              formButtonPrimary: 'bg-blue-500',
            },
          }}
        />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
  );
}

export default Signup