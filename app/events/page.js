import Card from "@/components/landing/LandingPageCard";

async function getData() {
  const res = await fetch("https://dummyjson.com/products/1");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default function Home() {
  // const data = await getData();

  return (
    <>
      <Card />
    </>
  );
}
