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
      title: '',
      price: '',
      text: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().min(3).max(64).required(),
      price: Yup.string().min(3).max(64).required(),
      text: Yup.string().required(),
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
            id="title"
            name="title"
            label="Skelbimo pavadinimas "
            variant="outlined"
            margin="normal"
            value={formik.values.title}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={formik.touched.title && !!formik.errors.title}
            helperText={formik.touched.title && formik.errors.title}
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            id="price"
            name="price"
            label="Pardavimo kaina"
            variant="outlined"
            margin="normal"
            value={formik.values.price}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={formik.touched.price && !!formik.errors.price}
            helperText={formik.touched.price && formik.errors.price}
          />
        </Box>
        <Box mb={3}>
          <TextField
            fullWidth
            id="text"
            name="text"
            label="Tekstas"
            variant="outlined"
            margin="normal"
            value={formik.values.text}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={formik.touched.text && !!formik.errors.text}
            helperText={formik.touched.text && formik.errors.text}
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
