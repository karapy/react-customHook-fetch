
import { useRouteLoaderData, json, redirect } from "react-router-dom";
import EventItem from '../components/EventItem'

function EventDetailPage() {

  const data = useRouteLoaderData('event-detail');
  
  return (
    <>
      <EventItem event={data.event}/>
    </>
  );
}

export default EventDetailPage;

export const loader = async ({request, params}) => {
  
  const response = await fetch(`http://localhost:8080/events/${params.id}`)

  if (!response.ok) {
    //
    // throw new Response("Could not fetch data id", {status: 500})
    throw json({message: 'could not fetch details for selecrted event.'}, {status: 500})
  }
  
  return response
}


export const action = async ({params, request}) => {
  // here
  const response = await fetch("http://localhost:8080/events/" + params.id, {
    method: request.method,
  });
  if (!response.ok) {
    throw json({message: 'could not delete event.'}, {status: 500})
  }
  return redirect('/events')
}