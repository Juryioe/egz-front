import { Button, Container, TextField, Typography } from '@mui/material'
import axios from 'axios'
import { useFormik } from 'formik'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { baseApiUrl } from '../helper.js'
import { useAuthContext } from '../store/AuthCtxProvider.jsx'

export default function LoginPage() {
  const navigate = useNavigate()

  const { login } = useAuthContext()

  const formik = useFormik({
    initialValues: {
      email: 'e.jurgelevicius@gmail.com',
      password: '123456',
    },
    validationSchema: Yup.object({
      email: Yup.string().email().min(3).max(128).required(),
      password: Yup.string().min(3).max(64).required(),
    }),
    onSubmit: (values) => {
      sendPostData(values)
    },
  })

  function sendPostData(data) {
    axios
      .post(`${baseApiUrl}auth/login`, data)
      .then((response) => {
        toast.success('Sėkmingai prisijungėte prie sistemos')
        login(data.email, response.data.token)
        navigate('/skelbimai')
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
        Prisijungimas
      </Typography>

      <form onSubmit={formik.handleSubmit}>
        <div style={{ marginBottom: 8 }}>
          <TextField
            fullWidth
            id="email"
            name="email"
            variant="outlined"
            margin="normal"
            placeholder="EL. paštas"
            value={formik.values.email}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={formik.touched.email && !!formik.errors.email}
            helperText={formik.touched.email && formik.errors.email}
          />
        </div>

        <div style={{ marginBottom: 8 }}>
          <TextField
            fullWidth
            id="password"
            name="password"
            type="password"
            variant="outlined"
            margin="normal"
            placeholder="Slaptažodis"
            value={formik.values.password}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={formik.touched.password && !!formik.errors.password}
            helperText={formik.touched.password && formik.errors.password}
          />
        </div>

        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <Button type="submit" variant="contained" color="primary">
            Prisijungti
          </Button>
        </div>
      </form>
    </Container>
  )
}
