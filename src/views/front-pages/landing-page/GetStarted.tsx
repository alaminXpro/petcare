// Next Imports
import Link from 'next/link'

// MUI Imports
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

// Third-party Imports
import classnames from 'classnames'

// Component Imports
import DirectionalIcon from '@components/DirectionalIcon'

// Styles Imports
import frontCommonStyles from '@views/front-pages/styles.module.css'

const GetStarted = () => {
  return (
    <section className='relative bg-backgroundPaper'>
      <img
        src='/images/front-pages/landing-page/get-started-bg.png'
        alt='background-image'
        className='absolute is-full flex -z-1 pointer-events-none bs-full block-end-0'
      />
      <div
        className={classnames(
          'flex items-center max-lg:flex-wrap justify-center lg:justify-between gap-y-4 gap-x-28',
          frontCommonStyles.layoutSpacing
        )}
      >
        <div className='flex flex-col items-start gap-y-8 pbs-9 lg:plb-9 z-[1]'>
          <div className='flex flex-col gap-1 max-lg:text-center'>
            <Typography color='primary' className='font-bold text-[32px]'>
              Ready to Get Started?
            </Typography>
            <Typography className='font-medium max-lg:text-center'>
              Start your project with a 14-day free trial
            </Typography>
          </div>
          <Button
            component={Link}
            href='/front-pages/payment'
            variant='contained'
            endIcon={<DirectionalIcon ltrIconClass='ri-arrow-right-line' rtlIconClass='ri-arrow-left-line' />}
            className='max-lg:self-center'
          >
            Get Started
          </Button>
        </div>
        <div className='flex z-[1]'>
          <img
            src='/images/front-pages/landing-page/crm-dashboard.png'
            alt='dashboard-image'
            className='max-is-[600px] is-full'
          />
        </div>
      </div>
    </section>
  )
}

export default GetStarted
