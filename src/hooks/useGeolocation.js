import { useState } from 'react'

export function useGeolocation() {
  const [location, setLocation] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function requestLocation(onSuccess) {
    if (!navigator.geolocation) {
      setError('Location is not supported by this browser.')
      return
    }
    setLoading(true)
    setError('')
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude })
        setLoading(false)
        onSuccess?.()
      },
      () => {
        setError('Could not get your location. Allow location access and try again.')
        setLoading(false)
      },
      { timeout: 10000 },
    )
  }

  return { location, error, loading, requestLocation }
}