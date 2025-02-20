```yaml
# Requisitos de Cart
1.Implementa un Context que te permita manejar el carrito de compras de la aplicación. 
2. En el Navegation.jsx.jsx consume el Cart Context para mostrar el total de los productos añadidos en el carrito. 
3. Consume el Cart Context para que el usuario pueda agregar productos al carrito
desde cualquier componente (botón añadir de cada card). Y los productos que vaya eligiendo desde cualquier parte se van acumulado en window.sessionStorage
4. En la página Cart muestra los productos que el usuario ha agregado al carrito
(utilizando Cart Context), permite agregar y eliminar productos del carrito. 
5. El total de la compra debe ser calculado y mostrado en la página Cart, además este
tiene que ser el mismo que se muestra en el Navigation.jsx. 
6. Puedes llevar el consumo de los productos (fetch de Home y producto) a un Context y los productos se deben renderizar desde la tabla 'productos' de la db postgresSQL (tenemos instalados pg y pg-format en el backend)
7. Utiliza el UserContext en la página de Cart.jsx, deshabilita el botón "pagar" en caso que no haya token en window.sessionStorage.


