import React from "react";
import { useRouter } from "next/navigation";
export default function Card(props) {
  const { id, title, description, date, time, location, imgUrl, registered } =
    props;
  const router = useRouter();
  const cartItems = ["1", "2"]; //cartArray
  console.log(cartItems);
  const handleRegister = (e) => {
    e.preventDefault();
    console.log(e.target.id);
    router.push("/login");
  };

  const addCart = (e) => {
    e.preventDefault();
    console.log(e.target.id);
    console.log("Add to cart Function Here");
  };
  const removeCart = (e) => {
    e.preventDefault();
    console.log(e.target.id);
    console.log("Remove From cart function Here");
  };
  return (
    <>
      <div class="rounded overflow-hidden shadow-lg">
        <img class="w-full" src={imgUrl} alt="Mountain" />

        <div class="px-6 py-4">
          <div class="px-6 pt-4 pb-2">
            {" "}
            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              {time}
            </span>
            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              {date}
            </span>
          </div>
          <div class="font-bold text-xl mb-2">{title}</div>
          <p class="text-gray-700 text-base">{description} </p>
        </div>
        <div class="px-6 pt-4 pb-2">
          <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            {location}
          </span>
          {!registered ? (
            <>
              <button
                id={id}
                className="  bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-red-700 mr-2 mb-2 items-center"
                onClick={(e) => handleRegister(e)}
              >
                Register
              </button>
            </>
          ) : (
            <>
              {cartItems.includes(id) ? (
                <>
                  <button
                    id={id}
                    onClick={(e) => removeCart(e)}
                    className="  bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-red-700 mr-2 mb-2 items-center"
                  >
                    Remove from Cart
                  </button>
                </>
              ) : (
                <>
                  <button
                    id={id}
                    onClick={(e) => addCart(e)}
                    className="  bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-red-700 mr-2 mb-2 items-center"
                  >
                    Add to Cart
                  </button>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
