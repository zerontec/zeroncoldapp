/* eslint-disable import/no-unresolved */
/* eslint-disable arrow-body-style */
import React, { useState, useEffect, useRef } from 'react';
import { MenuItem, Select, FormControl, InputLabel, Box, Button, Grid, TextField, Typography } from '@mui/material';
import Modal from "@mui/material/Modal";
import {DayPicker} from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { fetchCustomers } from '../../../redux/modules/customer';
import { fetchProducts } from '../../../redux/modules/products';
import { createInvoices } from '../../../redux/modules/invoices';
import {fetchSellers} from '../../../redux/modules/seller'

const SummaryContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  margin-top: 16px;
  padding: 50px;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 15px;
  color: white;
  font-weight: 600;
  background-color: #27AE60;
  margin-bottom: 10px;
  margin-top: 30px;
  margin-right: 20px;
`;

const SummaryContainerP = styled(Box)`
  display: flex;
  flex-direction: column;
  margin-top: 16px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 15px;
  color: white;
  font-weight: 600;
  background-color:  #F2F3F4;
  margin-bottom: 10px;
  margin-top: 30px;
  margin-right: 20px;
`;

const FormContainer = styled.form`
  display: flex;
  gap: 3rem;
  width: 100%;
  max-width: 1000px;
  margin-bottom: 2rem;
  background-color: #212F3D;
  border-radius: 30px;
