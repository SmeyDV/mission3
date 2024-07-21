document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("ticketForm");
  const ageSelect = document.getElementById("age");
  const movieSelect = document.getElementById("movie");
  const idUpload = document.getElementById("idUpload");
  const idFile = document.getElementById("idFile");
  const idPreview = document.getElementById("idPreview");
  const passwordInput = document.getElementById("password");
  const showPasswordBtn = document.getElementById("showPassword");
  const passwordIcon = document.getElementById("passwordIcon");
  const confirmationDiv = document.getElementById("confirmation");

  function filterMoviesByAge() {
    const age = ageSelect.value;
    const movieOptions = {
      "0-6": ["Inside Out 2"],
      "7-12": ["Inside Out 2", "My Neighbor Totoro"],
      "13-18": ["Inside Out 2", "My Neighbor Totoro", "The Breakfast Club"],
      "18+": [
        "Inside Out 2",
        "My Neighbor Totoro",
        "The Breakfast Club",
        "The Wolf of Wall Street",
      ],
    };

    movieSelect.innerHTML = '<option value="">Select Movie</option>';
    if (age && movieOptions[age]) {
      movieOptions[age].forEach((movie) => {
        const option = document.createElement("option");
        option.value = movie;
        option.textContent = movie;
        movieSelect.appendChild(option);
      });
    }
    idUpload.style.display = "none";
    idFile.required = false;
    idFile.value = "";
    idPreview.style.display = "none";
  }

  function checkIDRequirement() {
    const age = ageSelect.value;
    const movie = movieSelect.value;

    if (age === "18+" && movie === "The Wolf of Wall Street") {
      idUpload.style.display = "block";
      idFile.required = true;
    } else {
      idUpload.style.display = "none";
      idFile.required = false;
      idFile.value = "";
      idPreview.style.display = "none";
    }
  }

  ageSelect.addEventListener("change", function () {
    filterMoviesByAge();
    checkIDRequirement();
  });

  movieSelect.addEventListener("change", function () {
    if (!ageSelect.value) {
      alert("Please select your age first.");
      movieSelect.value = "";
      return;
    }
    checkIDRequirement();
  });

  idFile.addEventListener("change", function (e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        idPreview.src = e.target.result;
        idPreview.style.display = "block";
      };
      reader.readAsDataURL(file);
    }
  });

  showPasswordBtn.addEventListener("click", function () {
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      passwordIcon.classList.remove("fa-eye");
      passwordIcon.classList.add("fa-eye-slash");
    } else {
      passwordInput.type = "password";
      passwordIcon.classList.remove("fa-eye-slash");
      passwordIcon.classList.add("fa-eye");
    }
  });

  form.addEventListener("reset", function () {
    setTimeout(function () {
      movieSelect.innerHTML = '<option value="">Select Movie</option>';
      idUpload.style.display = "none";
      idFile.required = false;
      idPreview.style.display = "none";
      confirmationDiv.textContent = "";
    }, 0);
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (passwordInput.value.length < 8) {
      alert("Password must be at least 8 characters long.");
      return;
    }
    alert("Form submitted successfully!");
    form.reset();
    movieSelect.innerHTML = '<option value="">Select Movie</option>';
    idUpload.style.display = "none";
    idFile.required = false;
    idPreview.style.display = "none";
    confirmationDiv.textContent = "";
  });
});
