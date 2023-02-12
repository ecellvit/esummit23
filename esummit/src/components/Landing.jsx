import { useState } from "react";
import Card from "./card";

const data = [
  {
    _id: "5f23b7fc4b8c4e4a4c4a4b5d",
    title: "E-Talk",
    description:
      "Like a leitmotif, there exists the ubiquitous fanfare about the business coliseum. Veterans for the improvement of the entrepreneurial milieu embrace the younger minds equipped to ideate with their experiential journeys. E-Talk brings an opportunity for the eminent young minds for bringing ambitious solutions in the arena of new age thinking.",
    date: "2022-07-15",
    time: "09:00",
    location: "Ampitheatre",
    imgUrl:
      "https://images.unsplash.com/photo-1571424768427-7b9aa9db7444?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80",
  },
  {
    _id: "5f23b7fc4b8c4e4a4c4a4b5e",
    title: "VisionX",
    description:
      "Visualize a single platform, with all the bibles of Business accessible. A workshop that starts from the E and ends at the P of Entrepreneurship. A verbally orated manual, VisionX guides every aspiring entrepreneur through all the possibly thinkable obstacles of the tricky terrain of becoming a professional. A tech-biz workshop providing hands on experience of the factors mentioned above, VisionX is all that and more!",
    date: "2022-08-25",
    time: "19:00",
    location: "Silver Jubliee Tower",
    imgUrl:
      "https://images.unsplash.com/photo-1665686308827-eb62e4f6604d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
  },
  {
    _id: "5f23b7fc4b8c4e4a4c4a4x5f",
    title: "Impetus",
    description:
      "Starting off with a fresh slate, the business plans are ideated under the scrutiny of the investors, concepts materialised through presentations leading to the creation of an unequalled venture proposition. E-Cell, VIT brings to you Impetus, a pitch deck competition designed in a way to make the inner entrepreneurs of the young minds take over their normal selves and blooming out of the chrysalis",
    date: "2022-08-25",
    time: "19:00",
    location: "Technology Tower",
    imgUrl:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
  },
];

export default function Landing() {
  const [registered, setRegistered] = useState(false);
  return (
    <>
      <h1 className="text-3xl font-bold  text-center mt-4 ">Events Details</h1>
      <div class="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
        {data.map((event, index) => (
          <Card
            key={event._id}
            id={event._id}
            title={event.title}
            description={event.description}
            date={event.date}
            time={event.time}
            location={event.location}
            imgUrl={event.imgUrl}
            registered={registered}
          />
        ))}
      </div>
    </>
  );
}
