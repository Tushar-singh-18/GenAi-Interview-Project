import React from 'react'
import { router } from './app.routes.jsx';
import { RouterProvider } from 'react-router';
import { AuthProvider } from './features/auth/auth.context.jsx';
import { InterviewProvider } from './features/auth/interview.context.jsx';


const App = () => {
  return (
    <div>
      <AuthProvider>
        <InterviewProvider>
          <RouterProvider router={router} />
        </InterviewProvider>
      </AuthProvider>
    </div>
  )
}

export default App;



