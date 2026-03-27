import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] noise-overlay relative">
      <Navbar />
      
      <main className="pt-16 relative z-10">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

export default MainLayout
