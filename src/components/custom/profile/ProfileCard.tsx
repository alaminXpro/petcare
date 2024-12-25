import React from 'react'

import { Card, CardContent, CardHeader, Avatar, Typography, Grid } from '@mui/material'
import {
  FaEnvelope,
  FaUserCheck,
  FaUser,
  FaCalendarAlt,
  FaClipboardList,
  FaShoppingCart,
  FaStar,
  FaBox,
  FaTools
} from 'react-icons/fa'
import type { User } from '@prisma/client' // Adjust the import based on your project structure
import { format } from 'date-fns'

interface ProfileCardProps {
  user: User
  totalPosts: number
  totalOrders: number
  totalReviews: number
  totalProducts?: number
  totalServices?: number
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  user,
  totalPosts,
  totalOrders,
  totalReviews,
  totalProducts,
  totalServices
}) => {
  const formatDate = (date: string | null) => {
    try {
      return date ? format(new Date(date), 'MM/dd/yyyy') : 'NA'
    } catch (error) {
      return 'Invalid date'
    }
  }

  return (
    <Card>
      <CardHeader
        avatar={<Avatar src={user.image || ''} alt={user.name || 'User'} />}
        title={user.name || 'Anonymous'}
        subheader={user.role}
      />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant='body1'>
              <FaEnvelope /> {user.email}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant='body1'>
              <FaUserCheck /> Email Verified: {formatDate(user.emailVerified)}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant='body1'>
              <FaUser /> Two-Factor Enabled: {user.isTwoFactorEnabled ? 'Yes' : 'No'}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant='body1'>
              <FaCalendarAlt /> Registered At: {formatDate(user.created_at)}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant='body1'>
              <FaClipboardList /> Total Posts: {totalPosts}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant='body1'>
              <FaShoppingCart /> Total Orders: {totalOrders}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant='body1'>
              <FaStar /> Total Reviews: {totalReviews}
            </Typography>
          </Grid>
          {(user.role === 'Admin' || user.role === 'Provider') && (
            <>
              <Grid item xs={12} sm={6}>
                <Typography variant='body1'>
                  <FaBox /> Total Products: {totalProducts || 0}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant='body1'>
                  <FaTools /> Total Services: {totalServices || 0}
                </Typography>
              </Grid>
            </>
          )}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default ProfileCard
