import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EventsPage, { getEventData } from "./pages/EventsPage";
import EventDetailPage, {
  loader as eventDetailLoader, action as deleteEventAction
} from "./pages/EventDetailPage";
import NewEventPage from "./pages/NewEventPage";
import EditEventPage from "./pages/EditEventPage";
import Root from "./pages/Root";
import EventsRootLayout from "./pages/EventsRootLayout";
import Error from "./pages/Error";
import { action as patchEventAction } from './components/EventForm';
import React from "react";
import NewsletterPage, {action as newsLetterAction} from "./pages/Newsletter";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "events",
        element: <EventsRootLayout />,
        children: [
          {
            index: true,
            element: <EventsPage />,
            loader: getEventData,
          },
          {
            path: ":id",
            id: "event-detail",
            loader: eventDetailLoader,
            children: [
              {
                index: true,
                element: <EventDetailPage />,
                action: deleteEventAction,
              },
              {
                path: "edit",
                element: <EditEventPage />,
                action: patchEventAction, //manipulate it
              },
            ],
          },
          { path: "new", element: <NewEventPage />, action: patchEventAction },//new event action
        ],
      },
      {
        path: 'newsletter',
        element: <NewsletterPage/>,
        action: newsLetterAction
      }
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
