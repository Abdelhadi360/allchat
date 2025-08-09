import { useAuth, RedirectToSignIn } from "@clerk/clerk-react";

export default function ProtectedRoute({ children }) {
  const { isLoaded, isSignedIn } = useAuth();

  // Wait until Clerk finishes loading
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  // Redirect if user is not signed in
  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }

  // If signed in, render the children (protected content)
  return children;
}
