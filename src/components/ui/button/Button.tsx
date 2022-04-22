import React, { forwardRef } from 'react'
import Icon, { IconTypes } from '../Icon'
import './Button.scss'

type ButtonProps = {
  icon?: IconTypes
  label?: string
  isActive?: boolean
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  forwardedRef?: React.ForwardedRef<HTMLButtonElement>
  children?: string
}

function Button({
  icon,
  label,
  isActive = true,
  onClick,
  children,
  forwardedRef,
}: ButtonProps) {
  const onMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    onClick(event)
  }
  const title = !children ? label : undefined
  return (
    <button
      className={`toolbar-button${isActive ? ' selected' : ''}`}
      aria-label={title}
      title={title}
      onMouseDown={onMouseDown}
      ref={forwardedRef}>
      {icon && <Icon icon={icon} />}
      {children}
    </button>
  )
}

export default forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => (
  <Button forwardedRef={ref} {...props} />
))
