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
import CustomAvatar from '@core/components/mui/Avatar'

// Style Imports
import tableStyles from '@core/styles/table.module.css'

interface TabAvatarType {
  imgWidth: number
  category: string
  imgHeight: number
}
interface TabContentType {
  price: string
  profit: 'negative' | 'positive'
  profitValue: string
  imgAlt: string
  imgSrc: string
  chipColor?: ThemeColor
  chipLabel: string
  product: string
}
interface TabContentDataType {
  mobile: TabContentType[]
  desktop: TabContentType[]
  console: TabContentType[]
}

const tabAvatars: TabAvatarType[] = [
  {
    imgWidth: 26,
    imgHeight: 52,
    category: 'mobile'
  },
  {
    imgWidth: 50,
    imgHeight: 40,
    category: 'desktop'
  },
  {
    imgWidth: 57,
    imgHeight: 40,
    category: 'console'
  }
]

const tabContentData: TabContentDataType = {
  mobile: [
    {
      price: '$12.5k',
      profit: 'positive',
      profitValue: '+24%',
      imgAlt: 'samsung-s22',
      product: 'Samsung s22',
      imgSrc: '/images/cards/samsung-s22.png',
      chipColor: 'primary',
      chipLabel: 'Out of Stock'
    },
    {
      price: '$45k',
      profit: 'negative',
      profitValue: '-18%',
      imgAlt: 'apple-iPhone-13-pro',
      product: 'iPhone 14 Pro',
      imgSrc: '/images/cards/apple-iPhone-13-pro.png',
      chipColor: 'success',
      chipLabel: 'In Stock'
    },
    {
      price: '$98.2k',
      profit: 'positive',
      profitValue: '+55%',
      imgAlt: 'oneplus-9-pro',
      product: 'Oneplus 9 Pro',
      imgSrc: '/images/cards/oneplus-9-pro.png',
      chipColor: 'warning',
      chipLabel: 'Upcoming'
    },
    {
      price: '$210k',
      profit: 'positive',
      profitValue: '+8%',
      imgAlt: 'google-pixel-6',
      product: 'Google Pixel 6',
      imgSrc: '/images/cards/google-pixel-6.png',
      chipColor: 'success',
      chipLabel: 'In Stock'
    }
  ],
  desktop: [
    {
      price: '$17.5k',
      profit: 'positive',
      profitValue: '+24%',
      imgAlt: 'apple-mac-mini',
      product: 'Apple Mac Mini',
      imgSrc: '/images/cards/apple-mac-mini.png',
      chipColor: 'primary',
      chipLabel: 'Out of Stock'
    },
    {
      price: '$35k',
      profit: 'negative',
      profitValue: '-16%',
      imgAlt: 'hp-envy-x360',
      product: 'Newest HP Envy x360',
      imgSrc: '/images/cards/hp-envy-x360.png',
      chipColor: 'success',
      chipLabel: 'In Stock'
    },
    {
      price: '$220k',
      profit: 'positive',
      profitValue: '+80%',
      imgAlt: 'dell-inspiron-3000',
      product: 'Dell Inspiron 3000',
      imgSrc: '/images/cards/dell-inspiron-3000.png',
      chipColor: 'success',
      chipLabel: 'In Stock'
    },
    {
      price: '$88.2k',
      profit: 'positive',
      profitValue: '+54%',
      imgAlt: 'apple-iMac-4k',
      product: 'Apple iMac 4k',
      imgSrc: '/images/cards/apple-iMac-4k.png',
      chipColor: 'warning',
      chipLabel: 'Upcoming'
    }
  ],
  console: [
    {
      price: '$599',
      profit: 'positive',
      profitValue: '+80%',
      imgAlt: 'sony-play-station-5',
      product: 'Sony Play Station 5',
      imgSrc: '/images/cards/sony-play-station-5.png',
      chipColor: 'success',
      chipLabel: 'In Stock'
    },
    {
      price: '$489',
      profit: 'negative',
      profitValue: '-16%',
      imgAlt: 'xbox-series-x',
      product: 'XBOX Series X',
      imgSrc: '/images/cards/xbox-series-x.png',
      chipColor: 'warning',
      chipLabel: 'Upcoming'
    },
    {
      price: '$335',
      profit: 'positive',
      profitValue: '+54%',
      imgAlt: 'nintendo-switch',
      product: 'Nintendo Switch',
      imgSrc: '/images/cards/nintendo-switch.png',
      chipColor: 'primary',
      chipLabel: 'Out of Stock'
    },
    {
      price: '$14',
      profit: 'negative',
      profitValue: '-28%',
      imgAlt: 'sup-game-box-400',
      product: 'SUP Game Box 400',
      imgSrc: '/images/cards/sup-game-box-400.png',
      chipColor: 'success',
      chipLabel: 'In Stock'
    }
  ]
}

const RenderTabContent = ({ data }: { data: TabContentType[] }) => {
  return (
    <div className='overflow-x-auto'>
      <table className={tableStyles.table}>
        <thead className='border-be border-bs'>
          <tr>
            <th className='uppercase bg-transparent'>Image</th>
            <th className='uppercase bg-transparent'>Name</th>
            <th className='uppercase bg-transparent text-end'>Status</th>
            <th className='uppercase bg-transparent text-end'>Revenue</th>
            <th className='uppercase bg-transparent text-end'>Profit</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row: TabContentType, index: number) => (
            <tr key={index}>
              <td>
                <CustomAvatar alt={row.imgAlt} src={row.imgSrc} variant='rounded' size={34} />
              </td>
              <td>{row.product}</td>
              <td className='text-end'>
                <Chip label={row.chipLabel} color={row.chipColor} size='small' variant='tonal' />
              </td>
              <td className='font-medium text-end'>{row.price}</td>
              <td
                className={classnames(
                  row.profit === 'negative' ? 'text-error' : 'text-success',
                  'font-medium text-end'
                )}
              >
                {row.profitValue}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const TopReferralSources = () => {
  // State
  const [value, setValue] = useState<string>('mobile')

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
        src={`/images/cards/${data.category}.png`}
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
          <Tab disableRipple value='mobile' className='p-0' label={<RenderTabAvatar data={tabAvatars[0]} />} />
          <Tab disableRipple value='desktop' className='p-0' label={<RenderTabAvatar data={tabAvatars[1]} />} />
          <Tab disableRipple value='console' className='p-0' label={<RenderTabAvatar data={tabAvatars[2]} />} />
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

        <TabPanel sx={{ p: 0 }} value='mobile'>
          <RenderTabContent data={tabContentData['mobile']} />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='desktop'>
          <RenderTabContent data={tabContentData['desktop']} />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='console'>
          <RenderTabContent data={tabContentData['console']} />
        </TabPanel>
      </TabContext>
    </Card>
  )
}

export default TopReferralSources
