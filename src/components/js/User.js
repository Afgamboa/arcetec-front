import axios from "axios";
import Swal from "sweetalert2";

export const login = async (email, password) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/api/auth/login",
      { email, password },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    if (response.status === 200) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.user.id);
    }
    return response;
  } catch (error) {
    console.log("first", error);
    return error.response.data.error;
  }
};

export const register = async (name, email, password) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/api/auth/register",
      { email, password, name },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    if (response.status === 200) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.user.id);
    }
    return response;
  } catch (error) {
    return error.response.data.message;
  }
};

export const validateData = (data) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  const nameRegex = /^[a-zA-Z\s]+$/;
  var errors = "";

  if (data.email && !emailRegex.test(data.email)) {
    return errors = "El correo electrónico no es válido";
  }

  if (data.password && !passwordRegex.test(data.password)) {
    return errors =
      "La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número";
  }

  if ( data.age && !(!isNaN(parseFloat(data.age)) && isFinite(data.age))) {
    return errors = "La edad debe ser un número";
  }

  if (data.name && !nameRegex.test(data.name)) {
    return errors = "El nombre no es válido";
  }

  return { isValid: true, errors: "" };
};

export const updateProfile = async ({ name, email, age, img }, userId, token) => {

  try {
    const response = await axios.put(
      `http://localhost:8000/api/users/update/${userId}`,
      { name, email, age, img },
      {
        headers: {
          Authorization: "Bearer " + token,
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error)
    return error.response.data.message;
  }
};

export const deleteUser = async (userId, email, token) => {
  const confirmed = await showAlert(email);
  if (confirmed) {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/users/delete/${userId}`,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Access-Control-Allow-Origin": "*",
          },
        }
      );

      if(response.status === 200) {
        Swal.fire(response.data.message);
        setTimeout(() => {
          window.location.href = "/home";
        }, 3000);
      }
    } catch (error) {
      return error.response.data.message;
    }
  }
};

function showAlert(email) {
  return new Promise((resolve) => {
    Swal.fire({
      title: "Estas por eliminar ha: ",
      html: `<h4 class="text-bg-secondary">${email} </h4>`,
      width: 300,
      confirmButtonText: "Eliminar",
    buttonsStyling: false,

      customClass: {
        confirmButton: "btn btn-danger btn-sm mx-2",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
}
