import * as React from "react"
import { FiChevronDown } from "react-icons/fi"

const AccordionContext = React.createContext()

const Accordion = React.forwardRef(({ type, defaultValue, value, onValueChange, collapsible = false, children, className, ...props }, ref) => {
  const [openItems, setOpenItems] = React.useState(
    type === "single" ? (defaultValue || value || "") : (defaultValue || value || [])
  )

  const handleValueChange = (itemValue) => {
    if (type === "single") {
      const newValue = openItems === itemValue && collapsible ? "" : itemValue
      setOpenItems(newValue)
      if (onValueChange) onValueChange(newValue)
    } else {
      const newValue = openItems.includes(itemValue)
        ? openItems.filter(v => v !== itemValue)
        : [...openItems, itemValue]
      setOpenItems(newValue)
      if (onValueChange) onValueChange(newValue)
    }
  }

  const isOpen = (itemValue) => {
    return type === "single" ? openItems === itemValue : openItems.includes(itemValue)
  }

  return (
    <AccordionContext.Provider value={{ openItems, handleValueChange, isOpen }}>
      <div ref={ref} className={className} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  )
})
Accordion.displayName = "Accordion"

const AccordionItem = React.forwardRef(({ className, value, children, ...props }, ref) => (
  <div ref={ref} className={`border-b ${className || ''}`} data-value={value} {...props}>
    {children}
  </div>
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef(({ className, children, ...props }, ref) => {
  const context = React.useContext(AccordionContext)
  const value = props['data-value'] || ref?.current?.parentElement?.getAttribute('data-value')
  const isOpen = context.isOpen(value)

  return (
    <button
      ref={ref}
      className={`flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline w-full text-left ${className || ''}`}
      onClick={() => context.handleValueChange(value)}
      {...props}
    >
      {children}
      <FiChevronDown 
        className={`h-4 w-4 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
      />
    </button>
  )
})
AccordionTrigger.displayName = "AccordionTrigger"

const AccordionContent = React.forwardRef(({ className, children, ...props }, ref) => {
  const context = React.useContext(AccordionContext)
  const value = ref?.current?.parentElement?.getAttribute('data-value')
  const isOpen = context.isOpen(value)

  if (!isOpen) return null

  return (
    <div
      ref={ref}
      className={`overflow-hidden text-sm transition-all ${className || ''}`}
      {...props}
    >
      <div className="pb-4 pt-0">{children}</div>
    </div>
  )
})
AccordionContent.displayName = "AccordionContent"

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