`;

const Pos = () => {
  const [client, setClient] = useState({});
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [currency, setCurrency] = useState('Bs');
  const [currencys, setCurrencys] = useState('$');
  const [query, setQuery] = useState('');
  const [queryp, setQueryp] = useState('');
  const [querys, setQuerys] = useState('');
  const [productsQuantity, setProductsQuantity] = useState(0);
  const [subtotalP, setSubtotalP] = useState(0);
  const[seller, setSeller] = useState({})
  
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [paymentMethod, setPaymentMethod] = React.useState('');
  const [isCredit, setIsCredit] = React.useState(false);

  const [isPopupOpen, setIsPopupOpen] = useState(false);



  useEffect(() => {
    if (products.length === 0) {
      setIsPopupOpen(false);
    }
  }, [products]);




  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleCreditChange = (event) => {
    setIsCredit(event.target.value === 'credit');
  };
 const handleDateChange = (date) => {
    setSelectedDate(date);
  };


  const dispatch = useDispatch();

  const searchProductRef = useRef(null);
  
  const customers = useSelector((state) => state.customer);
  const availableProducts = useSelector((state) => state.product.products);
  const availableSeller = useSelector((state) => state.seller.sellers);
  console.log(availableSeller)



  const handleProductQuantityChange = (event) => {
    setProductsQuantity(event.target.value);
  };


  const handleSearchClient = () => {
    const exactMatch = customers.customers.find(
      (customer) => customer.identification === query
    );
    if (exactMatch) {
      setClient(exactMatch);
    } else {
      const partialMatch = customers.customers.find((customer) =>
        customer.identification.includes(query)
      );
      setClient(partialMatch || {});
    }
  };

  const handleSearchProduct = () => {
    const exactMatch = availableProducts.find(
      (product) => product.barcode === queryp ||product.name === queryp
    );
    if (exactMatch) {
      setProduct(exactMatch);
    } else {
      const partialMatch = availableProducts.find((product) =>
        product.barcode.includes(queryp)
      );
      setProduct(partialMatch || {});
    }
    
  };

  const handleSearchSeller = () => {
    const exactMatch = availableSeller.find(
      (seller) => seller.identification === querys ||seller.codigo === querys
    );
    if (exactMatch) {
      setSeller(exactMatch);
    } else {
      const partialMatch = availableSeller.find((seller) =>
        seller.codigo.includes(querys)
      );
      setSeller(partialMatch || {});
    }
    
  };

  // eslint-disable-next-line spaced-comment
  //Agregar producto
  let updatedProducts =[]
  const handleAddProduct = () => {
    if (product && productsQuantity > 0) {
      const updatedProduct = { ...product, cantidad: productsQuantity, subtotalP: productsQuantity * product.price };
      updatedProducts = [...products, updatedProduct];
      
      setProducts(updatedProducts);
      setProduct({});
      setProductsQuantity(0);
  
      const updatedSubtotal = updatedProducts.reduce(
        (subtotal, product) => subtotal + product.subtotalP,
        0
      );
      setSubtotal(updatedSubtotal);
    }

    setQueryp('')
    setProductsQuantity(0)
    searchProductRef.current.focus();

  };
  
  const productoLista = products;
  console.log("aquiProductoList", productoLista)




// console.log("aqui clienteData", clienteData)


const handleSubmit = (event) => {

event.preventDefault();

const invoiceData = {
  credit:isCredit,
  paymentMethod,
  dueDate:selectedDate,
  customer:{identification:client.identification,
  name:client.name,
  address:client.address
  },

   seller:{

    codigo:seller.codigo,
    identification:seller.identification,
    name:seller.name

},


  productos:productoLista


}


dispatch(createInvoices(invoiceData))

setQuery('');
setClient({});
setProduct({});
setProducts([]);
setProductsQuantity(0);
setSubtotal(0);
setIsPopupOpen(null)


}



// console.log("aqui update Product",updatedProducts)

// const handleAddProduct = (event) => {
//   event.preventDefault();
  


//   const products = {
//     name: products.name,

//   };


// };




  useEffect(() => {
    if (query) {
      dispatch(fetchCustomers(query));
    }
  }, [query, dispatch]);

  useEffect(() => {
    if (queryp) {
      dispatch(fetchProducts(queryp));
    }
  }, [queryp, dispatch])

  useEffect(() => {
    if (querys) {
      dispatch(fetchSellers(querys));
    }
  }, [querys, dispatch])




  const openPopup = () => {
    if (products.length > 0) {
      setIsPopupOpen(true);
    }
  };
const closePopup = () => {
  setIsPopupOpen(false);
};

  // const handleSubmit = (event) => {
  //   event.preventDefault();
   
  //     return;
    
  //   // eslint-disable-next-line no-unreachable
  //   const invoiceData = {
  //     customer: {
        
  //     },
  //     analysis: 
  //   };

  //   dispatch(createInvoices(invoiceData));

  //   setQuery("");
    
 
   
  // };


  return (


    <>

<Modal open={isPopupOpen === true} onClose={() => setIsPopupOpen(null)}>
<Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, bgcolor: "background.paper", borderRadius: "8px", boxShadow: 24, p: 4 }}>
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          Resumen de pago
        </Typography>

        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="body1">SubTotal: {(subtotal).toFixed(2)}</Typography>
          <Typography variant="body1">Iva(16%): {(subtotal * 0.16).toFixed(2)}</Typography>
          <Typography>Total: {currency} {(subtotal + subtotal * 0.16).toFixed(2)}</Typography>
          <Typography variant="body1">Método de pago: {paymentMethod}</Typography>
          <Typography variant="body1">A crédito: {isCredit ? 'Sí' : 'No'}</Typography>
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
                <MenuItem value="credit">Crédito</MenuItem>
                <MenuItem value="debit">Débito</MenuItem>
                <MenuItem value="cash">Efectivo</MenuItem>
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
            <Button style={{ marginLeft: 80 }} variant="contained" onClick={handleSubmit}>
              Crear factura
            </Button>
          </Grid>
        </Grid>

        <hr />

        <Button variant="contained" onClick={() => setIsPopupOpen(null)}>
          X
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
      <FormContainer>
        {/* Formulario de búsqueda y agregar cliente */}
        <Grid container spacing={2} sx={{ marginBottom: 2, marginTop: '20px', marginLeft: '10px' }}>
          <Grid item xs={12} md={3}  >
            <TextField
           
              label="Buscar Cliente"
              variant="outlined"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onBlur={handleSearchClient}
            />
            
               <TextField
           style={{marginTop:10}}
           label="Agregar Vendedor"
           variant="outlined"
           value={querys}
           onChange={(event) => setQuerys(event.target.value)}
           onBlur={handleSearchSeller}
         />

<TextField
              label="Nombre vendedor"
              variant="outlined"
              sx={{ marginBottom: 2 }}
              value={seller.name || ''}
              disabled
              style={{marginTop:10}}
            />  
          </Grid>

          



          <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', marginTop: '20px' }}>
            <TextField
              label="Nombre"
              variant="outlined"
              sx={{ marginBottom: 2, marginRight: 20 }}
              value={client.name || ''}
              disabled
            />
            <TextField
              label="Identificación"
              variant="outlined"
              sx={{ marginBottom: 2, marginRight: 20 }}
              value={client.identification || ''}
              disabled
            />
            <TextField
              label="Dirección"
              variant="outlined"
              sx={{ marginBottom: 2, marginRight: 20 }}
              value={client.address || ''}
              disabled
            />
          </Grid>

          <Box>
            {/* Resumen de la factura */}
            <Grid container spacing={2} sx={{ marginBottom: 2 }}>
              <Grid item xs={12} md={12}>
              <SummaryContainer>
  <Typography>Subtotal: {(subtotal).toFixed(2)}</Typography>
  <Typography>Iva(16%): {(subtotal * 0.16).toFixed(2)}</Typography>
  <Typography>Total: {currency} {(subtotal + subtotal * 0.16).toFixed(2)}</Typography>
  <Typography>Moneda: {currency}</Typography>
  <Typography>Monto en: {currencys}</Typography>
</SummaryContainer>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </FormContainer>

      {/* Formulario de búsqueda y agregar productos */}
      <Grid container spacing={2} sx={{ marginBottom: 2 }}>
        <Grid item xs={12} md={3}>
          <TextField label="Buscar Producto" 
          ref={searchProductRef}
          variant="outlined" 
          fullWidth
          value={queryp}
          onChange={(event) => setQueryp(event.target.value)}
          onBlur={handleSearchProduct}
          
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField label="Descripción" variant="outlined" fullWidth     value={product.description || ''}/>
        </Grid>
        <Grid item xs={12} md={2}>
          <TextField label="Precio" variant="outlined" fullWidth value={product.price|| ''} />
        </Grid>
        <Grid item xs={12} md={2}>
          <TextField label="Cantidad" type="number" variant="outlined" fullWidth  
          value={productsQuantity}
          onChange={handleProductQuantityChange}   />
        </Grid>
        <Grid item xs={12} md={2}>
          <Button variant="contained" onClick={handleAddProduct} disabled={!product || productsQuantity <= 0}>
            Agregar Producto
          </Button>

          <Button variant="contained" onClick={openPopup}>
 Finalizar Venta
</Button>
        </Grid>
      </Grid>

      {/* Lista de productos agregados */}
      <Grid container spacing={2} sx={{ marginBottom: 2 }}>
        <Grid item xs={12}>
          <Typography variant="h6">Productos Agregados</Typography>
        </Grid>
        {products.map((items, index) => (
          
          <Grid item xs={12} key={index}>
            <SummaryContainerP style={{color:"black"}}>
            <Typography>{items.barcode}</Typography>
              <Typography>{items.name}</Typography>
              <Typography>{items.description}</Typography>
              <Typography>{items.price}</Typography>
              <Typography>{items.cantidad}</Typography>
              <Typography>{items.subtotalP}</Typography>
             
            </SummaryContainerP>
          </Grid>
        ))}
      </Grid>
    </Box>
    </>
  );
};

export default Pos;





// COMPONENTE DDDE COMPRA 
// import React, { useState } from 'react';
// import { Box, Button, Grid, TextField, Typography } from '@mui/material';
// import styled from 'styled-components';

// const FormContainer = styled(Grid)`
//   margin-bottom: 16px;
// `;

