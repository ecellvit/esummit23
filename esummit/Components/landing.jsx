import { useState } from "react";
import Card from "./Card";
import data from "@/events";
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
