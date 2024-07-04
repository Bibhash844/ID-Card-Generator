document
  .getElementById("mybtn")
  .addEventListener("click", function (event) {
    dataEntry();
    event.preventDefault();
});

function dataEntry() {
    const form = document.getElementById("form_");
    const formData = new FormData(form);
    const obj = {};
    formData.forEach((value, key) => {
        obj[key] = value;
    });
    console.log("obj=>", obj);

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Invalid Email and Password');
        }
        return response.json();
    })
    .then(data => {
        sessionStorage.setItem('dashboardData', JSON.stringify(data));
        window.location.href = "http://localhost:3000/dashboard";
    })
    .catch(error => {
        alert(error);
        document.getElementById("password").value = "";
        document.querySelectorAll(".hr2").forEach(hr => {
            hr.style.borderColor = "red";
            setTimeout(() => {
                hr.style.borderColor = "black";
            }, 2000);
        });
    });
}