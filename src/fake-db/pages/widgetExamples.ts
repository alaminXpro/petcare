// Type Imports
import type { CardStatsType } from '@/types/pages/widgetTypes'

export const db: CardStatsType = {
  statsVertical: [
    {
      stats: '155k',
      title: 'Total Orders',
      trendNumber: '22%',
      chipText: 'Last 4 Month',
      avatarColor: 'primary',
      avatarIcon: 'ri-shopping-cart-line'
    },
    {
      stats: '$89.34k',
      title: 'Total Profit',
      trend: 'negative',
      trendNumber: '18%',
      chipText: 'Last One Year',
      avatarColor: 'warning',
      avatarIcon: 'ri-money-dollar-circle-line'
    },
    {
      stats: '142.8k',
      title: 'Total Impression',
      trendNumber: '62%',
      chipText: 'Last One Year',
      avatarColor: 'info',
      avatarIcon: 'ri-link'
    },
    {
      stats: '$13.4k',
      title: 'Total Sales',
      trendNumber: '38%',
      chipText: 'Last Six Months',
      avatarColor: 'success',
      avatarIcon: 'ri-handbag-line'
    },
    {
      stats: '$8.16k',
      title: 'Total Expenses',
      trend: 'negative',
      trendNumber: '16%',
      chipText: 'Last One Month',
      avatarColor: 'error',
      avatarIcon: 'ri-bank-card-line'
    },
    {
      stats: '$2.55k',
      title: 'Transactions',
      trendNumber: '38%',
      chipText: 'Last One Year',
      avatarColor: 'secondary',
      avatarIcon: 'ri-pie-chart-2-line '
    }
  ],
  statsCharacter: [
    {
      stats: '8.14k',
      title: 'Ratings',
      trendNumber: '15.6%',
      chipColor: 'primary',
      chipText: `Year of ${new Date().getFullYear()}`,
      src: '/images/illustrations/characters/10.png'
    },
    {
      stats: '12.2k',
      title: 'Sessions',
      trend: 'negative',
      trendNumber: '25.5%',
      chipColor: 'success',
      chipText: 'Last Month',
      src: '/images/illustrations/characters/11.png'
    },
    {
      stats: '42.4k',
      title: 'Customers',
      trendNumber: '9.2%',
      chipColor: 'warning',
      chipText: 'Daily Customers',
      src: '/images/illustrations/characters/12.png'
    },
    {
      stats: '4.25k',
      title: 'Total Orders',
      trendNumber: '10.8%',
      chipColor: 'secondary',
      chipText: 'Last Week',
      src: '/images/illustrations/characters/13.png'
    }
  ],
  statsHorizontal: [
    {
      stats: '2,856',
      title: 'New Customers',
      trendNumber: '8.1%',
      avatarColor: 'primary',
      avatarIcon: 'ri-user-star-line'
    },
    {
      stats: '$28.5K',
      title: 'Total Profit',
      trend: 'up',
      trendNumber: '18.2%',
      avatarColor: 'warning',
      avatarIcon: 'ri-pie-chart-2-line '
    },
    {
      stats: '2,450k',
      title: 'New Transactions',
      trendNumber: '24.6%',
      avatarColor: 'info',
      avatarIcon: 'ri-bank-card-line'
    },
    {
      stats: '$48.2K',
      title: 'Total Revenue',
      trend: 'up',
      trendNumber: '22.5%',
      avatarColor: 'success',
      avatarIcon: 'ri-money-dollar-circle-line'
    }
  ],
  statsHorizontalWithAvatar: [
    {
      stats: '$24,983',
      title: 'Total Earning',
      avatarIcon: 'ri-money-dollar-circle-line',
      avatarColor: 'primary'
    },
    {
      stats: '$8,647',
      title: 'Unpaid Earning',
      avatarIcon: 'ri-gift-line',
      avatarColor: 'success'
    },
    {
      stats: '2,367',
      title: 'Signups',
      avatarIcon: 'ri-group-line',
      avatarColor: 'error'
    },
    {
      stats: '4.5%',
      title: 'Conversion Rate',
      avatarIcon: 'ri-refresh-line',
      avatarColor: 'info'
    }
  ],
  statsHorizontalWithBorder: [
    {
      title: 'On route vehicles',
      stats: 42,
      trendNumber: 18.2,
      avatarIcon: 'ri-car-line',
      color: 'primary'
    },
    {
      title: 'Vehicles with errors',
      stats: 8,
      trendNumber: -8.7,
      avatarIcon: 'ri-alert-line',
      color: 'warning'
    },
    {
      title: 'Deviated from route',
      stats: 27,
      trendNumber: 4.3,
      avatarIcon: 'ri-route-line',
      color: 'error'
    },
    {
      title: 'Late vehicles',
      stats: 13,
      trendNumber: 2.5,
      avatarIcon: 'ri-time-line',
      color: 'info'
    }
  ],
  customerStats: [
    {
      color: 'primary',
      avatarIcon: 'ri-money-dollar-circle-line',
      title: 'account balance',
      stats: '$7480',
      content: ' Credit Left',
      description: 'Account balance for next purchase'
    },
    {
      color: 'success',
      avatarIcon: 'ri-gift-line',
      title: 'loyalty program',
      chipLabel: 'Platinum member',
      description: '3000 points to next tier'
    },
    {
      color: 'warning',
      avatarIcon: 'ri-star-smile-line',
      title: 'wishlist',
      stats: '15',
      content: 'Items in wishlist',
      description: 'Receive notifications on price drops'
    },
    {
      color: 'info',
      avatarIcon: 'ri-vip-crown-line',
      title: 'coupons',
      stats: '21',
      content: 'Coupons you win',
      description: 'Use coupon on next purchase'
    }
  ]
}
