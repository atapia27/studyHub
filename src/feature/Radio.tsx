import IconButton from '@components/IconButton'
import OpaqueContainer from '@components/OpaqueContainer'
import Slider from '@components/Slider'
import { ReactComponent as NextIcon } from '@components/icons/Next.svg'
import { ReactComponent as PlayIcon } from '@components/icons/Play.svg'
import { usePlayer } from '@hooks/usePlayer'
import { useRootStore } from '@store/rootStore'
import { observer } from 'mobx-react'
import { ReactComponent as LoaderIcon } from 'pixelarticons/svg/loader.svg'
import { ReactComponent as PauseIcon } from 'pixelarticons/svg/pause.svg'
import { ReactComponent as RadioIcon } from 'pixelarticons/svg/radio-signal.svg'
import { ReactComponent as ShuffleIcon } from 'pixelarticons/svg/shuffle.svg'
import ReactPlayer from 'react-player'

const Radio = () => {
  const { trackStore, uiStore } = useRootStore()

  const { currentTrack, nextTrack, previousTrack, shuffleTrack } = trackStore

  const { openTrackSelector } = uiStore

  const {
    volume,
    isPlaying,
    isLoading,
    setIsLoading,
    togglePlay,
    setVolume,
    setIsPlaying,
  } = usePlayer()

  return trackStore.tracks.length > 0 ? (
    <OpaqueContainer className="w-3/4 min-w-fit">
      <div className="flex flex-col items-start gap-3 self-stretch text-white">
        <div className="animate-flicker flex items-center gap-4">
          <div className="h-full min-w-fit">
            {isLoading ? (
              <IconButton
                className="animate-rotate"
                onClick={openTrackSelector}
                icon={<LoaderIcon />}
              />
            ) : (
              <IconButton
                onClick={openTrackSelector}
                icon={<RadioIcon />}
                isRedGlow={!isPlaying}
              />
            )}
          </div>

          <p className="mb-1 cursor-pointer" onClick={openTrackSelector}>
            {currentTrack.title}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          {isPlaying ? (
            <IconButton onClick={togglePlay} icon={<PauseIcon />} />
          ) : (
            <IconButton onClick={togglePlay} icon={<PlayIcon />} />
          )}
          <IconButton
            onClick={previousTrack}
            icon={<NextIcon className="rotate-180" />}
          />
          <IconButton onClick={nextTrack} icon={<NextIcon />} />
          <IconButton onClick={shuffleTrack} icon={<ShuffleIcon />} />
          <Slider
            className="mb-1"
            value={volume}
            handleChange={(e) => setVolume(parseFloat(e.target.value))}
          />
        </div>

        <ReactPlayer
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onError={() => {
            console.log(
              'Something went wrong with playing this track, skipping to next track...'
            )
            nextTrack()
          }}
          className="hidden"
          url={currentTrack.url}
          playing={isPlaying}
          volume={volume}
          onBuffer={() => setIsLoading(true)}
          onBufferEnd={() => setIsLoading(false)}
        />
      </div>
    </OpaqueContainer>
  ) : null
}

export default observer(Radio)
