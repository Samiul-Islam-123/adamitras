import { StrictMode, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import './index.css'
import App from './App.jsx';
import { ClerkProvider } from '@clerk/clerk-react'
import { Analytics } from "@vercel/analytics/react"
import LoadingAnimation from './components/LoadingAnimation.jsx';

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

const RootComponent = () => {
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   // Simulate a delay (e.g., 2 seconds)
  //   const timer = setTimeout(() => {
  //     setLoading(false);
  //   }, 6200);

  //   return () => clearTimeout(timer); // Cleanup the timeout
  // }, []);

  return (
    <StrictMode>
      <BrowserRouter>
        <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
          <Analytics />
          {loading ? (
            <LoadingAnimation />
          ) : (
            <App />
          )}
        </ClerkProvider>
      </BrowserRouter>
    </StrictMode>
  );
};

createRoot(document.getElementById('root')).render(<RootComponent />);