// const SummaryContainer = styled(Box)`
//   margin-top: 16px;
//   padding: 16px;
//   border: 1px solid #ccc;
//   border-radius: 4px;
// `;

// const Pos = () => {
//   const [provider, setProvider] = useState({});
//   const [invoice, setInvoice] = useState({});
//   const [product, setProduct] = useState({});
//   const [total, setTotal] = useState(0);

//   const handleSearchProvider = () => {
//     // Agregar lógica para buscar al proveedor
//   };

//   const handleAddProduct = () => {
//     // Agregar lógica para agregar un producto
//   };

//   return (
//     <Box>
//       <Typography variant="h5" sx={{ marginBottom: 2 }}>
//         Carga de Compras
//       </Typography>

//       {/* Formulario de búsqueda y agregar proveedor */}
//       <FormContainer container spacing={2} alignItems="flex-start">
//         <Grid item xs={12} md={4}>
//           <TextField
//             label="Buscar Proveedor"
//             variant="outlined"
//             fullWidth
//             onChange={handleSearchProvider}
//           />
//         </Grid>
//         <Grid item xs={12} md={4}>
//           <TextField label="Nombre" variant="outlined" fullWidth value={provider.name || ''} disabled />
//           <TextField
//             label="Identificación"
//             variant="outlined"
//             fullWidth
//             value={provider.identification || ''}
//             disabled
//           />
//           <TextField
//             label="Dirección"
//             variant="outlined"
//             fullWidth
//             value={provider.address || ''}
//             disabled
//           />
//         </Grid>
//       </FormContainer>

//       {/* Formulario de datos de la factura */}
//       <FormContainer container spacing={2} alignItems="flex-start">
//         <Grid item xs={12} md={4}>
//           <TextField label="Número de Factura" variant="outlined" fullWidth />
//         </Grid>
//         <Grid item xs={12} md={4}>
//           <TextField label="Fecha de Factura" variant="outlined" fullWidth type="date" />
//         </Grid>
//       </FormContainer>

