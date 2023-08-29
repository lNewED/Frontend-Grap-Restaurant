const genRestaurantCard = (restaurant) => {
  const card = document.createElement("div");
  card.className = "card";
  card.style = "width: 18rem;";
  const resCard = `
  <a href="detail.html?id=${restaurant.id}">
          <img src="${restaurant.imageurl}" class="card-img-top" alt="...">
  </a>
          <div class="card-body">
              <h5 class="card-title">${restaurant.name}</h5>
              <p class="card-text">${restaurant.type}</p>
              <a href="edit.html?id=${restaurant.id}" class="btn btn-warning">Edit</a>
              <br>
              <br>
  
              <button type="submit" class="btn btn-danger" onclick="return confirm('กรุณายืนยันการลบข้อมูล ??') , deleteMenu(${restaurant.id})">Delete</button>
  
          </div>
 
          `;
  card.innerHTML = resCard;

  const restaurants = document.querySelector("#restaurants");
  //console.log(card);
  //console.log(restaurants);
  restaurants.appendChild(card);
};

const onload = async () => {
  const getAll = await fetch("http://localhost:5000/Food", {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  }).then((response) => {
    return response.json();
  });
  //console.log(getAll.json());
  getAll.forEach((restaurant) => genRestaurantCard(restaurant));
};

const deleteMenu = async (id) => {
  try {
    const DELETE = await fetch(
      "http://localhost:5000/Food/" + `${id}`,
      {
        method: "DELETE", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((restaurant) => {
        alert("Delete menu No." + id);
        console.log(id);
        location.reload();
      });
  } catch (error) {
    alert("can't Delete restaurant menu");
  }
};

