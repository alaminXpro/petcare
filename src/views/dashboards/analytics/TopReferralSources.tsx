'use client'

// React Imports
import { useState } from 'react'
import type { SyntheticEvent } from 'react'

// MUI Import
import Tab from '@mui/material/Tab'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Chip from '@mui/material/Chip'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Avatar from '@mui/material/Avatar'
import TabContext from '@mui/lab/TabContext'

// Third-party Imports
import classnames from 'classnames'

// Types Imports
import type { ThemeColor } from '@core/types'

// Components Imports
import OptionMenu from '@core/components/option-menu'

// Style Imports
import tableStyles from '@core/styles/table.module.css'

interface TabAvatarType {
  imgWidth: number
  category: string
  imgHeight: number
}
interface TabContentType {
  revenue: string
  profit: 'positive' | 'negative'
  profitValue: string
  chipColor?: ThemeColor
  status: string
  parameter: string
}
interface TabContentDataType {
  google: TabContentType[]
  facebook: TabContentType[]
  instagram: TabContentType[]
  reddit: TabContentType[]
}

const tabAvatars: TabAvatarType[] = [
  {
    imgWidth: 32.8,
    imgHeight: 34,
    category: 'google'
  },
  {
    imgWidth: 34,
    imgHeight: 34,
    category: 'facebook'
  },
  {
    imgWidth: 34,
    imgHeight: 34,
    category: 'instagram'
  },
  {
    imgWidth: 34,
    imgHeight: 34,
    category: 'reddit'
  }
]

const tabContentData: TabContentDataType = {
  google: [
    {
      revenue: '$42,857',
      profit: 'positive',
      profitValue: '+24%',
      parameter: 'Email Marketing Campaign',
      status: 'active',
      chipColor: 'primary'
    },
    {
      revenue: '$850',
      profit: 'negative',
      profitValue: '-12%',
      parameter: 'Google Workspace',
      status: 'completed',
      chipColor: 'success'
    },
    {
      revenue: '$5,576',
      profit: 'positive',
      profitValue: '+24%',
      parameter: 'Affiliation Program',
      status: 'active',
      chipColor: 'primary'
    },
    {
      revenue: '$0',
      profit: 'positive',
      profitValue: '+0%',
      parameter: 'Google Adsense',
      status: 'in draft',
      chipColor: 'info'
    }
  ],
  facebook: [
    {
      revenue: '$322',
      profit: 'negative',
      profitValue: '-8%',
      parameter: 'Create Audiences in Ads Manager',
      status: 'active',
      chipColor: 'primary'
    },
    {
      revenue: '$5,634',
      profit: 'positive',
      profitValue: '+19%',
      parameter: 'Facebook page advertising',
      status: 'active',
      chipColor: 'primary'
    },
    {
      revenue: '$751',
      profit: 'negative',
      profitValue: '-23%',
      parameter: 'Messenger advertising',
      status: 'expired',
      chipColor: 'error'
    },
    {
      revenue: '$3,585',
      profit: 'positive',
      profitValue: '+21%',
      parameter: 'Video campaign',
      status: 'completed',
      chipColor: 'success'
    }
  ],
  instagram: [
    {
      revenue: '$599',
      profit: 'negative',
      profitValue: '-15%',
      parameter: 'Create shopping advertising',
      status: 'in-draft',
      chipColor: 'info'
    },
    {
      revenue: '$1,467',
      profitValue: '+37%',
      profit: 'positive',
      parameter: 'IGTV advertising',
      status: 'completed',
      chipColor: 'success'
    },
    {
      revenue: '$0',
      profitValue: '+0%',
      profit: 'positive',
      parameter: 'Collection advertising',
      status: 'in-draft',
      chipColor: 'info'
    },
    {
      revenue: '$4,546',
      profitValue: '+29%',
      profit: 'positive',
      parameter: 'Stories advertising',
      status: 'active',
      chipColor: 'primary'
    }
  ],
  reddit: [
    {
      revenue: '$404',
      profitValue: '+2%',
      profit: 'positive',
      parameter: 'Interests advertising',
      status: 'expired',
      chipColor: 'error'
    },
    {
      revenue: '$399',
      profitValue: '+25%',
      profit: 'positive',
      parameter: 'Community advertising',
      status: 'active',
      chipColor: 'primary'
    },
    {
      revenue: '$177',
      profitValue: '+21%',
      profit: 'positive',
      parameter: 'Device advertising',
      status: 'completed',
      chipColor: 'success'
    },
    {
      revenue: '$1,139',
      profitValue: '-5%',
      profit: 'negative',
      parameter: 'Campaigning',
      status: 'active',
      chipColor: 'primary'
    }
  ]
}