//       {/* Resumen de la compra */}
//       <SummaryContainer>
//         <Typography variant="h6">Resumen de la Compra</Typography>
//         <Typography>Total: {total}</Typography>
//       </SummaryContainer>

//       {/* Formulario de carga de producto */}
//       <FormContainer container spacing={2} alignItems="flex-start">
//         <Grid item xs={12} md={2}>
//           <TextField label="Código" variant="outlined" fullWidth />
//         </Grid>
//         <Grid item xs={12} md={4}>
//           <TextField label="Descripción" variant="outlined" fullWidth />
//         </Grid>
//         <Grid item xs={12} md={2}>
//           <TextField label="Precio" variant="outlined" fullWidth />
//         </Grid>
//         <Grid item xs={12} md={2}>
//           <TextField label="Costo" variant="outlined" fullWidth />
//         </Grid>
//         <Grid item xs={12} md={2}>
//           <TextField label="Precio de Venta" variant="outlined" fullWidth />
//         </Grid>
//         <Grid item xs={12} md={4}>
//           <Button variant="contained" onClick={handleAddProduct}>
//             Agregar Producto
//           </Button>
//         </Grid>
//       </FormContainer>
//     </Box>
//   );
// };

// export default Pos;




// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 16px;
//   padding: 24px;
//   background-color: #f5f5f5;
//   border-radius: 8px;
// `;

// const FormContainer = styled.div`
//   display: flex;
//   gap: 16px;
// `;

// const FormGroup = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 8px;
// `;

// const SubtotalContainer = styled.div`
//   display: flex;
//   justify-content: flex-end;
//   align-items: center;
//   gap: 8px;
//   margin-top: 16px;
// `;

// const ProductContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 8px;
// `;

// const Pos = () => {
//   const [buscarCliente, setBuscarCliente] = useState('');
//   const [agregarCliente, setAgregarCliente] = useState('');
//   const [buscarProducto, setBuscarProducto] = useState('');
//   const [agregarProducto, setAgregarProducto] = useState('');
//   const [descripcionProducto, setDescripcionProducto] = useState('');
//   const [cantidad, setCantidad] = useState(1);
//   const [precio, setPrecio] = useState(0);
//   const [usarDolares, setUsarDolares] = useState(false);
//   const [subtotal, setSubtotal] = useState(0);
//   const [productos, setProductos] = useState([]);

//   const handleCantidadChange = (event) => {
//     const value = event.target.value;
//     setCantidad(value);
//     calcularSubtotal(value, precio);
//   };

//   const handlePrecioChange = (event) => {
//     const value = event.target.value;
//     setPrecio(value);
//     calcularSubtotal(cantidad, value);
//   };

//   const calcularSubtotal = (cantidad, precio) => {
//     const subtotal = cantidad * precio;
//     setSubtotal(subtotal);
//   };

//   const handleUsarDolaresChange = (event) => {
//     const checked = event.target.checked;
//     setUsarDolares(checked);
//   };

//   const handleBuscarCliente = () => {
//     // Lógica para buscar cliente
//   };

//   const handleAgregarCliente = () => {
//     // Lógica para agregar cliente
//   };

//   const handleBuscarProducto = () => {
//     // Lógica para buscar producto
//   };

//   const handleAgregarProducto = () => {
//     const nuevoProducto = {
//       cantidad,
//       descripcion: descripcionProducto,
//       precio,
//       subtotal,
//     };
//     setProductos([...productos, nuevoProducto]);
//     setDescripcionProducto('');
//     setCantidad(1);
//     setPrecio(0);
//     setSubtotal(0);
//   };

//   const handleFormSubmit = (event) => {
//     event.preventDefault();
//     // Lógica para enviar el formulario
//   };

//   return (
//     <Container>
//       <form onSubmit={handleFormSubmit}>
//         <Typography variant="h6">Facturación</Typography>

//         <FormContainer>
//         <FormGroup>
//   <TextField
//     label="Agregar Cliente"
//     value={agregarCliente}
//     onChange={(event) => setAgregarCliente(event.target.value)}
//   />
//   <Button variant="outlined" onClick={handleAgregarCliente}>
//     Agregar
//   </Button>
// </FormGroup>
//           <FormGroup>
//             <TextField
//               label="Agregar Cliente"
//               value={agregarCliente}
//               onChange={(event) => setAgregarCliente(event.target.value)}
//             />
//             <Button variant="outlined" onClick={handleAgregarCliente}>
//               Agregar
//             </Button>
//           </FormGroup>
//         </FormContainer>

