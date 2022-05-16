import { Button } from '@/ui/Shared'
import axios from 'axios'
import React, { useEffect } from 'react'

const ButtonsView = () => {

  useEffect(() => {

  })
  return <div className='divide-list-h-10' style={{ display: 'flex' }}>
    <Button
      onClick={() => {
        axios.post('http://localhost:5000/auth/login', 
        {email: 'string', password: 'string'})
        .then(r => { console.log(r) })
      }}
      variant='primary' text='primary' />
    <Button variant='secondary' text='secondary' />
    <Button variant='outline' text='outline' />
    <Button variant='light' text='light' />
    <Button variant='dark' text='dark' />
    <Button variant='success' text='success' />
    <Button variant='warning' text='warning' />
    <Button variant='danger' text='danger' />
    <Button variant='info' text='info' />
  </div>
}
export default function SettingView() {
  return (
    <div className='container-xl'>
      <ButtonsView />
    </div>
  )
}
