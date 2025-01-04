import React from 'react'
import AppSidebar from '../AppSidebar/AppSidebar.jsx'
import AppHeader from '../AppHeader/AppHeader.jsx'

const DefaultLayout = () => {
  return (
    <div>
        <AppSidebar />
        <div className="wrapper d-flex flex-column min-vh-100">
            <AppHeader />
        </div>
    </div>
  )
}

export default DefaultLayout
