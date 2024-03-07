import { Button, Container, TextField, Typography } from '@mui/material'
import axios from 'axios'
import { useFormik } from 'formik'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { baseApiUrl } from '../helper'

export default function RegisterPage() {
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      password_confirm: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email()
        .min(3)
        .max(128)
        .required('El. paštas privalomas laukas'),
      password: Yup.string()
        .min(3)
        .max(64)
        .required('Slaptažodis privalomas laukas'),
      password_confirm: Yup.string()
        .required('Pakartotinas slaptažodis privalomas laukas')
        .oneOf([Yup.ref('password'), null], 'Slaptažodžiai turi sutapti'),
    }),
    onSubmit: (values) => {
      sendAxiosPost({
        email: values.email,
        password: values.password,
      })
    },
  })

  function sendAxiosPost(data) {
    axios
      .post(`${baseApiUrl}auth/register`, data)
      .then((response) => {
        formik.resetForm()
        navigate('/')
        toast.success('Vartotojas sėkmingai sukurtas')
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
        Registracija
      </Typography>

      <form onSubmit={formik.handleSubmit}>
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

        <TextField
          fullWidth
          id="password"
          name="password"
          label="Slaptažodis"
          type="password"
          variant="outlined"
          margin="normal"
          value={formik.values.password}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={formik.touched.password && !!formik.errors.password}
          helperText={formik.touched.password && formik.errors.password}
        />

        <TextField
          fullWidth
          id="password-confirm"
          name="password_confirm"
          label="Slaptažodžio pakartojimas"
          type="password"
          variant="outlined"
          margin="normal"
          value={formik.values.password_confirm}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={
            formik.touched.password_confirm && !!formik.errors.password_confirm
          }
          helperText={
            formik.touched.password_confirm && formik.errors.password_confirm
          }
        />

        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <Button type="submit" variant="contained" color="primary">
            Registruotis
          </Button>
        </div>
      </form>
    </Container>
  )
}
