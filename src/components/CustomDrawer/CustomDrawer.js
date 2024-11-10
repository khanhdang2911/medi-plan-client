import { useMediaQuery, useTheme } from '@mui/material'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { menuItems } from '~/layouts/components/Header/Footer'
import { serviceLinks } from '~/layouts/components/Header/Footer'
const CustomDrawer = ({ open, setOpen }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const closeDrawer = () => {
    setOpen(false)
  }

  return (
    <Drawer open={open} onClose={closeDrawer} anchor="left" sx={{ '& .MuiDrawer-paper': { width: 200, boxShadow: 3 } }}>
      <List>
        {menuItems.map((item, index) => (
          <NavLink to={item.to} key={index} style={{ textDecoration: 'none', color: 'inherit' }}>
            {({ isActive }) => (
              <ListItem
                sx={{
                  cursor: 'pointer',
                  bgcolor: isActive ? '#ffeaa7' : 'transparent',
                  '&:hover': { bgcolor: '#fdcb6e' },
                  transition: 'background-color 0.3s',
                  marginBottom: 1,
                  borderRadius: 1,
                }}
              >
                <ListItemText
                  primary={item.label}
                  sx={{
                    typography: 'body1',
                    fontWeight: isActive ? 'bold' : 'normal',
                  }}
                />
              </ListItem>
            )}
          </NavLink>
        ))}
        {isMobile &&
          serviceLinks.map((item, index) => {
            return (
              <NavLink key={index}>
                <ListItem
                  sx={{
                    cursor: 'pointer',
                    '&:hover': { bgcolor: '#fdcb6e' },
                    transition: 'background-color 0.3s',
                    marginBottom: 1,
                    borderRadius: 1,
                  }}
                >
                  <ListItemText
                    primary={item.label}
                    sx={{
                      typography: 'body1',
                    }}
                  />
                </ListItem>
              </NavLink>
            )
          })}
      </List>
    </Drawer>
  )
}

export default CustomDrawer
