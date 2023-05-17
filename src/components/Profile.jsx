import React, { useEffect, useState } from "react";
import "./css/Profile.css";
import { getUserProfile } from "./js/Api";
import { updateProfile, validateData } from "./js/User";

const Profile = () => {
  
  const id = localStorage.getItem("userIdUpdate");
  const token = localStorage.getItem("token");

  const [userData, setUserData] = useState([]);

  const [name, setName] = useState(userData.name);
  const [email, setEmail] = useState(userData.email);
  const [age, setAge] = useState(userData.age);
  const [image, setImage] = useState(
    userData.img
      ? userData.img
      : "https://e7.pngegg.com/pngimages/323/705/png-clipart-user-profile-get-em-cardiovascular-disease-zingah-avatar-miscellaneous-white.png"
  );
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const fetchData = async () => {
    const profileData = await getUserProfile(token, id, "update");
    setUserData(profileData);
  };

  const handleUpdateProfile = async (event) => {
    event.preventDefault();

    const validationResult = validateData({ name, email, age });
    if (validationResult.isValid) {
      const response = await updateProfile(
        { name, email, age, image },
        id,
        token
      );
      if (response && response.status === 200) {
        setSuccessMessage(response.data.message);
        fetchData();
  
        setTimeout(() => {
          setSuccessMessage(null);
        }, 2000);
      } else {
        setErrorMessage(response);
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
      }
    } else {
      setErrorMessage(validationResult);
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
  
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImage(reader.result);
      };
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container-pricipal">
      <div className="title">
        <img
          src="https://www.arcetec.com.co/wp-content/uploads/2022/05/Logo_Original.svg"
          className="attachment-large size-large wp-image-6923"
          alt=""
          width={250}
        />
      </div>
      {userData && (
        <div className="container-profile">
          <form onSubmit={handleUpdateProfile} encType="multipart/form-data">
            {successMessage && (
              <div className="alert alert-success" role="alert">
                {successMessage}
              </div>
            )}
            {errorMessage && (
              <div className="alert alert-danger" role="alert">
                {errorMessage}
              </div>
            )}
            <div className="user-img">
              <label htmlFor="upload-image">
                <img width={150} src={image} alt="" />
              </label>
              <input
                type="file"
                id="upload-image"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
            </div>
            <div className="mb-3 row">
              <label htmlFor="staticEmail" className="col-md-3 col-form-label">
                Nombre
              </label>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control"
                  id="staticEmail"
                  onChange={(e) => setName(e.target.value)}
                  defaultValue={userData.name}
                  required
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label
                htmlFor="inputPassword"
                className="col-md-3 col-form-label"
              >
                Email
              </label>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control"
                  id="inputPassword"
                  onChange={(e) => setEmail(e.target.value)}
                  defaultValue={userData.email}
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label
                htmlFor="inputPassword"
                className="col-sm-3 col-form-label"
              >
                Edad
              </label>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setAge(e.target.value)}
                  defaultValue={userData.age}
                />
              </div>
            </div>
              <button className="btn btn-primary btn-update" type="submit">
                Actualizar
              </button>
              </form>
              <a href="/home" type="button" className="col">
                <button className="btn btn-danger btn-back">Atras</button>
              </a>
            </div>
          
      )}
    </div>
  );
};

export default Profile;