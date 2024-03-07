import { Box, Typography } from '@mui/material'
// import { useAuthContext } from '../../src/store/AuthCtxProvider'

const HomePage = () => {
  // const { isUserAdmin, isUserLoggedIn, token } = useAuthContext()
  return (
    <Box flex={10} p={5}>
      <Typography
        variant="h4"
        sx={{ paddingBottom: '40px', textAlign: 'center' }}
      >
        Pagrindinis puslapis
      </Typography>
    </Box>
  )
}

export default HomePage
