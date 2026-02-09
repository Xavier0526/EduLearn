$(function () {

  const API_KEY = "69804ee3bf4bcc1e0853e428";
  const DB_NAME = "login-94a6"; // Database name
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
        window.location.href = "index.html";

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

});


// Change Password

