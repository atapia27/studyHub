import IconButton from '@components/IconButton'
import { ReactComponent as CloseIcon } from 'pixelarticons/svg/close.svg'
import { ReactNode } from 'react'

interface ModalProps {
  title?: string
  onClose?: () => void
  children?: ReactNode
}

const Modal = ({ title, onClose, children }: ModalProps) => {
  return (
    <div className="opaque fixed inset-0 flex flex-col gap-5 bg-black p-4">
      <div className="flex justify-between pt-4">
        <div />
        <h1 className="animate-flicker">{title}</h1>
        <IconButton icon={<CloseIcon />} onClick={onClose} />
      </div>
      {children}
    </div>
  )
}

export default Modal
