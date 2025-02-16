```yaml
# Requisitos de Cart
1.Implementa un Context que te permita manejar el carrito de compras de la aplicación. 
2. En el Navbar consume el Cart Context para mostrar el precio total de los productos
en el carrito. 
3. Consume el Cart Context para que el usuario pueda agregar productos al carrito
desde la página de Home (botón añadir de cada card). Y los productos que vaya eligiendo desde cualquier parte se van acumulado en un archivo tipo .json
4. En la página Cart muestra los productos que el usuario ha agregado al carrito
(utilizando Cart Context), permite agregar y eliminar productos del carrito. 
5. El total de la compra debe ser calculado y mostrado en la página Cart, además este
tiene que ser el mismo que se muestra en el navbar. 
6. Puedes llevar el consumo de las productos (fetch de Home y producto) a un Context.
7. Utiliza el UserContext en la página de Cart.jsx, deshabilita el botón "pagar" en caso de
que el token sea false.


## Ejemplo de CartContext

import { createContext, useState } from 'react';

// Crea el contexto
export const CartContext = createContext();

// Crea un proveedor para el contexto
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const clearCart = () => {
    setCart([]);  // Vaciamos el carrito estableciendo un array vacío
  };
  
  const handleAddToCart = (producto) => {
    setCart(prevCart => {
      const productoInCart = prevCart.find(item => item.id === producto.id);
      if (productoInCart) {
        return prevCart.map(item =>
          item.id === producto.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...producto, quantity: 1 }];
      }
    });
  };

  const handleIncreaseQuantity = (id) => {
    setCart(prevCart => prevCart.map(producto =>
      producto.id === id ? { ...producto, quantity: producto.quantity + 1 } : producto
    ));
  };

  const handleDecreaseQuantity = (id) => {
    setCart(prevCart => prevCart
      .map(producto =>
        producto.id === id
          ? { ...producto, quantity: Math.max(producto.quantity - 1, 0) }
          : producto
      )
      .filter(producto => producto.quantity > 0)
    );
  };

  const getTotal = () => {
    return cart.reduce((total, producto) => total + (producto.price * producto.quantity), 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        handleAddToCart,
        handleIncreaseQuantity,
        handleDecreaseQuantity,
        getTotal,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

## codigo de ejemplo para el componente Cart.jsx (pero debemos cambiar el formato para moneda del pais Peru donde se usan dos decimales)

import { Button, Card, Container } from 'react-bootstrap';
import { useContext, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import { UserContext } from '../context/UserContext';
// Función para capitalizar la primera letra
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

// Función para formatear el precio en soles peruanos
const formatPrice = (price) => {
  return new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(price);
};

const Cart = () => {
  const { token, user, logOut } = useContext(UserContext);  // Importamos logOut desde UserContext
  const { cart, handleIncreaseQuantity, handleDecreaseQuantity, getTotal, clearCart } = useContext(CartContext);

  useEffect(() => {
    console.log("User desde Cart:", user);
    console.log("Token desde Cart:", token);
    console.log("Cart desde Cart", cart);
  }, [user, token, cart]);

  const handleCheckout = async () => {
    if (!token) {
      alert("No está autenticado. Inicie sesión para realizar la compra.");
      return;
    }

    if (cart.length === 0) {
      alert("El carrito está vacío.");
      return;
    }

    const cartPayload = {
      cart: cart.map(index => ({
        id: index.id,
        name: index.name,
        price: index.price,
        quantity: index.quantity
      })),
    };

    console.log("JSON del carrito:", JSON.stringify(cartPayload, null, 2));

    try {
      const response = await fetch("http://localhost:5000/api/checkouts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(cartPayload),
      });

      const data = await response.json();

      if (response.ok) {
        // Si la compra es exitosa
        alert(data.message || "Compra realizada con éxito.");
        clearCart();  // Vaciamos el carrito
        logOut();  // Ejecutamos el cierre de sesión
      } else {
        // Si hay un error en la respuesta
        alert(data.error || "Hubo un problema con la compra.");
        clearCart();  // Vaciamos el carrito en caso de error
        logOut();  // Ejecutamos el cierre de sesión tras un error
      }

    } catch (error) {
      console.error("Error en el checkout:", error);
      alert("Error en el proceso de compra.");
      clearCart();  // Vaciamos el carrito en caso de error
      logOut();  // Ejecutamos el cierre de sesión tras un error
    }
  };

  return (
    !token ? (
      <h1>Para ver el 🛒 y pagar, vaya primero a opción Login e identifíquese</h1>
    ) : (
      <Container className='eCart' style={{ display: 'flex', maxWidth: '50%', marginTop: '5rem', marginBottom: '25rem' }}>
        <div className="text-center">
          <h2>🛒 Total Carrito: {formatPrice(getTotal())}</h2>
          <Button 
            disabled={!token || cart.length === 0} 
            className={token ? "m-2 btn-lg btn-success" : "m-2 btn-lg btn-danger"} 
            onClick={handleCheckout}  // Aquí utilizamos la función handleCheckout al hacer clic
          >
            Pagar
          </Button>
          <p className='p-8'>Desde 🍕Home pulse 'Añadir' para traer productos al carrito. Para eliminar un ítem disminuir a cero la cantidad.</p>
        </div>
        <div>
          {cart.map(producto => (
            <Card key={producto.id} style={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              padding: '0.5rem',
              borderRadius: '10px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
            }} className="mb-3">
              <Card.Img 
                variant="center" 
                src={producto.img} 
                alt={producto.name}
                style={{ 
                  width: '150px', 
                  height: '120px', 
                  objectFit: 'cover', 
                  borderRadius: '8px',
                  margin:'1.5rem auto', 
                }} 
              />         
              <Card.Body style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingLeft: '1rem' }}>
                <Card.Title>{capitalizeFirstLetter(producto.name)}</Card.Title>
                <Card.Text>Precio: {formatPrice(producto.price)}</Card.Text>                          
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
                  <Button 
                    variant="outline-dark" 
                    size="sm" 
                    onClick={() => handleDecreaseQuantity(producto.id)}
                  >-</Button>
                  <Card.Title>{producto.quantity}</Card.Title>
                  <Button 
                    variant="dark" 
                    size="sm" 
                    onClick={() => handleIncreaseQuantity(producto.id)}
                  >+</Button>
                </div>
                <Card.Text>Sub-Total: {formatPrice(producto.price * producto.quantity)}</Card.Text>  
              </Card.Body>
            </Card>
          ))}
        </div>
      </Container>
    )
  );
};

export default Cart;
