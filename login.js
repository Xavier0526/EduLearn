$(function () {

  const API_KEY = "69804ee3bf4bcc1e0853e428";
  const DB_URL = `https://login-94a6.restdb.io/rest/customer`;

  // Login Process when clicked Login button

  $("#login-form").on("submit", function (e) {

    e.preventDefault();

    const username = $("#li-username").val();
    const password = $("#li-password").val();

    $.ajax({

      url: DB_URL + "?q=" + encodeURIComponent(
        JSON.stringify({ username: username })
      ),

      method: "GET",

      headers: {
        "x-apikey": API_KEY
      },

      success: function (res) {

        if (res.length === 0) {
          alert("User not found");
          return;
        }

        const user = res[0];

        if (user.password !== password) {
          alert("Wrong password");
          return;
        }

        localStorage.setItem("userId", user._id);
        window.location.href = "loading.html";

      },
      
      error: function () {
        alert("Login failed");
      }
    });
  });


// Register (Sign up)

  $("#register-form").on("submit", function (e) {

    e.preventDefault();

    const data = {
      username: $("input[name='username']").val(),
      email: $("input[name='email']").val(),
      password: $("input[name='password']").val(),
      avatar: ""
    };

    // Basic validation
    if (!data.username || !data.email || !data.password) {
      alert("Fill all fields");
      return;
    }

    $.ajax({
      url: DB_URL,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-apikey": API_KEY
      },

      data: JSON.stringify(data),


      success: function () {

        alert("Registration successful");

        window.location.href = "login.html";

      },

      error: function (err) {
        console.error(err);
        alert("Registration failed");

      }
    });
  });

  
// Change Password

document
  .getElementById("reset-form")
  .addEventListener("submit", resetPassword);


function resetPassword(e) {

  e.preventDefault();

  const username = document.getElementById("fp-username").value;
  const newPassword = document.getElementById("fp-password").value;
  const confirm = document.getElementById("fp-confirm").value;


  if (!username || !newPassword || !confirm) {
    alert("Fill all fields");
    return;
  }

  if (newPassword !== confirm) {
    alert("Passwords do not match");
    return;
  }

  // Find user
  fetch(`${DB_URL}?q=${encodeURIComponent(JSON.stringify({
    username: username
  }))}`, {

    headers: {
      "x-apikey": API_KEY
    }

  })

  .then(res => res.json())

  .then(users => {

    if (users.length === 0) {
      alert("User not found");
      return;
    }

    const user = users[0];

    console.log("Found user:", user._id);

    // Update password
    return fetch(`${DB_URL}/${user._id}`, {

      method: "PATCH",

      headers: {
        "Content-Type": "application/json",
        "x-apikey": API_KEY
      },

      body: JSON.stringify({
        password: newPassword
      })

    });

  })

  .then(res => {

    if (!res) return;
    return res.json();

  })

  .then(() => {

    alert("Password changed successfully");
    window.location.href = "login.html";

  })

  .catch(err => {

    console.error("Reset error:", err);
    alert("Reset failed");

  });
}

});

// Edit Profile

// Retrieve user info from localStorage
const USER_ID =localStorage.getItem("userId");

// Retrieve DOM Elements
const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const avatarPreview = document.getElementById("avatarPreview");
const saveBtn = document.getElementById("saveBtn");

if (usernameInput && emailInput && passwordInput && saveBtn) {
  if(!USER_ID) {
    window.location.href="login.html";
  }
}

// Required or it wont load
  const API_KEY = "69804ee3bf4bcc1e0853e428";
  const DB_URL = `https://login-94a6.restdb.io/rest/customer`;

// Load user profile in page
function loadProfile() {
  fetch(`${DB_URL}/${USER_ID}`, {
    headers: {"x-apikey": API_KEY}
  })
  .then(res => res.json())
  .then(user => {
    usernameInput.value = user.username || "";
    emailInput.value = user.email || "";
    passwordInput.value = user.password || "";
  })
}

loadProfile();

// Saving changes to the profile
saveBtn.addEventListener("click", () => {
  const username = usernameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  /*const avatar = avatarPreview.src;*/

  if (!username || !email || !password) {
    alert("Please fill in all fields");
    return;
  }

  fetch(`${DB_URL}/${USER_ID}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-apikey": API_KEY
    },
    body: JSON.stringify({ username, email, password})
  })
  .then(res => res.json())
  .then(data => {
    alert("Updated profile successfully!");
    console.log("Updated profile:", data);
  })
  .catch(err => {
    console.error("Error updating profile:", err);
    alert("Update profile Failed");
  });
  
});



