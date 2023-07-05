/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-restricted-globals */
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
import Swal from 'sweetalert2';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

import { useSelector, useDispatch } from 'react-redux';
import { parseInt } from 'lodash';
import { fetchProducts } from '../../../redux/modules/products';
import { createInvoices } from '../../../redux/modules/invoices';

import { ErrorMessage } from '../../../components/ErrorMessage';
import { fDateTime } from '../../../utils/formatTime';
import { CreateDevolucion } from '../../../components/CreateDevolucion';

import { SearchProduct } from '../../../components/SearchProduct';
import { SearchCustomer } from '../../../components/SearchCustomer';

// eslint-disable-next-line arrow-body-style
const PosA = ({ handleCustomerSelect, handleSellerSelect }) => {
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
  const [manualClientData, setManualClientData] = useState({
    name: 'Leoberto Zeron',
    identification: '13995284',
    address: 'Bella vista san felix',
  });
  const dispatch = useDispatch();
  const [limpiar, setLimpiar] = useState('');
  const [selectedProductPrice, setSelectedProductPrice] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [subtotal, setSubtotal] = useState(0);

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [valoresDolar, setValoresDolar] = useState({});

  const showAlert = () => {
    Swal.fire({
      title: '¡Alerta!',
      text: 'La cantidad de venta es mayor a la cantidad disponible del producto   !',
      icon: 'warning',
      confirmButtonText: 'Aceptar',
    });
  };

  useEffect(() => {
    if (queryp) {
      dispatch(fetchProducts(queryp));
    }
  }, [queryp, dispatch]);

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

  const fetchDolarValue = async () => {
    try {
      const response = await fetch('https://expressjs-postgres-production-bd69.up.railway.app/api/consulta/dolar');
      const data = await response.json();

      // Convertir los valores a números utilizando parseFloat
      const bcv = data.bcv;
      const enparalelovzla = data.enparalelovzla;
      // ...

      setValoresDolar({
        bcv,
        enparalelovzla,
        // ...
      });
    } catch (error) {
      console.error('Error al obtener los datos del dólar:', error);
    }
  };


  const [numericValue, setNumericValue] = useState(0);
  const [nformattedValue, setNformattedValue] = useState('');

  useEffect(() => {
    if (valoresDolar && valoresDolar.bcv) {
      const value = valoresDolar.bcv;
      const numericValue = parseFloat(value.replace(/[^\d,]/g, '').replace(',', '.'));
      const formattedValue = numericValue.toLocaleString(undefined, { minimumFractionDigits: 3 });

      setNumericValue(numericValue);
      setNformattedValue(formattedValue);
    } else {
      console.log('El valor de bcv no está definido');
    }
  }, [valoresDolar]);

  const handleAddProduct = (product, productsQuantity, selectedProductPrice) => {
    console.log('product', product);

    if (product && productsQuantity > 0) {
      if (productsQuantity > product.quantity) {
        setSearchError(true);
        showAlert();
        // Swal.fire('¨La cantidad de venta es mayor a la cantidad disponible del producto   !', ' clicked el Botton!', 'Alert');
        // setErrorMessage('La cantidad de venta es mayor a la cantidad disponible del producto');
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
        subtotalBs: selectedPrice * productsQuantity * parseFloat(nformattedValue),
        subtotalBsu: selectedPrice * parseFloat(nformattedValue),
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

  console.log('aquieSelecte customer', selectedCustomer);
  console.log('aquieSelecte seller', selectedSeller);
  console.log('aqui Product', products);

  // Crear Factura //

  const modifiedProducts = products.map((product) => {
    // Convierte los campos de precio y cantidad a enteros utilizando parseInt()
    const price = parseInt(product.price, 10);
    const quantity = parseInt(product.quantity, 10);

    // Retorna un nuevo objeto con los campos modificados
    return {
      ...product, // Mantén los campos existentes del producto
      price: price, // Asigna el precio convertido
      quantity: quantity, // Asigna la cantidad convertida
    };
  });

  let TotalF = 0;
  const subtotalB = subtotal / 1.16;
  const resultSubB = subtotalB;
  const iva = subtotal - resultSubB;
  TotalF = resultSubB + iva;

  console.log('el total de factura declarad', TotalF);
  // METODOS DE PAGO

  const [paymentAmounts, setPaymentAmounts] = useState({
    cash: 0,
    transfer: 0,
   divisas: 0,
    seller:0,
    panama:0,
  });

  const handlePaymentAmountChange = (method, newAmount) => {
    const updatedAmounts = {
      ...paymentAmounts,
      [method]: parseFloat(newAmount) || 0,
    };

    console.log('dentro, monto ', method, newAmount);

    setPaymentAmounts(updatedAmounts);
  };

  const paymentAmountsSum = Object.values(paymentAmounts).reduce((total, amount) => total + parseFloat(amount || 0), 0);
  const remainingAmounts = TotalF - paymentAmountsSum;
  console.log('ramainig', remainingAmounts);

  const handlePaymentMethodChange = (event) => {
    const selectedPaymentMethod = event.target.value;
    setPaymentMethod(selectedPaymentMethod);
  };

  console.log('paymetodo', paymentMethod);

  const handleCloseModal = () => {
    // Restablece los estados a sus valores iniciales
    setIsModalOpen(false);
    setPaymentMethod('');
    setPaymentAmounts({
      cash: '',
      transfer: '',
      credit: '',
    });
    setIsCredit(false);
    setSelectedDate(null);
  };

  const handleSubmitInvoice = (event) => {
    event.preventDefault();

    const paymentMethodsArray = [];

    // Recorrer el objeto paymentMethods y construir el array de métodos de pago
    for (const method in paymentAmounts) {
      const amount = paymentAmounts[method];
      const paymentMethodObj = {
        method,
        amount,
      };
      paymentMethodsArray.push(paymentMethodObj);
    }

    console.log('payMethoArray', paymentMethodsArray);

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

    // const paymentAmountsSum = Object.values(paymentAmounts).reduce((total, amount) => total + parseFloat(amount || 0), 0);

    const invoiceData = {
      credit: isCredit,
      metodoPago: paymentMethodsArray,
      dueDate: selectedDate,

      customer: {
        identification: manualClientData.identification || selectedCustomer.identification,
        name: manualClientData.name || selectedCustomer.name,
        address: manualClientData.address || selectedCustomer.address,
      },

      seller: {
        codigo: selectedSeller.codigo || '0005' ,
    
        identification: selectedSeller.identification || '13558852' ,
        name:  selectedSeller.name || 'Daniel' ,
      },

      
      
      productos: productsData, // Usar el array `productsData` con datos modificados
    };

 

    dispatch(createInvoices(invoiceData))
      .then((response) => {
        Swal.fire('¨Factura enviada  !', ' clicked el Botton!', 'success');
        setQuery('');
        setClient({});
        setProduct({});
        setProducts([]);
        setProductsQuantity(0);
        setIsModalOpen(null);
        // setManualClientData('');
        setSelectedCustomer('');
        setSelectedSeller('');
        setSubtotal(0);
        handleCloseModal();
        if (response.error) {
          setErrorMessage(response.error);
        }
      })
      .catch((error) => {
        console.log(error);

        setErrorMessage(error.message);
      });
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
  const handleManualSelect = (customer) => {
    setManualClientData(customer);
  };

  // declaro aqui
  const [isModalOpen, setIsModalOpen] = useState(false);

  // creo fucntion

  const openModal = () => {
    if (products.length > 0) {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setPaymentMethod('');
    setPaymentAmounts({
      cash: '',
      transfer: '',
      credit: '',
    });
    setIsCredit(false);
    setSelectedDate(null);
  };

  useEffect(() => {
    // Realiza la consulta inicial al cargar el componente
    fetchDolarValue();

    // Configura un intervalo para realizar consultas periódicas cada cierto tiempo
    const interval = setInterval(fetchDolarValue, 12 * 60 * 60 * 1000); // Consulta cada 12 horas

    // Limpia el intervalo cuando el componente se desmonta
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            maxHeight: '80vh',
            overflowY: 'auto',
            bgcolor: 'background.paper',
            borderRadius: '8px',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h5" sx={{ marginBottom: 2 }}>
            Resumen de Pago
          </Typography>

          <Box sx={{ marginBottom: 2 }}>
            <Typography variant="h6">SubTotal: {resultSubB.toFixed(2)}</Typography>
            <Typography variant="h6">Iva(16%): {iva.toFixed(2)}</Typography>
            <Typography variant="h6">
              Total: {currencys}
              {TotalF}
            </Typography>
          </Box>
          <Typography variant="h7">
            Por cobrar : {currencys}
            {remainingAmounts}
          </Typography>
          <hr />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth disabled={isCredit}>
                <InputLabel id="payment-method-label">Método de pago</InputLabel>
                <Select
                  labelId="payment-method-label"
                  id="payment-method"
                  value={paymentMethod}
                  onChange={handlePaymentMethodChange}
                  label="Método de pago"
                >
                  <MenuItem value="cash">Efectivo Bs </MenuItem>
                  <MenuItem value="transfer">Transferencia</MenuItem>
                  <MenuItem value="divisas">Efectivo Divisas</MenuItem>
                  <MenuItem value="seller">Seller</MenuItem>
                  <MenuItem value="panama">Banesco Panama</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {paymentMethod.includes('cash') && (
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="number"
                  label="Efectivo Bs"
                  value={paymentAmounts.cash}
                  onChange={(e) => handlePaymentAmountChange('cash', e.target.value)}
                  disabled={isCredit || remainingAmounts < 0}
                />
              </Grid>
            )}
            {paymentMethod.includes('transfer') && (
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="number"
                  label="Transferencia"
                  value={paymentAmounts.transfer}
                  onChange={(e) => handlePaymentAmountChange('transfer', e.target.value)}
                  disabled={isCredit || remainingAmounts < 0}
                />
              </Grid>
            )}

            {paymentMethod.includes('divisas') && (
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="number"
                  label="Divisas"
                  value={paymentAmounts.divisas}
                  onChange={(e) => handlePaymentAmountChange('divisas', e.target.value)}
                  disabled={isCredit || remainingAmounts < 0}
                />
              </Grid>
            )}
             {paymentMethod.includes('seller') && (
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="number"
                  label="Seller"
                  value={paymentAmounts.seller}
                  onChange={(e) => handlePaymentAmountChange('seller', e.target.value)}
                  disabled={isCredit || remainingAmounts < 0}
                />
              </Grid>
            )}
              {paymentMethod.includes('panama') && (
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="number"
                  label="Banesco Panama"
                  value={paymentAmounts.panama}
                  onChange={(e) => handlePaymentAmountChange('panama', e.target.value)}
                  disabled={isCredit || remainingAmounts < 0}
                />
              </Grid>
            )}





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
              <Button
                style={{ marginLeft: 80 }}
                variant="contained"
                onClick={handleSubmitInvoice}
                disabled={!isCredit && remainingAmounts !== 0}
              >
                Crear factura
              </Button>
            </Grid>
          </Grid>

          <hr />

          <Button variant="contained" onClick={() => closeModal()}>
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
          Tasa de el día BCV {currencys} {valoresDolar.bcv}
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
          handleManualSelect={handleManualSelect}
          nformattedValue={nformattedValue}
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
          openModal={openModal} // envio la funcion
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
                    {/* <TableCell>Descripción</TableCell> */}
                    <TableCell>Precio $ </TableCell>
                    <TableCell>Precio Bs </TableCell>
                    <TableCell>Cantidad</TableCell>
                    <TableCell>Subtotal $</TableCell>
                    <TableCell>SubTotal Bs</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.barcode}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      {/* <TableCell>{item.description}</TableCell> */}
                      <TableCell>$ {item.price}</TableCell>
                      <TableCell>Bs {item.subtotalBsu ? item.subtotalBsu.toFixed(2) : ''}</TableCell>

                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>S {item.subtotal}</TableCell>
                      <TableCell>BS {item.subtotalBs ? item.subtotalBs.toFixed(2) : ''}</TableCell>
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
