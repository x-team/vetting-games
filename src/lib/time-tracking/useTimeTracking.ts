import { useContext } from 'react'
import { timeTrackingContext } from './context'

export const useTimeTracking = () => {
  const timeTrackData = useContext(timeTrackingContext)

  return timeTrackData
}
