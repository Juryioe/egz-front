import { Box, Typography } from '@mui/material'
import Post from '../components/Post/Post'

const Feed = () => {
  return (
    <Box flex={10} p={5}>
      <Typography
        variant="h4"
        sx={{ paddingBottom: '40px', textAlign: 'center' }}
      >
        Visi items cia
      </Typography>
      <Post />
      <Post />
      <Post />
    </Box>
  )
}

export default Feed
