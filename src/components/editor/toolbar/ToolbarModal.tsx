import React, {
  forwardRef,
  KeyboardEvent,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import FocusTrap from 'focus-trap-react'
import Popup from '../../ui/popup'
import './ToolbarModal.scss'

export type ToolbarModalRef = {
  toggle: () => void
}

type ToolbarModalProps = {
  onOpen?: () => void
  onClose?: () => void
  controlRef?: React.RefObject<HTMLElement>
  children: JSX.Element | JSX.Element[]
}

function ToolbarModal(
  { controlRef, onOpen, onClose, children }: ToolbarModalProps,
  ref: React.Ref<ToolbarModalRef>
) {
  const popupRef = useRef<HTMLDivElement>(null)
  const [isOpen, setOpen] = useState(false)
  const calcPosition = (left: number, top: number): [number, number] => [
    left - 20,
    top + 2,
  ]

  const open = () => {
    if (onOpen) {
      onOpen()
    }
    setOpen(true)
  }
  const close = () => {
    if (onClose) {
      onClose()
    }
    setOpen(false)
  }

  useImperativeHandle(ref, () => ({
    toggle: () => (isOpen ? close() : open()),
  }))

  const KeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'Escape':
        close()
    }
  }

  const onClick = useCallback((event: MouseEvent) => {
    if (!popupRef.current || !event.target) {
      return
    }
    if (
      !popupRef.current.contains(event.target as Node) &&
      !controlRef?.current?.contains(event.target as Node)
    ) {
      document.removeEventListener('click', onClick)
      close()
    }
  }, [])

  useEffect(() => {
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [isOpen, onClick])

  return (
    <Popup
      isOpen={isOpen}
      controlRef={controlRef}
      onKeyDown={KeyDown}
      calcPosition={calcPosition}>
      {isOpen && (
        <FocusTrap focusTrapOptions={{ allowOutsideClick: true }}>
          <div ref={popupRef} className='toolbar-modal'>
            {children}
          </div>
        </FocusTrap>
      )}
    </Popup>
  )
}

export default forwardRef(ToolbarModal)
