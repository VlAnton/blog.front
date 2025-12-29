import axios from 'axios'
import { ROLES } from '@/shared/constants/roles'

const formData = new FormData()
formData.append('username', 'admin')
formData.append('1email', 'test@mail.com')
formData.append('password', '12345678')
axios.post('http://localhost:3001/api/register', formData, {
  headers: { 'Content-Type': 'multipart/form-data' },
  params: {
    roleId: ROLES.ADMIN,
  },
})
