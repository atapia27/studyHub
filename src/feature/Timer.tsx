import IconButton from '@components/IconButton'
import Popup from '@components/Popup'
import { ReactComponent as PlayIcon } from '@components/icons/Play.svg'
import useTimer from '@hooks/useTimer'
import { useRootStore } from '@store/rootStore'
import { ReactComponent as PauseIcon } from 'pixelarticons/svg/pause.svg'
import { ReactComponent as PlusIcon } from 'pixelarticons/svg/plus.svg'
import { ReactComponent as ResetIcon } from 'pixelarticons/svg/reload.svg'
import { useEffect } from 'react'

interface Props {
  onClose: () => void
  className?: string
}

const Timer = ({ onClose, className }: Props) => {
  const {
    play,
    pause,
    isRunning,
    reset,
    getDisplayTime,
    incrementTimer,
    isDone,
  } = useTimer(300)
  const { minutesDisplay, secondsDisplay } = getDisplayTime()

  const {
    uiStore: { setIsTimerDone },
  } = useRootStore()

  useEffect(() => {
    if (isDone) {
      setIsTimerDone(true)
    } else {
      setIsTimerDone(false)
    }
  }, [isDone, setIsTimerDone])

  return (
    <Popup className={`${className}`} onClose={onClose}>
      <div
        className={`flex w-full items-center justify-center ${
          minutesDisplay == '00' && secondsDisplay == '00' && 'red-text-glow'
        }`}
      >
        {minutesDisplay} : {secondsDisplay}
      </div>

      <div className="flex w-full items-center justify-center gap-4">
        {isRunning ? (
          <IconButton icon={<PauseIcon />} onClick={pause} />
        ) : (
          <IconButton icon={<PlayIcon />} onClick={play} />
        )}
        <IconButton icon={<ResetIcon />} onClick={reset} />
        <IconButton icon={<PlusIcon />} onClick={() => incrementTimer(300)} />
      </div>
    </Popup>
  )
}

export default Timer
