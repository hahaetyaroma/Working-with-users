window.addEventListener("DOMContentLoaded", () => {
    const userList = document.querySelector(".container__item-list");
    const containerItemList = document.querySelector('.container__item-list');
    const btn = document.querySelector(".btn");
    let userID = "1";

    fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => response.json())
        .then((response) => {
            response.splice(
                response.findIndex((e) => e.username === "Delphine"),
                1
            );

            btn.addEventListener("click", () => {
                containerItemList.textContent = ''
                response.forEach((el, i) => {
                    const a = document.createElement("div");
                    a.className = "listItem";
                    const p = document.createElement("p");
                    p.className = "listText";
                    const btnA = document.createElement("button");
                    btnA.className = "listBtn";
                    btnA.textContent = "like";
                    p.textContent = `ID: ${el.id}, ${el.name}, ${el.email}, ${el.phone}`;
                    a.appendChild(p);
                    a.appendChild(btnA);
                    userList.appendChild(a);
                    btnA.onclick = function () {
                        let xhr = new XMLHttpRequest();
                        console.log(`id отправителя: ${userID}`);
                        let now = new Date();
                        console.log(now);
                        let json = {
                            id: el.id,
                            name: el.name,
                            username: el.username,
                            email: el.email,
                            phone: el.phone,
                        };
                        xhr.open("POST", "/submit");
                        xhr.setRequestHeader(
                            "Content-type",
                            "application/json; charset=utf-8"
                        );
                        xhr.send(json);
                        console.log(json);
                    };
                });
                btn.setAttribute("disabled", true);
            });
        });
});
