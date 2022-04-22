import React, { useMemo } from 'react'
import ReactDOM from 'react-dom'
import './Popup.scss'

const Portal = ({ children }: { children: React.ReactNode }) => {
  return Boolean(document)
    ? ReactDOM.createPortal(children, document.body)
    : null
}

type PopupProps = {
  isOpen: boolean
  controlRef?: React.RefObject<HTMLElement>
  calcPosition?: (left: number, top: number) => [number, number]
} & React.PropsWithoutRef<JSX.IntrinsicElements['div']>

function Popup({
  isOpen,
  controlRef,
  calcPosition,
  children,
  ...props
}: PopupProps) {
  const [left, top] = useMemo(() => {
    if (!isOpen) {
      return [-9999, -9999]
    }
    if (!controlRef || !controlRef.current) {
      return [0, 0]
    }
    let x = 0
    let y = 0
    const control = controlRef.current.getBoundingClientRect()
    x = control.left + window.scrollX
    y = control.bottom + window.scrollY

    if (calcPosition) {
      return calcPosition(x, y)
    }
    return [x, y]
  }, [isOpen, controlRef, calcPosition])
  return (
    <Portal>
      <div
        {...props}
        className='popup'
        style={{
          display: isOpen ? 'block' : 'none',
          top: top ? top + 'px' : '0',
          left: left ? left + 'px' : '0',
        }}>
        {children}
      </div>
    </Portal>
  )
}

export default Popup
