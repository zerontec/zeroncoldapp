/* eslint-disable object-shorthand */
import React, { useState, useEffect, useRef } from 'react';
import {
  TableHead,
  TableCell,
  TableBody,
  Table,
  TableRow,
  TableContainer,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import Modal from '@mui/material/Modal';

import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import styled, { createGlobalStyle } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

import { fetchProducts } from '../../../redux/modules/products';
import { createInvoices } from '../../../redux/modules/invoices';

import { ErrorMessage } from '../../../components/ErrorMessage';
import { fDateTime } from '../../../utils/formatTime';
import { CreateDevolucion } from '../../../components/CreateDevolucion';

import { SearchProduct } from '../../../components/SearchProduct';
import { SearchCustomer } from '../../../components/SearchCustomer';






// eslint-disable-next-line arrow-body-style
const PosA = ({ handleCustomerSelect, handleSellerSelect}) => {
  
  const [client, setClient] = useState({});
  const [products, setProducts] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currency, setCurrency] = useState('Bs');
  const [currencys, setCurrencys] = useState('$');
  const [query, setQuery] = useState('');
  const [product, setProduct] = useState({});
  const [productsQuantity, setProductsQuantity] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isCredit, setIsCredit] = useState(false);
  const [seller, setSeller] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [queryp, setQueryp] = useState('');
  const [searchError, setSearchError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [manualClientData, setManualClientData] = useState({ name: '', identification: '', address: '' });
  const dispatch = useDispatch();
  const [limpiar, setLimpiar] = useState('');
  const [selectedProductPrice, setSelectedProductPrice] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [subtotal, setSubtotal] = useState(0);
  
	const [selectedCustomer, setSelectedCustomer] = useState(null);
	const [selectedSeller, setSelectedSeller] = useState(null);


  useEffect(() => {
    if (queryp) {
      dispatch(fetchProducts(queryp));
    }
  }, [queryp, dispatch]);

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleCreditChange = (event) => {
    setIsCredit(event.target.value === 'credit');
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleProductQuantityChange = (event) => {
    setProductsQuantity(event.target.value);
  };

 

  const handleRemoveProduct = (index) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
	const subtotalToRemove = products[index].subtotal;
	setSubtotal((prevSubtotal) => prevSubtotal - subtotalToRemove);


  };

  const searchProductRef = useRef(null);




  const handleAddProduct = (product, productsQuantity, selectedProductPrice) => {
    console.log('product', product);

    if (product && productsQuantity > 0) {
      if (productsQuantity > product.quantity) {
        setSearchError(true);
        console.log(searchError === true, 'Cantidad');
        setErrorMessage('La cantidad de venta es mayor a la cantidad disponible del producto');
        setQueryp('');
        setLimpiar('');
        return;
      }

	  const subtotalToAdd = selectedProductPrice * productsQuantity;
  setSubtotal((prevSubtotal) => prevSubtotal + subtotalToAdd);

      const selectedPrice = selectedProductPrice;
      const productToAdd = {
        ...product,
        price: selectedPrice,
        quantity: productsQuantity,
        subtotal: selectedPrice * productsQuantity,
      };
      setProducts([...products, productToAdd]);

      setProduct({});
      setProductsQuantity(0);
    }

    searchProductRef.current.focus();
    setQueryp('');
    setProductsQuantity(0);
    setSelectedProductPrice(0);
  };




console.log("aquieSelecte customer", selectedCustomer)
console.log("aquieSelecte seller", selectedSeller)
console.log("aqui Product", products)
              // Crear Factura //
  
			  const modifiedProducts = products.map((product) => {
				// Convierte los campos de precio y cantidad a enteros utilizando parseInt()
				const price = parseInt(product.price, 10);
				const quantity = parseInt(product.quantity, 10);
			  
				// Retorna un nuevo objeto con los campos modificados
				return {
				  ...product,  // Mantén los campos existentes del producto
				  price: price,  // Asigna el precio convertido
				  quantity: quantity, // Asigna la cantidad convertida
				};
			  });


// 	const handleSubmitInvoice = (event) => {
//     event.preventDefault();

// 	const selectedPrice = selectedProductPrice;
// 	const productToAdd = {
// 	  ...product,
// 	  price: selectedPrice,
// 	  quantity: productsQuantity,
// 	  subtotal: selectedPrice * productsQuantity,
// 	};
// 	setProducts([...products, productToAdd]);

//     const invoiceData = {
//       credit: isCredit,
//       paymentMethod,
//       dueDate: selectedDate,
//       customer: {
//         identification: selectedCustomer.identification || manualClientData.identification,
//         name: selectedCustomer.name || manualClientData.name,
//         address: selectedCustomer.address || manualClientData.address,
//       },
//       seller: {
//         codigo: selectedSeller.codigo,
//         identification: selectedSeller.identification,
//         name: selectedSeller.name,
//       },
//       productos:products
//     };

//     dispatch(createInvoices(invoiceData));

//     setQuery('');
//     setClient({});
//     setProduct({});
//     setProducts([]);
//     setProductsQuantity(0);
//     setIsModalOpen(null);
//     setManualClientData('');
//     setSeller({});
//   };

const handleSubmitInvoice = (event) => {
	event.preventDefault();
  
	const selectedPrice = selectedProductPrice;
	const productToAdd = {
	  ...product,
	  price: parseFloat(selectedPrice), // Convertir a número
	  quantity: parseInt(productsQuantity, 10), // Convertir a número entero
	  subtotal: parseFloat(selectedPrice) * parseInt(productsQuantity, 10), // Calcular subtotal
	};
	setProducts([...products, productToAdd]);
  
	const productsData = products.map((product) => ({
	  ...product,
	  price: parseFloat(product.price), // Convertir a número
	  quantity: parseInt(product.quantity, 10), // Convertir a número entero
	}));
  
	const invoiceData = {
	  credit: isCredit,
	  paymentMethod,
	  dueDate: selectedDate,
	  customer: {
		identification: selectedCustomer.identification || manualClientData.identification,
		name: selectedCustomer.name || manualClientData.name,
		address: selectedCustomer.address || manualClientData.address,
	  },
	  seller: {
		codigo: selectedSeller.codigo,
		identification: selectedSeller.identification,
		name: selectedSeller.name,
	  },
	  productos: productsData, // Usar el array `productsData` con datos modificados
	};
  
	dispatch(createInvoices(invoiceData));
  
	setQuery('');
	setClient({});
	setProduct({});
	setProducts([]);
	setProductsQuantity(0);
	setIsModalOpen(null);
	setManualClientData('');
	setSelectedCustomer({});
	setSelectedSeller({})
	setSubtotal(0)
  };
  



  useEffect(() => {
    if (products.length === 0) {
      setModalOpen(false);
    }
  }, [products]);

//   const subtotal = 0;
  const handlePriceChange = (event) => {
    setSelectedProductPrice(event.target.value);
  };


 // declaro aqui 
  const [isModalOpen, setIsModalOpen] = useState(false);

  // creo fucntion 

  const openModal = () => {
	if(products.length > 0){
	setIsModalOpen(true);
	}
  };

  const subtotalB = subtotal / 1.16 
  const resultSubB = subtotalB
  const iva = subtotal - resultSubB
  const TotalF = resultSubB + iva


  return (
    <>
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            borderRadius: '8px',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h5" sx={{ marginBottom: 2 }}>
            Resumen de pago
          </Typography>

          <Box sx={{ marginBottom: 2 }}>
            <Typography variant="h6">SubTotal: {resultSubB.toFixed(2)}</Typography>
            <Typography variant="h6">Iva(16%): {iva.toFixed(2)}</Typography>
            <Typography variant="h6">
              Total: {currency}
              {TotalF.toFixed(2)}
            </Typography>
            <Typography variant="h6">Método de pago: {paymentMethod}</Typography>
            <Typography variant="h6">A crédito: {isCredit ? 'Sí' : 'No'}</Typography>
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="payment-method-label">Método de pago</InputLabel>
                <Select
                  labelId="payment-method-label"
                  id="payment-method"
                  value={paymentMethod}
                  onChange={handlePaymentMethodChange}
                  label="Método de pago"
                >
                  <MenuItem value="credito">Crédito</MenuItem>
                  <MenuItem value="debit">Transferencia</MenuItem>
                  <MenuItem value="cash">Efectivo $</MenuItem>
                  <MenuItem value="pagoM">Pago Movil</MenuItem>
                  <MenuItem value="cashB">Efectivo Bolivares</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="credit-label">A crédito</InputLabel>
                <Select
                  labelId="credit-label"
                  id="credit"
                  value={isCredit ? 'credit' : 'cash'}
                  onChange={handleCreditChange}
                  label="A crédito"
                >
                  <MenuItem value="credit">Sí</MenuItem>
                  <MenuItem value="cash">No</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {isCredit && (
              <Grid item xs={12}>
                <DayPicker selected={selectedDate} onDayClick={handleDateChange} />
              </Grid>
            )}
            <Grid item xs={12}>
              <Button style={{ marginLeft: 80 }} variant="contained" onClick={handleSubmitInvoice}>
                Crear factura
              </Button>
            </Grid>
          </Grid>

          <hr />

          <Button variant="contained" onClick={() => setIsModalOpen(null)}>
            X
          </Button>
        </Box>
      </Modal>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            borderRadius: '8px',
            boxShadow: 24,
            p: 4,
            backgroundColor: '#212B36',
          }}
        >
          <TextField />

          <Table>
            <TableRow>
              <TableCell style={{ color: 'white' }} />
            </TableRow>
          </Table>

          <div style={{ color: 'white' }} />
          <Button
            style={{
              marginTop: 10,
              backgroundColor: 'transparent',
            }}
            variant="contained"
            onClick={() => setModalOpen(false)}
          >
            x
          </Button>
        </Box>
      </Modal>

      <Box>
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          Facturación
        </Typography>
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          Tasa de el día {currencys}
        </Typography>

        <CreateDevolucion />

        <hr
          style={{
            color: 'transparent',
            backgroundColor: 'transparent',
          }}
        />

        <SearchCustomer
          manualClientData={manualClientData}
          setManualClientData={setManualClientData}
          seller={seller}
          setSeller={setSeller}
		  subtotal={subtotal}
		  client={client}
		 
		  handleCustomerSelect={handleCustomerSelect}
		  handleSellerSelect={handleSellerSelect}
		  setSelectedSeller={setSelectedSeller}
		  selectedSeller={selectedSeller}
		  setSelectedCustomer={setSelectedCustomer}
		  selectedCustomer={selectedCustomer}
        />

        <SearchProduct
          queryp={queryp}
          setQueryp={setQueryp}
          searchError={searchError}
          setSearchError={setSearchError}
          limpiar={limpiar}
          setLimpiar={setLimpiar}
          searchProductRef={searchProductRef}
          handleAddProduct={handleAddProduct}
          selectedProductPrice={selectedProductPrice}
          setSelectedProductPrice={setSelectedProductPrice}
          handlePriceChange={handlePriceChange}
          product={product}
	
		  setIsPopupOpen={setIsPopupOpen}
		  isPopupOpen={isPopupOpen}
		  openModal={openModal}  // envio la funcion 
        />
		
        <ErrorMessage message={errorMessage} show={searchError} />

        <Grid container spacing={2} sx={{ marginBottom: 2 }}>
          <Grid item xs={12}>
            <Typography variant="h6">Productos Agregados: {products.length}</Typography>
          </Grid>
          <Grid item xs={12}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Código</TableCell>
                    <TableCell>Producto</TableCell>
                    <TableCell>Descripción</TableCell>
                    <TableCell>Precio</TableCell>
                    <TableCell>Cantidad</TableCell>
                    <TableCell>Subtotal</TableCell>
                    <TableCell>Quitar</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.map((item, index) => (
                      <TableRow key={index}>
                      <TableCell>{item.barcode}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.description}</TableCell>
                      <TableCell>${item.price}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>${item.subtotal}</TableCell>
                      <TableCell>
                        <Button variant="contained" color="error" onClick={() => handleRemoveProduct(index)}>
                          Quitar
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default PosA;
