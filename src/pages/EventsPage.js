import { useLoaderData } from "react-router";

import EventsList from "../components/EventsList";

function EventsPage() {
  const data = useLoaderData();
  if (data.error) {
    return <p>Error!</p>;
  }
  const eventsData = data.events;

  return (
    <>
      <EventsList events={eventsData} />
    </>
  );
}

export const getEventData = async () => {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    // setError("Fetching events failed.");
    console.log(response.status);
    // return { error: true, message: "error fetching data"}
    throw new Response("Could not fetch events", { status: 500 });
    
  } else {
    // const resData = await response.json();
    // setFetchedEvents(resData.events);
    return response;
  }
};

export default EventsPage;
