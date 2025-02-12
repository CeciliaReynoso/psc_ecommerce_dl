import './App.css';
// import { AuthProvider } from './context/AuthProvider';
import {RouterManager}  from './routes/RouterManager';
import { CartProvider } from './context/CartProvider';
import { ProductProvider } from './context/ProductProvider';

function App() {
	return (
		<>
			{/* <AuthProvider> */}
				<CartProvider>
					<ProductProvider>
						<RouterManager />
					</ProductProvider>
				</CartProvider>
			{/* </AuthProvider> */}
		</>
	);
}

export default App;
