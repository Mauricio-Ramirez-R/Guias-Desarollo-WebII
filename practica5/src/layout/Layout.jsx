import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Modal from '../components/Modal'
import { useEffect } from 'react'
import { useAppStore } from '../store/useAppStore'

export default function Layout() {

    const loadFromStorage = useAppStore((state) => state.loadFromStorage)
    const notification = useAppStore((state) => state.notification)

    useEffect(() => {
        loadFromStorage()
    }, [])

    return (
        <>
            <Header />
            <main className="mx-auto container py-16">
                <Outlet />
            </main>
            <Modal />
            
            {notification && (
                <div className={`fixed top-5 right-5 p-3 rounded shadow-lg text-white 
                    ${notification.type === "error" ? "bg-red-500" : "bg-blue-500"}`}>
                    {notification.message}
                </div>
            )}
        </>
    )
}