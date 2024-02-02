"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "./providers/Authproviders";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  
  const queryClient = new QueryClient()
  return (
    <html lang="en">
      <body className={inter.className}>
        <div>
          <div className="min-h-screen flex flex-col justify-between">
            <AuthProvider>
            <QueryClientProvider client={queryClient}>
            {children}
            </QueryClientProvider> 
            </AuthProvider>
          </div>
        </div>
      </body>
    </html>
  );
}
