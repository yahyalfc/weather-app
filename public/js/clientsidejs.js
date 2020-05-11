console.log("Client side javascript");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");

const message1 = document.querySelector("#message-1");
const message2 = document.querySelector("#message-2");
const apilink = document.querySelector("#apilink");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;

  fetch(`/weather?address=${location}`)
    .then((response) => {
      response
        .json()
        .then((data) => {
          if (data.error) {
            message1.textContent = data.error;
          } else {
            const adress = `${data.address}, ${data.country}`;
            message1.textContent = data.forecast;
            message2.textContent = adress;

            apilink.onclick = function () {
              apilink.setAttribute("href", data.link);
            };
          }
          console.log(data);
        })
        .catch((err) => {
          message1.textContent = err.error;
          //   console.log(err);
        });
    })
    .catch((err) => {
      err.json().then((error) => {
        //  console.log(error);
      });
    });
});
