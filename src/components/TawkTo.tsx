'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    Tawk_API: any
    Tawk_LoadStart: any
  }
}

type TawkToProps = {
  providerId: string
  itemInfo: {
    id: string
    type: 'product' | 'service'
    name: string
  }
}

export default function TawkTo({ providerId, itemInfo }: TawkToProps) {
  useEffect(() => {
    const Tawk_API = window.Tawk_API || {}
    const Tawk_LoadStart = new Date()

    const loadScript = () => {
      const script = document.createElement('script')

      script.async = true
      script.src = 'https://embed.tawk.to/676bcd7eaf5bfec1dbe1a192/1ifuhlecq'
      script.charset = 'UTF-8'
      script.setAttribute('crossorigin', '*')
      document.body.appendChild(script)
    }

    const setTawkAttributes = (additionalAttributes = {}) => {
      if (window.Tawk_API) {
        window.Tawk_API.setAttributes(
          {
            'custom-provider-id': providerId,
            'custom-item-type': itemInfo.type,
            'custom-item-id': itemInfo.id,
            'custom-item-name': itemInfo.name,
            ...additionalAttributes
          },
          (error: any) => {
            if (error) console.error('Error setting attributes:', error)
            else console.log('Attributes set successfully')
          }
        )
      }
    }

    Tawk_API.onLoad = function () {
      console.log('Tawk widget loaded')
      setTawkAttributes()
    }

    Tawk_API.onPrechatSubmit = function (data: any) {
      console.log('Pre-chat form submitted:', data)
      setTawkAttributes({
        'visitor-name': data.name,
        'visitor-email': data.email,
        'visitor-phone': data.phone
      })
    }

    loadScript()

    return () => {
      const tawkScript = document.querySelector('script[src*="tawk.to"]')

      if (tawkScript) tawkScript.remove()
    }
  }, [providerId, itemInfo])

  return null
}
