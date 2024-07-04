let currentStep = 1;
const totalSteps = 5;

document
  .getElementById("registerForm")
  .addEventListener("submit", function (event) {
    dataEntry();
    event.preventDefault();
    location.replace("/login");
  });

function dataEntry() {
    const form = document.getElementById("registerForm");
    const formData = new FormData(form);
    const obj = {};
    formData.forEach((value, key) => {
        obj[key] = value;
    });

    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .catch(error => console.error('Error:', error));
}

function nextStep(step) {
  const inputs = document.querySelectorAll(`#step${step} input[required]`);
  let allFilled = true;
  inputs.forEach((input) => {
    if (!input.value) {
      allFilled = false;
      input.classList.add("error");
    } else {
      input.classList.remove("error");
    }
  });

  var orgType = document.getElementById("orgType").value;
  if (orgType === "solo"){
    document.getElementById("nameLabel").innerHTML = "Your Name:";
  } else if(orgType === "school"){
    document.getElementById("nameLabel").innerHTML = "School Name:";
  } else if(orgType === "small business"){
    document.getElementById("nameLabel").innerHTML = "Business Name:";
  } else if(orgType === "college"){
    document.getElementById("nameLabel").innerHTML = "College Name:";
  } else {
    document.getElementById("nameLabel").innerHTML = "Company Name:";
  }
  

  if (!allFilled) {
    alert("Please fill all required fields.");
    return;
  }

  if (step === 4) {
    const email = document.getElementById("email").value;
    const phoneNumber = document.getElementById("phoneNumber").value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      document.getElementById("email").classList.add("error");
      return;
    } else {
      document.getElementById("email").classList.remove("error");
    }

    if (!phoneRegex.test(phoneNumber)) {
      alert("Phone number must be 10 digits and contain only numbers.");
      document.getElementById("phoneNumber").classList.add("error");
      return;
    } else {
      document.getElementById("phoneNumber").classList.remove("error");
    }
  }
  document.getElementById(`step${step}`).style.display = "none";
  document.getElementById(`step${step + 1}`).style.display = "block";
  currentStep++;
}

function previousStep(step) {
  document.getElementById(`step${step}`).style.display = "none";
  document.getElementById(`step${step - 1}`).style.display = "block";
  currentStep--;
}

document.getElementById("step1").style.display = "block";
