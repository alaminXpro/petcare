'use client'

// React Imports
import { useState } from 'react'

// Next Imports
import Link from 'next/link'

// MUI Imports
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import useMediaQuery from '@mui/material/useMediaQuery'
import useScrollTrigger from '@mui/material/useScrollTrigger'
import type { Theme } from '@mui/material/styles'
import Badge from '@mui/material/Badge'

// Third-party Imports
import classnames from 'classnames'

// Type Imports
import type { Mode } from '@core/types'

// Component Imports
import Logo from '@components/layout/shared/Logo'
import ModeDropdown from '@components/layout/shared/ModeDropdown'
import FrontMenu from './FrontMenu'
import CustomIconButton from '@core/components/mui/IconButton'
import CartSidebar from '@/components/cart-sidebar'

// Util Imports
import { frontLayoutClasses } from '@layouts/utils/layoutClasses'

// Styles Imports
import styles from './styles.module.css'

// Redux Imports
import { useCart } from '@/redux-store/hooks/useCart'

const Header = ({ mode }: { mode: Mode }) => {
  // States
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { itemsCount } = useCart()

  // Hooks
  const isBelowLgScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'))

  // Detect window scroll
  const trigger = useScrollTrigger({
    threshold: 0,
    disableHysteresis: true
  })

  const toggleCart = () => setIsCartOpen(!isCartOpen)

  return (
    <>
      <header className={classnames(frontLayoutClasses.header, styles.header)}>
        <div className={classnames(frontLayoutClasses.navbar, styles.navbar, { [styles.headerScrolled]: trigger })}>
          <div className={classnames(frontLayoutClasses.navbarContent, styles.navbarContent)}>
            {isBelowLgScreen ? (
              <div className='flex items-center gap-2 sm:gap-4'>
                <IconButton onClick={() => setIsDrawerOpen(true)} className='-mis-2'>
                  <i className='ri-menu-line' />
                </IconButton>
                <Link href='/'>
                  <Logo />
                </Link>
                <FrontMenu mode={mode} isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />
              </div>
            ) : (
              <div className='flex items-center gap-10'>
                <Link href='/'>
                  <Logo />
                </Link>
                <FrontMenu mode={mode} isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />
              </div>
            )}
            <div className='flex items-center gap-2 sm:gap-4'>
              <ModeDropdown />
              {isBelowLgScreen ? (
                <CustomIconButton onClick={toggleCart} variant='contained' color='primary'>
                  <Badge badgeContent={itemsCount} color='primary'>
                    <i className='ri-shopping-cart-line text-xl' />
                  </Badge>
                </CustomIconButton>
              ) : (
                <Button
                  onClick={toggleCart}
                  variant='contained'
                  startIcon={
                    <Badge badgeContent={itemsCount} color='primary'>
                      <i className='ri-shopping-cart-line text-xl' />
                    </Badge>
                  }
                  className='whitespace-nowrap'
                >
                  Cart
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>
      <CartSidebar open={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}

export default Header
