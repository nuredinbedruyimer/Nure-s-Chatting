import type { Metadata } from 'next'
import './globals.css'
import ToasterContext from './context/ToasterContext';
import AuthContextProvider from './context/AuthenticationProvider';

export const metadata: Metadata = {
  title: "Nure's Messenger",
  description: 'Build  Using Nextjs MongoDD ',
}
interface ChildrenType {

  children: React.ReactNode

}

export default function RootLayout({
  children,
}: ChildrenType) {
  return (
    <html lang="en">
      
      <body >
        <AuthContextProvider>
          <ToasterContext/>
        {children}
        </AuthContextProvider>
      </body>
    </html>
  )
}
