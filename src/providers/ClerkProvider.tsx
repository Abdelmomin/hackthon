import {
    ClerkProvider,
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
  } from '@clerk/nextjs'


export default function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
        {children}
  )
}