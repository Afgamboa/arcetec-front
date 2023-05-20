import axios from "axios";
import Swal from "sweetalert2";
import { deleteUser } from "./User.js"

export const getUsers = async (token) => {
  try {
    const response = await axios.get("http://localhost:8000/api/users", {
      headers: {
        Authorization: "Bearer " + token,
        "Access-Control-Allow-Origin": "*",
      },
    });

    return response.data.users;
  } catch (error) {
    return console.log(error);
  }
};

export const getUserProfile = async (token, userId, type) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/users/profile/${userId}`,
      {
        headers: {
          Authorization: "Bearer " + token,
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    
    if(type == "details") showUserAlert(response.data.profile);
    else if (type == "update") return response.data.profile;

  } catch (error) {
    return console.log(error);
  }
};

const showUserAlert = (profile) => {
  Swal.fire({
    title: "Perfil",
    width: '25%',
    height: '30%',
    html: `
    <div class="profile">
    <div class="card">
    <img  width={100} src="${
      profile.img ||
      "https://e7.pngegg.com/pngimages/323/705/png-clipart-user-profile-get-em-cardiovascular-disease-zingah-avatar-miscellaneous-white.png"
    }" />
    <div class="card-body">
      <h5 class="card-title">${profile.name}</h5>
      <p class="card-text"> ${profile.email}</p>
      <p class="card-text">Edad: ${profile.age ? profile.age : ""}</p>
    </div>
  </div>
  </div>
    `,
    showCancelButton: true,
    confirmButtonText: "Actualizar",
    cancelButtonText: "Eliminar",
    buttonsStyling: false,
    customClass: {
      confirmButton: "btn btn-outline-success btn-lg mx-2",
      cancelButton: "btn btn-outline-danger btn-lg mx-2",
    },
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.setItem('userIdUpdate', profile.id);
      window.location.href = `/profile`;
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      const token = localStorage.getItem('token');
      deleteUser(profile.id, profile.email, token);
    }
  });
};
