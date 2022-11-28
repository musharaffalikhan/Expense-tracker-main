import React, { useContext, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import classes from "./UpdateProfile.module.css";

const UpdateProfile = () => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const nameInputRef = useRef();
  const urlInputRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = async (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredUrl = urlInputRef.current.value;
    setIsLoading(true);
    const res = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDxo1sxNCdvGq1lKzXK9NaVSp4_JRvmECE",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
          displayName: enteredName,
          photoUrl: enteredUrl,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data =await res.json()
    console.log(data);
    alert('Your profile has been updated')
    history.replace('/');
  };

  const cancelHandler = () => {
    history.replace("/");
  };

  return (
    <section className={classes.auth}>
      <h1>Contact Details</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="fullname">Full Name</label>
          <input type="text" id="fullname" ref={nameInputRef} required />
        </div>
        <div className={classes.control}>
          <label htmlFor="profilePhotoUrl">Profile Photo URL</label>
          <input type="url" id="profilePhotoUrl"  ref={urlInputRef} required />
        </div>
        <div className={classes.actions}>
          {!isLoading && <button>Update</button>}
          {isLoading && <p>Sending request...</p>}
        </div>
        <div className={classes.actions}>
          <button
            type="button"
            className={classes.toggle}
            onClick={cancelHandler}
          >
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
};

export default UpdateProfile;
