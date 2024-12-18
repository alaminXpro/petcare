import { type Metadata } from 'next'
import { Card, CardContent, Typography } from '@mui/material'

import ProvidersTable from '@/components/custom/Provider/ProvidersTable'

import { getProviders } from '@/actions/provider'

export const metadata: Metadata = {
  title: 'Providers Management',
  description: 'Manage service providers approval and status'
}

async function ProvidersPage() {
  const providers = await getProviders()

  return (
    <CardContent>
      <Typography variant='h5' gutterBottom>
        Service Providers Management
      </Typography>
      <ProvidersTable providers={providers} />
    </CardContent>
  )
}

export default ProvidersPage
