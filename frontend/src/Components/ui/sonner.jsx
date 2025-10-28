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
      error: (message, opts = {}) => {
        const id = Date.now()
        setToasts(prev => [
          ...prev,
          {
            id,
            message,
            type: 'error',
            duration: opts.duration || 3000,
            position: opts.position || 'bottom-right',
            dismissible: opts.dismissible !== undefined ? opts.dismissible : true
          }
        ])
        setTimeout(() => {
          setToasts(prev => prev.filter(t => t.id !== id))
        }, opts.duration || 3000)
      }
    }
  }, [])

  // Support top-right and bottom-right positions
  return (
    <>
      {/* Top-right toasts */}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
        {toasts.filter(t => t.position === 'top-right').map(toast => (
          <div
            key={toast.id}
            className={`px-4 py-3 rounded-lg shadow-lg ${
              toast.type === 'success'
                ? 'bg-green-500 text-white'
                : 'bg-red-500 text-white'
            } animate-in slide-in-from-right`}
            style={{ pointerEvents: toast.dismissible ? 'auto' : 'none' }}
          >
            {toast.message}
          </div>
        ))}
      </div>
      {/* Bottom-right toasts (default) */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {toasts.filter(t => t.position !== 'top-right').map(toast => (
          <div
            key={toast.id}
            className={`px-4 py-3 rounded-lg shadow-lg ${
              toast.type === 'success'
                ? 'bg-green-500 text-white'
                : 'bg-red-500 text-white'
            } animate-in slide-in-from-right`}
            style={{ pointerEvents: toast.dismissible ? 'auto' : 'none' }}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </>
  )
}

export const toast = {
  success: (message) => window.toast?.success(message),
  error: (message) => window.toast?.error(message)
}
