import { Favorite, FavoriteBorder, Share } from '@mui/icons-material'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Container,
  IconButton,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material'
import axios from 'axios'
import { useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../src/store/AuthCtxProvider'
import { baseApiUrl } from '../helper'
import useApiData from '../hooks/useApiData'

export default function Feed() {
  const [filterValue, setFilterValue] = useState('')
  const [advertisementList, setAdvertisementList] = useApiData(
    `${baseApiUrl}advertisement`
  )
  const { isUserAdmin, isUserLoggedIn, token } = useAuthContext()
  const navigate = useNavigate()

  console.log(advertisementList)

  const deleteAdvertisement = async (advertisementId) => {
    try {
      await axios.delete(`${baseApiUrl}advertisement/${advertisementId}`, {
        headers: { Authorization: token },
      })
      navigate('/skelbimai')
      toast.success(`Skelbimas ID: ${advertisementId} sėkmingai ištrintas!`)
      const list = advertisementList.filter(
        (advertisement) => advertisement.id !== advertisementId
      )
      setAdvertisementList(list)
    } catch (error) {
      toast.error(error.response.data.error)
    }
  }

  const filteredAdvertisement = useMemo(() => {
    return advertisementList.filter(
      (ad) =>
        ad.title.toLowerCase().includes(filterValue.toLowerCase()) ||
        ad.price.toLowerCase().includes(filterValue.toLowerCase()) ||
        ad.text.toLowerCase().includes(filterValue.toLowerCase())
    )
  }, [advertisementList, filterValue])

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value)
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography
        variant="h4"
        sx={{ paddingBottom: '40px', textAlign: 'center' }}
      >
        Skelbimų sąrašas
      </Typography>

      <Box mt={3}>
        <TextField
          fullWidth
          variant="outlined"
          label="Paieška"
          value={filterValue}
          onChange={handleFilterChange}
        />
      </Box>

      <Card sx={{ mt: 2 }}>
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>
                    <Typography variant="subtitle1" fontWeight="bold">
                      ID
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Pavadinimas
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Kaina
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Aprašymas
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Telefono nr.
                    </Typography>
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredAdvertisement.map((advertisement) => (
                  <TableRow key={advertisement.id}>
                    <TableCell sx={{ width: '100px' }}>
                      <CardActions disableSpacing>
                        <IconButton aria-label="add to favorites">
                          <Checkbox
                            icon={<FavoriteBorder />}
                            checkedIcon={<Favorite sx={{ color: 'red' }} />}
                          />
                        </IconButton>
                        <IconButton aria-label="share">
                          <Share />
                        </IconButton>
                      </CardActions>
                    </TableCell>
                    <TableCell>{advertisement.id}</TableCell>
                    <TableCell>{advertisement.title}</TableCell>
                    <TableCell>{`${advertisement.price} EUR`}</TableCell>
                    <TableCell>{advertisement.text}</TableCell>
                    <TableCell>{advertisement.phone}</TableCell>
                    <TableCell>
                      {isUserLoggedIn && (
                        <>
                          <Link
                            to={`/edit-advertisement/${advertisement.id}`}
                            component={Button}
                            variant="contained"
                            color="primary"
                            sx={{ mr: 1 }}
                          >
                            Redaguoti
                          </Link>
                          {isUserAdmin && (
                            <Button
                              variant="contained"
                              color="error"
                              onClick={() =>
                                deleteAdvertisement(advertisement.id)
                              }
                            >
                              Ištrinti
                            </Button>
                          )}
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Container>
  )
}
