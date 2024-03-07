import { Box, Button, Container, TextField, Typography } from '@mui/material'
import axios from 'axios'
import { useFormik } from 'formik'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { baseApiUrl } from '../helper.js'
import { useAuthContext } from '../store/AuthCtxProvider.jsx'

export default function CreateItem() {
  const navigate = useNavigate()

  const { token } = useAuthContext()

  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      email: '',
    },
    validationSchema: Yup.object({
      firstname: Yup.string().min(3).max(64).required(),
      lastname: Yup.string().min(3).max(64).required(),
      email: Yup.string().email().min(3).max(128).required(),
    }),
    onSubmit: (values) => {
      console.log('values ===', values)
      sendPostData(values)
    },
  })

  function sendPostData(data) {
    axios
      .post(`${baseApiUrl}advertisement`, data, {
        headers: { Authorization: token },
      })
      .then((response) => {
        navigate('/skelbimai')
        toast.success('Naujas įrašas sėkmingai pridėtas')
      })
      .catch((error) => {
        toast.error(error.response.data.error)
      })
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography
        variant="h4"
        sx={{ paddingBottom: '40px', textAlign: 'center' }}
      >
        Pridėti naują
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Box mb={2}>
          <TextField
            fullWidth
            id="firstname"
            name="firstname"
            label="Vardas"
            variant="outlined"
            margin="normal"
            value={formik.values.firstname}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={formik.touched.firstname && !!formik.errors.firstname}
            helperText={formik.touched.firstname && formik.errors.firstname}
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            id="lastname"
            name="lastname"
            label="Pavardė"
            variant="outlined"
            margin="normal"
            value={formik.values.lastname}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={formik.touched.lastname && !!formik.errors.lastname}
            helperText={formik.touched.lastname && formik.errors.lastname}
          />
        </Box>
        <Box mb={3}>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="EL. paštas"
            variant="outlined"
            margin="normal"
            value={formik.values.email}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={formik.touched.email && !!formik.errors.email}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Box>
        <Box textAlign="center" mt={2}>
          <Button type="submit" variant="contained" color="primary">
            Pridėti skelbimą
          </Button>
        </Box>
      </form>
    </Container>
  )
}
