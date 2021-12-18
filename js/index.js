// obtener informacion de localstorage
const userLS = localStorage.getItem("user");
console.log(userLS);
if (!userLS) {
  window.location.href = "pages/inicio-de-sesion.html";
}

window.addEventListener("load", function () {
  const email = "pedro3@gmail.com";
  const password = "123456";

  /*  fetch("http://localhost:3000/products", {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      console.log(response.status);
      if (response.status === 200) {
        return response.json();
      }
    })
    .then((data) => {
      console.log(data);
      if (data.ok === true) {
        console.log(data.message);
        cargarProductos(data.products);
      } else {
        console.log("Error al cargar productos");
      }
    })
    .catch((error) => {
      this.alert("Error al cargar los productos" + error);
    }); */

  function cargarProductos(productos) {
    productos.forEach((producto) => {
      let template = `
      <article class="product">
            <figure>
              <img
                src="${producto.imagen}"
                alt="Producto"
                class="product-image"
              />
            </figure>
            <h2 class="product-name">${producto.nombre}</h2>
            <div class="product-price">
              <span class="product-price-value">S/${producto.precio}</span>
              <span class="product-price-decimal">00</span>
            </div>
            <div class="product-more">
              <a href="#" class="product-more-link"> Ver más </a>
            </div>
        </article>`;
      const sectionProductos = document.getElementById("products");
      sectionProductos.innerHTML += template;
    });
  }
  // crear una funcion que renderice los productos
});
