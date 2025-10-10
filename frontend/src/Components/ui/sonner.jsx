import * as React from "react"

// Simple toast implementation (you can replace with sonner library if needed)
const ToastContext = React.createContext()

export function Toaster() {
  const [toasts, setToasts] = React.useState([])

  React.useEffect(() => {
    window.toast = {
      success: (message) => {
        const id = Date.now()
        setToasts(prev => [...prev, { id, message, type: 'success' }])
        setTimeout(() => {
          setToasts(prev => prev.filter(t => t.id !== id))
        }, 3000)
      },
      error: (message) => {
        const id = Date.now()
        setToasts(prev => [...prev, { id, message, type: 'error' }])
        setTimeout(() => {
          setToasts(prev => prev.filter(t => t.id !== id))
        }, 3000)
      }
    }
  }, [])

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`px-4 py-3 rounded-lg shadow-lg ${
            toast.type === 'success' 
              ? 'bg-green-500 text-white' 
              : 'bg-red-500 text-white'
          } animate-in slide-in-from-right`}
        >
          {toast.message}
        </div>
      ))}
    </div>
  )
}

export const toast = {
  success: (message) => window.toast?.success(message),
  error: (message) => window.toast?.error(message)
}
