// React Imports
import { useEffect, useRef } from 'react'

// MUI Imports
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

// Icon Imports
import { Stethoscope, Scissors, GraduationCap, Home, Dog, Apple } from 'lucide-react'

// Third-party Imports
import classnames from 'classnames'

// Hook Imports
import { useIntersection } from '@/hooks/useIntersection'

// SVG Imports
import Lines from '@assets/svg/front-pages/landing-page/Lines'

// Styles Imports
import styles from './styles.module.css'
import frontCommonStyles from '@views/front-pages/styles.module.css'

// Data
const feature = [
  {
    icon: <Stethoscope size={24} />,
    title: 'Veterinary Care',
    description: '24/7 access to licensed veterinarians for regular checkups and emergency care.'
  },
  {
    icon: <Scissors size={24} />,
    title: 'Pet Grooming',
    description: 'Professional grooming services including bathing, trimming, and nail care.'
  },
  {
    icon: <GraduationCap size={24} />,
    title: 'Pet Training',
    description: 'Expert behavioral training and socialization programs for your pets.'
  },
  {
    icon: <Home size={24} />,
    title: 'Pet Boarding',
    description: 'Safe and comfortable boarding facilities when you need to travel.'
  },
  {
    icon: <Dog size={24} />,
    title: 'Pet Walking',
    description: 'Regular exercise and outdoor activities with professional pet walkers.'
  },
  {
    icon: <Apple size={24} />,
    title: 'Pet Nutrition',
    description: 'Customized diet plans and premium pet food delivery services.'
  }
]

const UsefulFeature = () => {
  // Refs
  const skipIntersection = useRef(true)
  const ref = useRef<null | HTMLDivElement>(null)

  // Hooks
  const { updateIntersections } = useIntersection()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (skipIntersection.current) {
          skipIntersection.current = false

          return
        }

        updateIntersections({ [entry.target.id]: entry.isIntersecting })
      },
      { threshold: 0.35 }
    )

    ref.current && observer.observe(ref.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section id='features' ref={ref} className='bg-backgroundPaper'>
      <div className={classnames('flex flex-col gap-12 plb-[100px]', frontCommonStyles.layoutSpacing)}>
        <div className={classnames('flex flex-col items-center justify-center')}>
          <div className='flex items-center justify-center mbe-6 gap-3'>
            <Lines />
            <Typography color='text.primary' className='font-medium uppercase'>
              Our Services
            </Typography>
          </div>
          <div className='flex items-baseline max-sm:flex-col gap-x-2 mbe-3 sm:mbe-2'>
            <Typography variant='h4' className='font-bold'>
              Comprehensive Care
            </Typography>
            <Typography variant='h5'>for Your Furry Friends</Typography>
          </div>
          <Typography className='font-medium text-center'>
            Professional pet care services tailored to meet all your pet&apos;s needs under one roof.
          </Typography>
        </div>
        <div>
          <Grid container rowSpacing={12} columnSpacing={6}>
            {feature.map((item, index) => (
              <Grid item xs={12} sm={6} lg={4} key={index}>
                <div className='flex flex-col gap-2 justify-center items-center'>
                  <div className={classnames('mbe-2', styles.featureIcon)}>
                    <div className='flex items-center border-2 rounded-full p-5 is-[82px] bs-[82px]'>{item.icon}</div>
                  </div>
                  <Typography variant='h5'>{item.title}</Typography>
                  <Typography className='max-is-[364px] text-center'>{item.description}</Typography>
                </div>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </section>
  )
}

export default UsefulFeature
