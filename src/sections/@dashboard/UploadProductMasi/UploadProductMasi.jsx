import React, { useState } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { uploadMasi } from '../../../redux/modules/products';

const UploadProductMasi = () => {

const dispatch = useDispatch();
const [loading, setLoading] = useState(false);
const [messageError, setMessageError] = useState({});
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    quantity: '',
    price: '',
    barcode: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddProduct = () => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
    setNewProduct({
      name: '',
      quantity: '',
      price: '',
      barcode: ''
    });
  };

  const handleDeleteProduct = (index) => {
    setProducts((prevProducts) => prevProducts.filter((_, i) => i !== index));
  };

  const handleUploadProducts = () => {
    // Aquí puedes enviar los productos al servidor para su carga masiva
  
	dispatch(uploadMasi(products))
  .then((response) => {
    setLoading(false);
    Swal.fire('Carga creada con éxito!', '', 'success');
	setProducts([])
  if (response.error) {
    setMessageError(response.error);
  }
	console.log(products);
  })
.catch((error) => {
  console.log(error);
  setLoading(false);

  setMessageError(error.message);
  Swal.fire(error.message);
});
// Limpia el formulario después de la creación exitosa del proveedor
};
  return (
    <div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Codigo</TableCell>
              <TableCell align="center">Producto</TableCell>
              <TableCell align="center">Cantidad</TableCell>
              <TableCell align="center">Precio</TableCell>
              {/* <TableCell align="center"></TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product, index) => (
              <TableRow key={index}>
                <TableCell>{product.barcode}</TableCell>
                <TableCell align="center">{product.name}</TableCell>
                <TableCell align="center">{product.quantity}</TableCell>
                <TableCell align="center">{product.price}</TableCell>
                <TableCell align="center">
                  <DeleteIcon onClick={() => handleDeleteProduct(index)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

	  <TextField
        name="barcode"
        label="Código "
        value={newProduct.barcode}
        onChange={handleInputChange}
      />
      <TextField
        name="name"
        label="Producto"
        value={newProduct.name}
        onChange={handleInputChange}
      />
   
      <TextField
        name="quantity"
        label="Cantidad"
        value={newProduct.quantity}
        onChange={handleInputChange}
      />
      <TextField
        name="price"
        label="Precio"
        value={newProduct.price}
        onChange={handleInputChange}
      />
      <Button variant="contained" color="primary" onClick={handleAddProduct} 
	  startIcon={<AddIcon />}
	  disabled={!newProduct.barcode || !newProduct.name || !newProduct.quantity || !newProduct.price}
	  >
        Agregar Producto
      </Button>
      <Button variant="contained" color="secondary" onClick={handleUploadProducts}>
        Cargar Productos
      </Button>
    </div>
  );
};

export default UploadProductMasi;
