// MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'

import { currentUser } from '@/lib/auth'

import { checkProviderStatus } from '@/actions/provider'

import { ProviderRequestButton } from '@/components/custom/Provider/ProviderRequest'

const BecomeServiceProvider = async () => {
  const providerStatus = await checkProviderStatus()
  const user = await currentUser()

  return (
    <Card>
      <Grid container>
        <Grid item xs={12} sm={7}>
          <CardContent>
            <Typography variant='h5' className='mbe-2'>
              Become a Service Provider
            </Typography>
            <Typography>
              As a service provider, you can offer a variety of pet care products and services. This includes selling
              pet products such as food, toys, and grooming supplies. Additionally, you can provide essential services
              like veterinary care, rescue operations, adoption services, and daycare facilities for pets. These
              offerings ensure that pets receive the best care and attention they deserve.
            </Typography>
            <Divider className='mbs-7 mbe-7' />
            <Grid container>
              <Grid item xs={12} sm={6} className='flex flex-col pie-5 gap-[26px]'>
                <div className='flex items-center gap-2.5'>
                  <div className='flex'>
                    <i className='ri-lock-unlock-line text-xl text-textSecondary' />
                  </div>
                  <Typography>Full Access</Typography>
                </div>
                <div className='flex items-center gap-2.5'>
                  <div className='flex'>
                    <i className='ri-user-3-line text-xl text-textSecondary' />
                  </div>
                  <Typography>15 Members</Typography>
                </div>
              </Grid>
              <Grid item xs={12} sm={6} className='flex flex-col max-sm:mbs-[26px] sm:pis-5 sm:border-is gap-[26px]'>
                <div className='flex items-center gap-2.5'>
                  <div className='flex'>
                    <i className='ri-lock-unlock-line text-xl text-textSecondary' />
                  </div>
                  <Typography>Access all Features</Typography>
                </div>
                <div className='flex items-center gap-2.5'>
                  <div className='flex'>
                    <i className='ri-user-3-line text-xl text-textSecondary' />
                  </div>
                  <Typography>Lifetime Free Update</Typography>
                </div>
              </Grid>
            </Grid>
          </CardContent>
        </Grid>
        <Grid item xs={12} sm={5}>
          <CardContent className='flex items-center justify-center bs-full bg-actionHover'>
            <div className='flex flex-col items-center justify-center gap-2'>
              <div className='flex items-baseline justify-center'>
                <Typography variant='h5'>$</Typography>
                <Typography variant='h1'>10</Typography>
                <Typography variant='h5'>USD</Typography>
              </div>
              <Typography className='flex flex-col text-center'>
                <span>One time fee</span>
                <span>Become Pet Service Provider and earn money</span>
              </Typography>
              <ProviderRequestButton
                initialStatus={user?.role === 'Admin' ? 'Approved' : providerStatus?.approval_status}
              />
            </div>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  )
}

export default BecomeServiceProvider
