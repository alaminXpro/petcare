'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Badge from '@mui/material/Badge'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'

// Third-party Components
import classnames from 'classnames'
import { useKeenSlider } from 'keen-slider/react'
import type { KeenSliderPlugin } from 'keen-slider/react'

// Components Imports
import CustomAvatar from '@core/components/mui/Avatar'

// Libs Imports
import AppKeenSlider from '@/libs/styles/AppKeenSlider'

// Types
type DataType = {
  img: string
  title: string
  details: { [key: string]: string }
}

// Vars
const data: DataType[] = [
  {
    title: 'Fashion',
    img: '/images/cards/apple-watch-green-lg.png',
    details: {
      'T-shirts': '16',
      Shoes: '43',
      Watches: '29',
      SunGlasses: '7'
    }
  },
  {
    title: 'Appliances & Electronics',
    img: '/images/cards/ps4-joystick-lg.png',
    details: {
      "TV's": '16',
      Cameras: '9',
      Speakers: '40',
      Consoles: '18'
    }
  },
  {
    title: 'Mobiles & Computers',
    img: '/images/cards/apple-iphone-x-lg.png',
    details: {
      Mobiles: '24',
      Accessories: '50',
      Tablets: '12',
      Computers: '38'
    }
  }
]

const Slides = () => {
  // Hooks
  const theme = useTheme()

  return (
    <>
      {data.map((slide: DataType, index: number) => {
        return (
          <div key={index} className={classnames('keen-slider__slide flex flex-col justify-between gap-5 p-5 is-full')}>
            <div>
              <Typography variant='h5' className='text-white'>
                Weekly Sales
              </Typography>
              <div className='flex items-center gap-2'>
                <Typography className='text-white'>Total $23.5k Earning</Typography>
                <div className='flex items-center text-success'>
                  <Typography className='font-medium' color='success.main'>
                    +62%
                  </Typography>
                  <i className='ri-arrow-up-s-line text-xl' />
                </div>
              </div>
            </div>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={8} className='order-2 sm:order-1'>
                <div className='flex flex-col gap-3 sm:plb-3'>
                  <Typography variant='h6' className='text-white'>
                    {slide.title}
                  </Typography>
                  <Grid container spacing={5}>
                    {Object.keys(slide.details).map((key: string, index: number) => {
                      return (
                        <Grid item key={index} xs={6}>
                          <div className='flex items-center gap-3'>
                            <CustomAvatar
                              color='primary'
                              variant='rounded'
                              className='font-medium rounded-md bg-primaryDark text-white bs-[30px] is-[43px]'
                            >
                              {slide.details[key]}
                            </CustomAvatar>
                            <Typography className='text-white'>{key}</Typography>
                          </div>
                        </Grid>
                      )
                    })}
                  </Grid>
                </div>
              </Grid>
              <Grid item xs={12} sm={4} className='flex justify-center order-1 sm:order-2'>
                <img
                  src={slide.img}
                  height={150}
                  className={classnames(
                    'max-bs-[188px] md:bs-[150px] xl:bs-[188px] sm:absolute block-end-0 md:block-end-5 xl:block-end-0 end-5',
                    {
                      'scale-x-[-1]': theme.direction === 'rtl'
                    }
                  )}
                />
              </Grid>
            </Grid>
          </div>
        )
      })}
    </>
  )
}

const WeeklySalesBg = () => {
  // States
  const [loaded, setLoaded] = useState<boolean>(false)
  const [currentSlide, setCurrentSlide] = useState<number>(0)

  // Hooks
  const theme = useTheme()

  const ResizePlugin: KeenSliderPlugin = slider => {
    const observer = new ResizeObserver(function () {
      slider.update()
    })

    slider.on('created', () => {
      observer.observe(slider.container)
    })
    slider.on('destroyed', () => {
      observer.unobserve(slider.container)
    })
  }

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      rtl: theme.direction === 'rtl',
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel)
      },
      created() {
        setLoaded(true)
      }
    },
    [
      ResizePlugin,
      slider => {
        let mouseOver = false
        let timeout: number | ReturnType<typeof setTimeout>

        const clearNextTimeout = () => {
          clearTimeout(timeout as number)
        }

        const nextTimeout = () => {
          clearTimeout(timeout as number)
          if (mouseOver) return
          timeout = setTimeout(() => {
            slider.next()
          }, 2000)
        }

        slider.on('created', () => {
          slider.container.addEventListener('mouseover', () => {
            mouseOver = true
            clearNextTimeout()
          })
          slider.container.addEventListener('mouseout', () => {
            mouseOver = false
            nextTimeout()
          })
          nextTimeout()
        })
        slider.on('dragStarted', clearNextTimeout)
        slider.on('animationEnded', nextTimeout)
        slider.on('updated', nextTimeout)
      }
    ]
  )

  return (
    <AppKeenSlider className='bs-full'>
      <Card className='bg-primary bs-full'>
        <div ref={sliderRef} className='keen-slider relative bs-full'>
          {loaded && instanceRef.current && (
            <div className='swiper-dots absolute top-1 inline-end-5'>
              {[...Array(instanceRef.current.track.details.slides.length).keys()].map(idx => {
                return (
                  <Badge
                    key={idx}
                    variant='dot'
                    component='div'
                    className={classnames('mie-[10px] last:m-0', {
                      active: currentSlide === idx
                    })}
                    onClick={() => {
                      instanceRef.current?.moveToIdx(idx)
                    }}
                    sx={{
                      '& .MuiBadge-dot': {
                        minWidth: '6px',
                        width: '6px !important',
                        height: '6px !important'
                      },
                      '&.active .MuiBadge-dot': {
                        backgroundColor: 'var(--mui-palette-common-white) !important'
                      }
                    }}
                  ></Badge>
                )
              })}
            </div>
          )}
          <Slides />
        </div>
      </Card>
    </AppKeenSlider>
  )
}

export default WeeklySalesBg
