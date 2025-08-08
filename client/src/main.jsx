import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { ClerkProvider } from '@clerk/clerk-react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Toaster } from 'sonner';
import { dark, shadcn, shadesOfPurple } from '@clerk/themes';
import Home from './Home.jsx';


// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env file')
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} appearance={{baseTheme: shadcn}} >
      <SidebarProvider >
        <AppSidebar />
        
        <App />
        <Toaster richColors />
      </SidebarProvider>
      
    </ClerkProvider>
  </StrictMode>,
)