import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
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

  const deleteAdvertisement = async (advertisementId) => {
    try {
      await axios.delete(`${baseApiUrl}advertisement/${advertisementId}`, {
        headers: { Authorization: token },
      })
      navigate('/skelbimai')
      toast.success(`Skelbimas ID: ${advertisementId} sėkmingai ištrintas!`)
      const list = advertisementList.filter(
        (advertisement) => advertisement.id !== advertisement.Id
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

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Vardas</TableCell>
                  <TableCell>Pavardė</TableCell>
                  <TableCell>El. paštas</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredAdvertisement.map((advertisement) => (
                  <TableRow key={advertisement.id}>
                    <TableCell>{advertisement.id}</TableCell>
                    <TableCell>{advertisement.title}</TableCell>
                    <TableCell>{advertisement.price}</TableCell>
                    <TableCell>{advertisement.text}</TableCell>
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
