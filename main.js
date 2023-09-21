const shopContent = document.getElementById("shopContent");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modalContainer");
const cantidadCarrito = document.getElementById("cantidadCarrito");

let carrito = JSON.parse(localStorage.getItem ("carrito")) || [];  // Inicializar carrito desde el almacenamiento local

const productosasync = async () => {
     const respuesta = await fetch("datos.json");
     const datos = await respuesta.json();

 datos.forEach((product) => {
  let content = document.createElement("div");
  content.className = "card";
  content.innerHTML = `
    <img src="${product.img}">
    <h3>${product.nombre}</h3>
    <p class="price">${product.precio} $</p>
  `;

  shopContent.append(content);

  let comprar = document.createElement("button");
  comprar.innerText = "comprar";
  comprar.className = "comprar";

  content.append(comprar);

  comprar.addEventListener("click", () => {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'El producto se agregó al carrito',
      showConfirmButton: false,
      timer: 1500
    })
    const repeat = carrito.some((repeatProduct) => repeatProduct.id === product.id);
//si repeat es
    if (repeat) {
      carrito.map((prod) => {
        if (prod.id === product.id) {
          prod.cantidad++;
        }
      });
    } else {
      carrito.push({
        id: product.id,
        img: product.img,
        nombre: product.nombre,
        precio: product.precio,
        cantidad: product.cantidad,
      });
      console.log(carrito);
      console.log(carrito.length);
      carritoCounter();
      saveLocal();
    }
    });
});
};

productosasync();

//local Storage
const saveLocal = () => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

JSON.parse (localStorage.getItem ("carrito"));