import axios from 'axios'
import Context from '../context/RolesContext'
import { useContext, useEffect } from 'react'
import { ENDPOINT } from '../config/constans'

const Home = () => {
  const { setCargo } = useContext(Context)

  const getDeveloperData = () => {
    const token = window.sessionStorage.getItem('token')
    if (token) {
      axios.get(ENDPOINT.user, { headers: { Authorization: `Bearer ${token}` } })
        .then(({ data: [user] }) => setCargo({ ...user }))
        .catch(() => {
          window.sessionStorage.removeItem('token')
          setCargo(null)
        })
    }
  }

  useEffect(getDeveloperData, [])

  return (
    <div className='py-5'>
      <h1>
        Conversa con nosotros
      </h1>
    </div>
  )
}

export default Home

