// Type Imports
import type { VerticalMenuDataType } from '@/types/menuTypes'

const verticalMenuData = (): VerticalMenuDataType[] => [
  // This is how you will normally render submenu
  {
    label: 'dashboards',
    icon: 'ri-home-smile-line',
    suffix: {
      label: '5',
      color: 'error'
    },
    children: [
      // This is how you will normally render menu item
      {
        label: 'crm',
        href: '/dashboards/crm'
      },
      {
        label: 'analytics',
        href: '/dashboards/analytics'
      },
      {
        label: 'eCommerce',
        href: '/dashboards/ecommerce'
      },
      {
        label: 'academy',
        href: '/dashboards/academy'
      },
      {
        label: 'logistics',
        href: '/dashboards/logistics'
      }
    ]
  },
  {
    label: 'frontPages',
    icon: 'ri-file-copy-line',
    children: [
      {
        label: 'landing',
        href: '/front-pages/landing-page',
        target: '_blank'
      },
      {
        label: 'pricing',
        href: '/front-pages/pricing',
        target: '_blank'
      },
      {
        label: 'payment',
        href: '/front-pages/payment',
        target: '_blank'
      },
      {
        label: 'checkout',
        href: '/front-pages/checkout',
        target: '_blank'
      },
      {
        label: 'helpCenter',
        href: '/front-pages/help-center',
        target: '_blank'
      }
    ]
  },

  // This is how you will normally render menu section
  {
    label: 'appsPages',
    isSection: true,
    children: [
      {
        label: 'eCommerce',
        icon: 'ri-shopping-bag-3-line',
        children: [
          {
            label: 'dashboard',
            href: '/apps/ecommerce/dashboard'
          },
          {
            label: 'products',
            children: [
              {
                label: 'list',
                href: '/apps/ecommerce/products/list'
              },
              {
                label: 'add',
                href: '/apps/ecommerce/products/add'
              },
              {
                label: 'category',
                href: '/apps/ecommerce/products/category'
              }
            ]
          },
          {
            label: 'orders',
            children: [
              {
                label: 'list',
                href: '/apps/ecommerce/orders/list'
              },
              {
                label: 'details',
                href: '/apps/ecommerce/orders/details/5434',
                exactMatch: false,
                activeUrl: '/apps/ecommerce/orders/details'
              }
            ]
          },
          {
            label: 'customers',
            children: [
              {
                label: 'list',
                href: '/apps/ecommerce/customers/list'
              },
              {
                label: 'details',
                href: '/apps/ecommerce/customers/details/879861',
                exactMatch: false,
                activeUrl: '/apps/ecommerce/customers/details'
              }
            ]
          },
          {
            label: 'manageReviews',
            href: '/apps/ecommerce/manage-reviews'
          },
          {
            label: 'referrals',
            href: '/apps/ecommerce/referrals'
          },
          {
            label: 'settings',
            href: '/apps/ecommerce/settings'
          }
        ]
      },
      {
        label: 'academy',
        icon: 'ri-graduation-cap-line',
        children: [
          {
            label: 'dashboard',
            href: '/apps/academy/dashboard'
          },
          {
            label: 'myCourses',
            href: '/apps/academy/my-courses'
          },
          {
            label: 'courseDetails',
            href: '/apps/academy/course-details'
          }
        ]
      },
      {
        label: 'logistics',
        children: [
          {
            label: 'dashboard',
            href: '/apps/logistics/dashboard'
          },
          {
            label: 'fleet',
            href: '/apps/logistics/fleet'
          }
        ]
      },
      {
        label: 'email',
        href: '/apps/email',
        exactMatch: false,
        activeUrl: '/apps/email',
        icon: 'ri-mail-open-line'
      },
      {
        label: 'chat',
        href: '/apps/chat',
        icon: 'ri-wechat-line'
      },
      {
        label: 'calendar',
        href: '/apps/calendar',
        icon: 'ri-calendar-line'
      },
      {
        label: 'kanban',
        href: '/apps/kanban',
        icon: 'ri-drag-drop-line'
      },
      {
        label: 'invoice',
        icon: 'ri-bill-line',
        children: [
          {
            label: 'list',
            href: '/apps/invoice/list'
          },
          {
            label: 'preview',
            href: '/apps/invoice/preview/4987',
            exactMatch: false,
            activeUrl: '/apps/invoice/preview'
          },
          {
            label: 'edit',
            href: '/apps/invoice/edit/4987',
            exactMatch: false,
            activeUrl: '/apps/invoice/edit'
          },
          {
            label: 'add',
            href: '/apps/invoice/add'
          }
        ]
      },
      {
        label: 'user',
        icon: 'ri-user-line',
        children: [
          {
            label: 'list',
            href: '/apps/user/list'
          },
          {
            label: 'view',
            href: '/apps/user/view'
          }
        ]
      },
      {
        label: 'rolesPermissions',
        icon: 'ri-lock-2-line',
        children: [
          {
            label: 'roles',
            href: '/apps/roles'
          },
          {
            label: 'permissions',
            href: '/apps/permissions'
          }
        ]
      },
      {
        label: 'pages',
        icon: 'ri-layout-left-line',
        children: [
          {
            label: 'userProfile',
            href: '/pages/user-profile'
          },
          {
            label: 'accountSettings',
            href: '/pages/account-settings'
          },
          {
            label: 'faq',
            href: '/pages/faq'
          },
          {
            label: 'pricing',
            href: '/pages/pricing'
          },
          {
            label: 'miscellaneous',
            children: [
              {
                label: 'comingSoon',
                href: '/pages/misc/coming-soon',
                target: '_blank'
              },
              {
                label: 'underMaintenance',
                href: '/pages/misc/under-maintenance',
                target: '_blank'
              },
              {
                label: 'pageNotFound404',
                href: '/pages/misc/404-not-found',
                target: '_blank'
              },
              {
                label: 'notAuthorized401',
                href: '/pages/misc/401-not-authorized',
                target: '_blank'
              }
            ]
          }
        ]
      },
      {
        label: 'authPages',
        icon: 'ri-shield-keyhole-line',
        children: [
          {
            label: 'login',
            children: [
              {
                label: 'loginV1',
                href: '/pages/auth/login-v1',
                target: '_blank'
              },
              {
                label: 'loginV2',
                href: '/pages/auth/login-v2',
                target: '_blank'
              }
            ]
          },
          {
            label: 'register',
            children: [
              {
                label: 'registerV1',
                href: '/pages/auth/register-v1',
                target: '_blank'
              },
              {
                label: 'registerV2',
                href: '/pages/auth/register-v2',
                target: '_blank'
              },
              {
                label: 'registerMultiSteps',
                href: '/pages/auth/register-multi-steps',
                target: '_blank'
              }
            ]
          },
          {
            label: 'verifyEmail',
            children: [
              {
                label: 'verifyEmailV1',
                href: '/pages/auth/verify-email-v1',
                target: '_blank'
              },
              {
                label: 'verifyEmailV2',
                href: '/pages/auth/verify-email-v2',
                target: '_blank'
              }
            ]
          },
          {
            label: 'forgotPassword',
            children: [
              {
                label: 'forgotPasswordV1',
                href: '/pages/auth/forgot-password-v1',
                target: '_blank'
              },
              {
                label: 'forgotPasswordV2',
                href: '/pages/auth/forgot-password-v2',
                target: '_blank'
              }
            ]
          },
          {
            label: 'resetPassword',
            children: [
              {
                label: 'resetPasswordV1',
                href: '/pages/auth/reset-password-v1',
                target: '_blank'
              },
              {
                label: 'resetPasswordV2',
                href: '/pages/auth/reset-password-v2',
                target: '_blank'
              }
            ]
          },
          {
            label: 'twoSteps',
            children: [
              {
                label: 'twoStepsV1',
                href: '/pages/auth/two-steps-v1',
                target: '_blank'
              },
              {
                label: 'twoStepsV2',
                href: '/pages/auth/two-steps-v2',
                target: '_blank'
              }
            ]
          }
        ]
      },
      {
        label: 'wizardExamples',
        icon: 'ri-git-commit-line',
        children: [
          {
            label: 'checkout',
            href: '/pages/wizard-examples/checkout'
          },
          {
            label: 'propertyListing',
            href: '/pages/wizard-examples/property-listing'
          },
          {
            label: 'createDeal',
            href: '/pages/wizard-examples/create-deal'
          }
        ]
      },
      {
        label: 'dialogExamples',
        icon: 'ri-tv-2-line',
        href: '/pages/dialog-examples'
      },
      {
        label: 'widgetExamples',
        icon: 'ri-bar-chart-box-line',
        children: [
          {
            label: 'basic',
            href: '/pages/widget-examples/basic'
          },
          {
            label: 'advanced',
            href: '/pages/widget-examples/advanced'
          },
          {
            label: 'statistics',
            href: '/pages/widget-examples/statistics'
          },
          {
            label: 'charts',
            href: '/pages/widget-examples/charts'
          },
          {
            label: 'gamification',
            href: '/pages/widget-examples/gamification'
          },
          {
            label: 'actions',
            href: '/pages/widget-examples/actions'
          }
        ]
      }
    ]
  },
  {
    label: 'formsAndTables',
    isSection: true,
    children: [
      {
        label: 'formLayouts',
        icon: 'ri-layout-4-line',
        href: '/forms/form-layouts'
      },
      {
        label: 'formValidation',
        icon: 'ri-checkbox-multiple-line',
        href: '/forms/form-validation'
      },
      {
        label: 'formWizard',
        icon: 'ri-git-commit-line',
        href: '/forms/form-wizard'
      },
      {
        label: 'reactTable',
        icon: 'ri-table-alt-line',
        href: '/react-table'
      },
      {
        label: 'formELements',
        icon: 'ri-radio-button-line',
        suffix: <i className='ri-external-link-line text-xl' />,
        href: `${process.env.NEXT_PUBLIC_DOCS_URL}/docs/user-interface/form-elements`,
        target: '_blank'
      },
      {
        label: 'muiTables',
        icon: 'ri-table-2',
        href: `${process.env.NEXT_PUBLIC_DOCS_URL}/docs/user-interface/mui-table`,
        suffix: <i className='ri-external-link-line text-xl' />,
        target: '_blank'
      }
    ]
  },
  {
    label: 'chartsMisc',
    isSection: true,
    children: [
      {
        label: 'charts',
        icon: 'ri-bar-chart-2-line',
        children: [
          {
            label: 'apex',
            href: '/charts/apex-charts'
          },
          {
            label: 'recharts',
            href: '/charts/recharts'
          }
        ]
      },

      {
        label: 'foundation',
        icon: 'ri-pantone-line',
        href: `${process.env.NEXT_PUBLIC_DOCS_URL}/docs/user-interface/foundation`,
        suffix: <i className='ri-external-link-line text-xl' />,
        target: '_blank'
      },
      {
        label: 'components',
        icon: 'ri-toggle-line',
        href: `${process.env.NEXT_PUBLIC_DOCS_URL}/docs/user-interface/components`,
        suffix: <i className='ri-external-link-line text-xl' />,
        target: '_blank'
      },
      {
        label: 'menuExamples',
        icon: 'ri-menu-search-line',
        href: `${process.env.NEXT_PUBLIC_DOCS_URL}/docs/menu-examples/overview`,
        suffix: <i className='ri-external-link-line text-xl' />,
        target: '_blank'
      },
      {
        label: 'raiseSupport',
        icon: 'ri-lifebuoy-line',
        href: 'https://pixinvent.ticksy.com',
        suffix: <i className='ri-external-link-line text-xl' />,
        target: '_blank'
      },
      {
        label: 'documentation',
        icon: 'ri-book-line',
        href: 'https://demos.pixinvent.com/materialize-nextjs-admin-template/documentation',
        suffix: <i className='ri-external-link-line text-xl' />,
        target: '_blank'
      },
      {
        label: 'others',
        icon: 'ri-more-line',
        children: [
          {
            suffix: {
              label: 'New',
              color: 'info'
            },
            label: 'itemWithBadge'
          },
          {
            label: 'externalLink',
            href: 'https://pixinvent.com',
            target: '_blank',
            suffix: <i className='ri-external-link-line text-xl' />
          },
          {
            label: 'menuLevels',
            children: [
              {
                label: 'menuLevel2'
              },
              {
                label: 'menuLevel2',
                children: [
                  {
                    label: 'menuLevel3'
                  },
                  {
                    label: 'menuLevel3'
                  }
                ]
              }
            ]
          },
          {
            label: 'disabledMenu',
            disabled: true
          }
        ]
      }
    ]
  }
]

export default verticalMenuData
