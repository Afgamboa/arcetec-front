import React, { useEffect, useState } from "react";
import "./css/Profile.css";
import { getUserProfile } from "./js/Api";
import { updateProfile, validateData } from "./js/User";

const Profile = () => {
  const id = localStorage.getItem("userIdUpdate");
  const token = localStorage.getItem("token");

  const [userData, setUserData] = useState(null);

  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [age, setAge] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [image, setImage] = useState(
    "https://e7.pngegg.com/pngimages/323/705/png-clipart-user-profile-get-em-cardiovascular-disease-zingah-avatar-miscellaneous-white.png"
  );
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const fetchData = async () => {
    const profileData = await getUserProfile(token, id, "update");
    setUserData(profileData);
    setName(profileData.name);
    setEmail(profileData.email);
    setAge(profileData.age);
    setImage(
      profileData.img
        ? profileData.img
        : "https://e7.pngegg.com/pngimages/323/705/png-clipart-user-profile-get-em-cardiovascular-disease-zingah-avatar-miscellaneous-white.png"
    );
  };
  const handleUpdateProfile = async () => {
    const validationResult = validateData({ name, email, age });
    if (validationResult.isValid) {
      const response = await updateProfile(
        { name, email, age, image: selectedImage },
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

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result);
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
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
          width={350}
        />
      </div>
      {userData && (
        <div className="container-profile">
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
          <div className="user-img from-group">
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
          <div className="from-group">
            <label htmlFor="staticEmail" className="col-md-3 col-form-label">
              Nombre
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              onChange={(e) => setName(e.target.value)}
              defaultValue={name}
              required
            />
          </div>
          <div className="from-group">
            <label htmlFor="inputEmail">Email</label>
            <input
              type="text"
              className="form-control"
              id="inputEmail"
              onChange={(e) => setEmail(e.target.value)}
              defaultValue={email}
            />
          </div>
          <div className="from-group">
            <label htmlFor="inputAge">Edad</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setAge(e.target.value)}
              defaultValue={age}
            />
          </div>
          <div className="row justify-content-evenly mt-3">
            <button
              onClick={() => handleUpdateProfile()}
              className="btn btn-outline-primary col-4"
              type="submit"
            >
              Actualizar
            </button>

            <a href="/home" type="button" className="col-4">
              <button className="btn btn-outline-danger btn-back">Atras</button>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
