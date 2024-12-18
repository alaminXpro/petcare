// MUI Imports
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

// Type Imports
import type { ProfileHeaderType } from '@/types/pages/profileTypes'

const UserProfileHeader = ({ data }: { data?: ProfileHeaderType }) => {
  return (
    <Card>
      <CardMedia image={data?.coverImg} className='bs-[250px]' />
      <CardContent className='flex justify-center flex-col items-center gap-6 md:items-end md:flex-row !pt-0 md:justify-start'>
        <div className='flex rounded-bs-xl mbs-[-30px] mli-[-5px] border-[5px] border-be-0 border-backgroundPaper bg-backgroundPaper'>
          <img height={120} width={120} src={data?.profileImg} className='rounded' alt='Profile Background' />
        </div>
        <div className='flex is-full flex-wrap justify-start flex-col items-center sm:flex-row sm:justify-between sm:items-end gap-5'>
          <div className='flex flex-col items-center sm:items-start gap-2'>
            <Typography variant='h4'>{data?.fullName}</Typography>
            <div className='flex flex-wrap gap-6 gap-y-3 justify-center sm:justify-normal min-bs-[38px]'>
              <div className='flex items-center gap-2'>
                {data?.designationIcon && <i className={data?.designationIcon} />}
                <Typography className='font-medium'>{data?.designation}</Typography>
              </div>
              <div className='flex items-center gap-2'>
                <i className='ri-map-pin-line' />
                <Typography className='font-medium'>{data?.location}</Typography>
              </div>
              <div className='flex items-center gap-2'>
                <i className='ri-calendar-line' />
                <Typography className='font-medium'>{data?.joiningDate}</Typography>
              </div>
            </div>
          </div>
          <Button variant='contained' className='flex gap-2'>
            <i className='ri-user-follow-line text-base'></i>
            <span>Connected</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default UserProfileHeader
