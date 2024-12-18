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
              <FaUserCheck /> Email Verified:{' '}
              {user.emailVerified ? new Date(user.emailVerified).toLocaleDateString() : 'No'}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant='body1'>
              <FaUser /> Two-Factor Enabled: {user.isTwoFactorEnabled ? 'Yes' : 'No'}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant='body1'>
              <FaCalendarAlt /> Registered At: {new Date(user.created_at).toLocaleDateString()}
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