//         <FormContainer>
//           <FormGroup>
//             <TextField
//               label="Buscar Producto"
//               value={buscarProducto}
//               onChange={(event) => setBuscarProducto(event.target.value)}
//             />
//             <Button variant="outlined" onClick={handleBuscarProducto}>
//               Buscar
//             </Button>
//           </FormGroup>

//           <FormGroup>
//             <TextField
//               label="Agregar Producto"
//               value={agregarProducto}
//               onChange={(event) => setAgregarProducto(event.target.value)}
//             />
//             <Button variant="outlined" onClick={handleAgregarProducto}>
//               Agregar
//             </Button>
//           </FormGroup>
//         </FormContainer>

//         <ProductContainer>
//           <TextField
//             label="Descripción del Producto"
//             value={descripcionProducto}
//             onChange={(event) => setDescripcionProducto(event.target.value)}
//           />

// <FormGroup>
//   <TextField
//     label="Cantidad"
//     type="number"
//     value={cantidad}
//     onChange={handleCantidadChange}
//   />
// </FormGroup>

// <FormGroup>
//   <TextField
//     label="Precio"
//     type="number"
//     value={precio}
//     onChange={handlePrecioChange}
//   />
// </FormGroup>

//           <Button variant="contained" onClick={handleAgregarProducto}>
//             Agregar Producto
//           </Button>
//         </ProductContainer>

//         <SubtotalContainer>
//           <Typography>
//             Cantidad de Productos: {productos.length} - Subtotal: {usarDolares ? '$' : 'Bs.'} {subtotal}
//           </Typography>
//           <Button variant="contained" type="submit">
//             Finalizar Compra
//           </Button>
//         </SubtotalContainer>
//       </form>
//     </Container>
//   );
// };

// export default Pos;








// import React, { useState } from 'react';
// import { TextField, FormControlLabel, Checkbox, Button, Typography,Box,  Grid, } from '@mui/material';
// // import { styled } from '@mui/system';
// import styled from "styled-components";
// // MUI components


// // Styled components
// const SummaryContainer = styled.div`
//   display: flex;
//   justify-content: flex-end;
//   gap: 16px;
//   margin-top: 16px;
// `;

// const ProductFormContainer = styled.div`
//   margin-top: 16px;
// `;

// const ProductForm = styled.div`
//   display: grid;
//   grid-template-columns: 1fr 1fr 1fr;
//   gap: 16px;
// `;

// const ProductDescription = styled.div`
//   grid-column: 1 / -1;
// `;

// const ProductItem = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: 8px;
// `;

// const Pos = () => {
//   const [products, setProducts] = useState([]);
//   const [subtotal, setSubtotal] = useState(0);
//   const [total, setTotal] = useState(0);

//   const handleAddProduct = () => {
//     // Agregar lógica para agregar un producto a la factura
//   };

//   return (
//     <Box>
//       <Typography variant="h5" sx={{ marginBottom: 2 }}>
//         Facturación
//       </Typography>

//       {/* Formulario de búsqueda y agregar cliente */}
//       {/* ... código del formulario de búsqueda y agregar cliente ... */}

//       {/* Formulario de búsqueda y agregar productos */}
//       <ProductFormContainer>
//         <Typography variant="h6" sx={{ marginBottom: 2 }}>
//           Agregar Producto
//         </Typography>

//         <ProductForm>
//           <TextField label="Número de Items" variant="outlined" />
//           <TextField label="Descripción" variant="outlined" />
//           <TextField label="Cantidad" variant="outlined" />
//         </ProductForm>

//         <Button variant="contained" onClick={handleAddProduct} sx={{ marginTop: 2 }}>
//           Agregar Producto
//         </Button>
//       </ProductFormContainer>

//       {/* Productos agregados a la factura */}
//       <ProductFormContainer>
//         <Typography variant="h6" sx={{ marginBottom: 2 }}>
//           Productos Agregados
//         </Typography>

//         {products.map((product, index) => (
//           <ProductItem key={index}>
//             <div>{product.description}</div>
//             <div>{product.quantity}</div>
//             <div>{product.price}</div>
//           </ProductItem>
//         ))}
//       </ProductFormContainer>

//       {/* Resumen de la factura */}
//       <SummaryContainer>
//         <Typography variant="subtitle1">Subtotal: {subtotal}</Typography>
//         <Typography variant="subtitle1">IVA: {subtotal * 0.16}</Typography>
//         <Typography variant="h6">Total: {total}</Typography>
//       </SummaryContainer>
//     </Box>
//   );
// };

// export default Pos;
