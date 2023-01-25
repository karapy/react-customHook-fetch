import React from 'react'
import Eventform from '../components/EventForm'
import { json, redirect } from 'react-router-dom'

function NewEventPage() {
  return (
    <div><Eventform/></div>
  )
}

export default NewEventPage


export const action = async ({request, params}) => {
  const data = await request.formData();
  const eventData = {
    title: data.get('title'),
    image: data.get('image'),
    date: data.get('date'),
    description: data.get('description'),
  }
  console.log(eventData)

  const response = await fetch('http://localhost:8080/events', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(eventData)
  });
  console.log(response.ok)
  if (!response.ok) {
    throw json({'message': 'counld not save message'}, {status: 500})
  }
  return redirect('/events')

}