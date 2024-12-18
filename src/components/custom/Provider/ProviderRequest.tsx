'use client'

import { useState, useTransition } from 'react'

import { Button } from '@mui/material'
import { toast } from 'sonner'

import type { ApprovalStatus } from '@prisma/client'

import { requestToBeProvider } from '@/actions/provider'

interface ProviderRequestButtonProps {
  initialStatus?: ApprovalStatus | null
}

export function ProviderRequestButton({ initialStatus }: ProviderRequestButtonProps) {
  const [status, setStatus] = useState(initialStatus)
  const [isPending, startTransition] = useTransition()

  if (status) {
    return (
      <Button variant='contained' disabled className='mbs-5'>
        Status: {status}
      </Button>
    )
  }

  const handleRequest = () => {
    startTransition(async () => {
      const result = await requestToBeProvider()

      if (result.error) {
        toast.error(result.error)

        return
      }

      if (result.success) {
        setStatus('Pending')
        toast.success(result.success)
      }
    })
  }

  return (
    <Button variant='contained' className='mbs-5' onClick={handleRequest} disabled={isPending}>
      {isPending ? 'Processing...' : 'Join Now'}
    </Button>
  )
}