const RenderTabContent = ({ data }: { data: TabContentType[] }) => {
  return (
    <div className='overflow-x-auto'>
      <table className={tableStyles.table}>
        <thead className='border-be border-bs'>
          <tr>
            <th className='uppercase bg-transparent'>Parameter</th>
            <th className='uppercase bg-transparent text-end'>Status</th>
            <th className='uppercase bg-transparent text-end'>Profit</th>
            <th className='uppercase bg-transparent text-end'>Revenue</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row: TabContentType, index: number) => (
            <tr key={index}>
              <td>{row.parameter}</td>
              <td className='text-end'>
                <Chip label={row.status} color={row.chipColor} size='small' variant='tonal' className='capitalize' />
              </td>
              <td
                className={classnames(
                  row.profit === 'negative' ? 'text-error' : 'text-success',
                  'font-medium text-end'
                )}
              >
                {row.profitValue}
              </td>
              <td className='font-medium text-end'>{row.revenue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const TopReferralSources = () => {
  // State
  const [value, setValue] = useState<string>('google')

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  const RenderTabAvatar = ({ data }: { data: TabAvatarType }) => (
    <Avatar
      variant='rounded'
      className={classnames(
        value === data.category ? 'border-solid border-primary' : 'border-dashed',
        'is-[92px] bs-[86px] border-2 bg-transparent rounded'
      )}
    >
      <img
        src={`/images/cards/social-${data.category}.png`}
        alt={`${data.category}`}
        width={data.imgWidth}
        height={data.imgHeight}
      />
    </Avatar>
  )

  return (
    <Card>
      <CardHeader
        title='Top Referral Sources'
        subheader='Number of Sales'
        action={<OptionMenu options={['Last 28 Days', 'Last Month', 'Last Year']} />}
      />
      <TabContext value={value}>
        <TabList
          variant='scrollable'
          scrollButtons='auto'
          onChange={handleChange}
          aria-label='top referral sources tabs'
          className='!border-be-0 pli-5'
          sx={{
            '& .MuiTab-root:not(:last-child)': { mr: 4 },
            '& .MuiTab-root:hover': { border: 0 },
            '& .MuiTabs-indicator': { display: 'none !important' }
          }}
        >
          <Tab disableRipple value='google' className='p-0' label={<RenderTabAvatar data={tabAvatars[0]} />} />
          <Tab disableRipple value='facebook' className='p-0' label={<RenderTabAvatar data={tabAvatars[1]} />} />
          <Tab disableRipple value='instagram' className='p-0' label={<RenderTabAvatar data={tabAvatars[2]} />} />
          <Tab disableRipple value='reddit' className='p-0' label={<RenderTabAvatar data={tabAvatars[3]} />} />
          <Tab
            disabled
            value='add'
            className='p-0'
            label={
              <Avatar variant='rounded' className='is-[92px] bs-[86px] border-2 border-dashed bg-transparent rounded'>
                <div className='flex justify-center items-center bg-actionSelected rounded-lg p-1'>
                  <i className='ri-add-line text-textSecondary text-[22px]' />
                </div>
              </Avatar>
            }
          />
        </TabList>

        <TabPanel sx={{ p: 0 }} value='google'>
          <RenderTabContent data={tabContentData['google']} />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='facebook'>
          <RenderTabContent data={tabContentData['facebook']} />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='instagram'>
          <RenderTabContent data={tabContentData['instagram']} />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='reddit'>
          <RenderTabContent data={tabContentData['reddit']} />
        </TabPanel>
      </TabContext>
    </Card>
  )
}

export default TopReferralSources
