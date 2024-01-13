import QRCodeStyling from 'qr-code-styling'
import React, { useEffect, useRef } from 'react'

type Props = {
  url: string
  width: number
  height: number
}

function QR({ height, url, width }: Props) {
  const ref = useRef(null)
  const qrCode = new QRCodeStyling({
    height,
    width,
    data: url,
    type: 'svg',
    margin: 0,
    qrOptions: {
      mode: 'Byte',
      errorCorrectionLevel: 'L'
    },
    dotsOptions: { type: 'dots', color: 'white' },
    backgroundOptions: { color: 'transparent' },
    cornersSquareOptions: {
      type: 'extra-rounded',
      color: 'white'
    },
    cornersDotOptions: { type: 'dot', color: 'white' }
  })

  useEffect(() => {
    if (ref.current) {
      qrCode.append(ref.current)
    }
  }, [url])
  useEffect(() => {
    qrCode.update({ width, height })
  }, [width, height])

  return <div ref={ref}></div>
}

export default QR
