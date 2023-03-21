"use client";

import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import "../../styles/landing.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signIn, signOut } from "next-auth/react";

export default function DetailsForm({ accessTokenBackend }) {
  const lnameRef = useRef("");
  const fnameRef = useRef("");
  const regRef = useRef("");
  const router = useRouter();
  const [isLoading, setisLoading] = useState(false);

  const mobileNumberRef = useRef("");
  const re = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
  const regtest = /^[1-9][0-9][a-zA-Z]{3}[0-9]{4}$/;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      mobileNumberRef.current.value === "" ||
      mobileNumberRef.current.value.length != 10 ||
      !re.test(String(mobileNumberRef.current?.value))
    ) {
      toast.error("🦄 Please fill 10 digits mobile number");
      return;
    } else if (fnameRef.current.value.trim() === "") {
      toast.error("Please Don't Leave Name as Blank!");
      return;
    } else if (
      regRef.current.value.trim() === "" ||
      !regtest.test(regRef.current.value.trim())
    ) {
      toast.error("Please Enter Correct VIT Registration number!");
      return;
    }
    setisLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/user/details`, {
      method: "POST",
      body: JSON.stringify({
        firstName: fnameRef.current.value.trim(),
        lastName: lnameRef.current.value.trim(),
        mobileNumber: mobileNumberRef.current.value,
        regNo: regRef.current.value.toUpperCase(),
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessTokenBackend}`,
        "Access-Control-Allow-Origin": "*",
      },
      cache: "no-store",
    })
      .then((data) => data.json())
      .then((data) => {
        setisLoading(false);
        if (data.error?.errorCode) {
          if (data.error.errorCode === 401) {
            signOut({ callbackUrl: "/" });
          } else {
            router.push("/");
            toast.error(`${data.message}`, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
          return;
        }
        router.push("/");
        toast("Details submitted successfully");

        return;
      });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="form_section">
        <div className="form_sec_l">
          <div className="form_logo">
            <img src="logo_ecel.png" alt="logo" className="image" />
          </div>
          <div className="text_form">
            <h1 className="form_l_h1">
              E-SUMMIT’23
              <br />‍
            </h1>
            <p className="form_date">30th March-2nd april</p>
          </div>
        </div>
        <div className="form_sec_r">
          <h1 className="form_r_h1">Enter your information</h1>
          <div className="main_form_wrap w-form">
            <form
              id="wf-form-name"
              name="wf-form-name"
              method="get"
              className="form_cont"
            >
              <label htmlFor="name" className="text_label">
                First name
              </label>
              <input
                type="text"
                ref={fnameRef}
                className="input_form w-input"
                maxLength="256"
                name="fname"
                placeholder="Enter Your first name here"
                id="fname"
              />
              <label htmlFor="lastn" className="text_label">
                Last Name
              </label>
              <input
                ref={lnameRef}
                type="text"
                className="input_form w-input"
                maxLength="256"
                name="lastn"
                placeholder="Enter Your last name here"
                id="lastn"
              />
              <label htmlFor="name-3" className="text_label">
                Registration Number
              </label>
              <input
                type="text"
                className="input_form w-input"
                maxLength="256"
                onInput={(e) =>
                  (e.target.value = ("" + e.target.value).toUpperCase())
                }
                ref={regRef}
                name="name-3"
                data-name="Name 3"
                placeholder="Registration number here"
                id="name-3"
              />
              <label htmlFor="mob" className="text_label">
                Mobile number
              </label>
              <input
                ref={mobileNumberRef}
                type="number"
                className="input_form w-input"
                maxLength="256"
                name="mob"
                placeholder="Your phone no. here"
                id="mob"
              />
              <button
                onClick={(e) => handleSubmit(e)}
                type="submit"
                className="formbtn w-button"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
