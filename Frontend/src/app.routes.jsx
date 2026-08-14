import { createBrowserRouter } from 'react-router'
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'
import Protect from '../src/features/auth/components/Protected'
import Home from './features/auth/interview/pages/Home'
import Interview from './features/auth/interview/pages/interview'
import { MainLayout } from './features/auth/pages/MainLayout'


export const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/",
        element: <Protect> <MainLayout><Home /></MainLayout>  </Protect>
    },
    {
        path: "/interview/:interviewId",
        element: <Protect> <MainLayout> <Interview /> </MainLayout> </Protect>
    }
])

