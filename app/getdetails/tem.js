<div className="form_section">
  <div className="form_sec_l">
    <h1 className="form_l_h1">
      E-Hack
      <br />‍
    </h1>
    <div className="form_desc_wrapper">
      <p className="form_date">Date &amp; Time</p>
      <p className="form_para">
        Venue
        <br />‍
      </p>
      <p className="form_para_small">
        Prominent motivational speakers from the entrepreneurial environment
        will be delivering a talk to inspire the students and promote the ethos
        of entrepreneurship in the campus. This session will also be open to
        questions from the audience, thus furnishing the minds of the students
        with vivid ideas and a clearer picture of the entrepreneurship realm.
        <br />‍
      </p>
      <div className="form_price_wrap">
        <div className="form_wrap">
          <p className="para_med_form">1st</p>
          <p className="para_bold">10,000</p>
        </div>
        <div className="form_wrap">
          <p className="para_med_form">2nd</p>
          <p className="para_bold">10,000</p>
        </div>
        <div className="form_wrap">
          <p className="para_med_form">3rd</p>
          <p className="para_bold">10,000</p>
        </div>
      </div>
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
        <label for="name" className="text_label">
          First name
        </label>
        <input
          type="text"
          ref={fnameRef}
          className="input_form w-input"
          maxlength="256"
          name="fname"
          placeholder="Your name here"
          id="fname"
        />
        <label for="lastn" className="text_label">
          Last Name
        </label>
        <input
          ref={lnameRef}
          type="text"
          className="input_form w-input"
          maxlength="256"
          name="lastn"
          placeholder="Your reg.no here"
          id="lastn"
        />
        {/* <label for="name-3" className="text_label">
          Email-ID
        </label>
        <input
          type="text"
          className="input_form w-input"
          maxlength="256"
          name="name-3"
          data-name="Name 3"
          placeholder="Your email here"
          id="name-3"
        /> */}
        <label for="mob" className="text_label">
          Mobile number
        </label>
        <input
          ref={mobileNumberRef}
          type="number"
          className="input_form w-input"
          maxlength="256"
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
</div>;
