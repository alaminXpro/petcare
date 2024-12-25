'use client'

import { useState, useEffect, useRef } from 'react'

import { ServiceType } from '@prisma/client'
import {
  Container,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Box,
  Typography
} from '@mui/material'

// Hook Imports
import { useIntersection } from '@/hooks/useIntersection'

import { ServiceCard } from '@/components/service-card'
import type { Service } from '@/types'

export default function Services() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [serviceType, setServiceType] = useState<ServiceType | ''>('')
  const [location, setLocation] = useState('')

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true)

      try {
        const params = new URLSearchParams()

        if (searchQuery) params.append('search', searchQuery)
        if (serviceType) params.append('serviceType', serviceType)
        if (location) params.append('location', location)

        const res = await fetch(`/api/services?${params.toString()}`)
        const data = await res.json()

        if (data.success) {
          setServices(data.services)
        }
      } catch (error) {
        console.error('Failed to fetch services:', error)
      } finally {
        setLoading(false)
      }
    }

    const timeoutId = setTimeout(fetchServices, 300)

    return () => clearTimeout(timeoutId)
  }, [searchQuery, serviceType, location])

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
    <section id='services' ref={ref}>
      <Container maxWidth='xl' sx={{ py: 6 }}>
        <Typography variant='h3' align='center' gutterBottom>
          Our Services
        </Typography>

        <Paper sx={{ p: 2, mb: 4 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder='Search by title or tags...'
                size='small'
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth size='small'>
                <InputLabel>Service Type</InputLabel>
                <Select
                  value={serviceType}
                  label='Service Type'
                  onChange={e => setServiceType(e.target.value as ServiceType | '')}
                >
                  <MenuItem value=''>All</MenuItem>
                  {Object.values(ServiceType).map(type => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                value={location}
                onChange={e => setLocation(e.target.value)}
                placeholder='Search by location...'
                size='small'
              />
            </Grid>
          </Grid>
        </Paper>

        {loading ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>Loading...</Box>
        ) : services.length === 0 ? (
          <Typography align='center' color='text.secondary'>
            No services available.
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {services.map(service => (
              <Grid item xs={12} sm={6} lg={4} key={service.serviceId}>
                <ServiceCard {...service} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </section>
  )
}
