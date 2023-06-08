/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/self-closing-comp */
import React, { useState, useEffect } from "react";


import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";

import Swal from "sweetalert2";
import Modal from "@mui/material/Modal";
import styled from "styled-components";
import { getAllProduct,deleteProduct, updateProduct  } from '../../../redux/modules/products';



const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
`;

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 16px;

  & > * {
    margin-bottom: 8px;
  }
`;


const ActionsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;
`;


const columns = [
	{
	  id: "id",
	  label: "Codigo",
	  minWidth: 50,
	},
	{
	  id: "name",
	  label: "Producto",
	  minWidth: 100,
	},
	{
	  id: "age",
	  label: "Descripcion",
	  minWidth: 50,
	},
	{
	  id: "gender",
	  label: "Precio",
	  minWidth: 50,
	},
	{
	  id: "address",
	  label: "Cantidad",
	  minWidth: 150,
	},
  ];




const ProductTable = () => {


	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedProduct, setSelectedProduct] = useState(null);
	const [errors, setErrors] = useState({});
	const [selectedProductId, setSelectedProductId] = useState(null);
	const [open, setOpen] = useState(false);




	const dispatch = useDispatch()

	useEffect(() => {
		// Llamada a la API para obtener los datos de los pacientes y almacenarlos en el estado del componente.
		dispatch(getAllProduct());
	  }, [dispatch]);


const product = useSelector((state)=> state.product)
console.log(product)

	const handleEditClick = (product) => {
		setSelectedProductId(product.id		);
		setSelectedProductEdit({
		  name: product.name,
		  description: product.description,
		  price: product.price,
		 
		});
		setOpen(true);
	  };
	  const [selectedProductEdit, setSelectedProductEdit] = useState({
		name: "",
		description: "",
		price: "",
		
	  });
	
	  function deleteHandler(items) {
		Swal.fire({
		  title: "Estas Seguro",
		  text: "No podras revertir esta operacion !",
		  icon: "advertencia",
		  showCancelButton: true,
		  confirmButtonColor: "#3085d6",
		  cancelButtonColor: "#d33",
		  confirmButtonText: "Si, Borrar!",
		}).then((result) => {
		  if (result.isConfirmed) {
			dispatch(deleteProduct(items.id));
			Swal.fire("El producto ha sido borrado!");
	
			setTimeout(() => {
			  window.location.reload();
			}, 500);
		  } else {
			Swal.fire("El producto  Esta Seguro !");
		  }
		});
	  }

	  const handleCloseModal = () => {
		setSelectedProductId(null);
		setSelectedProductEdit({
		  name: "",
		  description: "",
		  price: "",
		  quantity:0
		});
		setOpen(false);
	  };

	

	  const handleChangePage = (event, newPage) => {
		setPage(newPage);
	  };
	
	  const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	  };
	
	  const handleSubmit = (e) => {
		if (
		  selectedProductEdit.name &&
		  selectedProductEdit.description &&
		  selectedProductEdit.price 
		
		) {
		  e.preventDefault();
	
		  const data = {
			...selectedProductEdit,
			id: selectedProductId,
		  };
		  dispatch(updateProduct(selectedProductId, data));
		  Swal.fire(
			"¨Producto Editado con Exito  !",
			"You clicked the button!",
			"success"
		  );
		  dispatch(getAllProduct());
		  
		  handleCloseModal();
		//   getAllAnalysis();
		  
		} else {
		  Swal.fire({
			icon: "error",
			title: "Oops...",
			text: "Debe completar toda la informacion !",
		  });
	
		  handleCloseModal();
		}
	  };
	
	  const handleSearch = () => {
		// Lógica para realizar la búsqueda de pacientes en la API y actualizar el estado del componente con los resultados.
	  };
	



	return (

		<>
		<hr />
		{/* Modal Ver Analysis */}
		<Modal
		  open={selectedProduct !== null}
		  onClose={() => setSelectedProduct(null)}
		>
		  <Box
			sx={{
			  position: "absolute",
			  top: "50%",
			  left: "50%",
			  transform: "translate(-50%, -50%)",
			  width: 400,
			  bgcolor: "background.paper",
			  borderRadius: "8px",
			  boxShadow: 24,
			  p: 4,
			}}
		  >
			{/* Aquí va el contenido del modal */}
			{selectedProduct && (
			  <>
				<h2>{selectedProduct.name}</h2>
				<p>
				  <strong>Codigo:</strong> {selectedProduct.barcode}
				</p>
				<p>
				  <strong>Descripción:</strong> {selectedProduct.description}
				</p>
				<p>
				  <strong>Precio:</strong> {selectedProduct.price}
				</p>
				<p>
				  <strong>Cantidad:</strong> {selectedProduct.quantity}
				</p>
				<Button
				  variant="contained"
				  onClick={() => setSelectedProduct(null)}
				>
				  Cerrar
				</Button>
			  </>
			)}
		  </Box>
		</Modal>
		{/* End Modal nalysis  */}
  
		{/* Modal para editar el análisis */}
		<Modal open={open} onClose={handleCloseModal}>
		  <Box
			sx={{
			  position: "absolute",
			  top: "50%",
			  left: "50%",
			  transform: "translate(-50%, -50%)",
			  width: 400,
			  bgcolor: "background.paper",
			  borderRadius: "8px",
			  boxShadow: 24,
			  p: 4,
			}}
		  >
			
			  <h2>Editar Producto</h2>
			  {selectedProductEdit && (
				<form
				  onSubmit={(e) => {
					e.preventDefault();
				  }}
				>
				  <FormContainer>
				<FieldContainer>
				  <TextField
					  type="text"
					  value={setSelectedProductId.id}
					  onChange={(e) =>
						setSelectedProductId({
						  ...selectedProductId,
						  id: e.target.value,
						})
					  }
					/>
				 
				 <TextField
					label="Nombre"
				 
					  type="text"
					  value={selectedProductEdit.name}
					  onChange={(e) =>
						setSelectedProductEdit({
						  ...selectedProductEdit,
						  name: e.target.value,
						})
					  }
					/>
				 
				  <br />
				  <TextField
					  label= "Descripción"
					  name="description"
					  value={selectedProductEdit.description}
					  onChange={(e) =>
						setSelectedProductEdit({
						  ...selectedProductEdit,
						  description: e.target.value,
						})
					  }
					/>
				  
  
				  <TextField
				   label= "Precio"
				   name="price"
					  value={selectedProductEdit.price}
					  onChange={(e) =>
						setSelectedProductEdit({
						  ...selectedProductEdit,
						  price: e.target.value,
						})
					  }
					/>
					
				
				 
				 
				  <br />
				  </FieldContainer>
				  <ActionsContainer>
				  <Button
					variant="contained"
					type="submit"
					color="primary"
					onClick={handleSubmit}
				  >
					Guardar cambios
				  </Button>
				  </ActionsContainer>
				  </FormContainer>
				</form>
			  )}
			   <hr />
			  <Button variant="contained" onClick={() => setOpen(null)}>
			  Cerrar
			</Button>
		  </Box>
		</Modal>
  
		<Box sx={{ m: 2 }}>
		  <TextField
			label="Buscar Analisis"
			value={searchTerm}
			onChange={(e) => setSearchTerm(e.target.value)}
		  />
		  <Button variant="contained" onClick={handleSearch}>
			Buscar
		  </Button>
		  <TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }}>
			  <TableHead>
				<TableRow>
				  {" "}
				  {columns.map((column) => (
					<TableCell
					  key={column.id}
					  align="left"
					  minWidth={column.minWidth}
					>
					  {" "}
					  {column.label}{" "}
					</TableCell>
				  ))}{" "}
				</TableRow>
			  </TableHead>
			  <TableBody>
				{" "}
				{product.products.filter((items) =>
					items.name.toLowerCase().includes(searchTerm.toLowerCase())
				  )
				  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
				  .map((items) => (
					<TableRow key={items.id}>
					  <TableCell align="left"> {items.barcode}</TableCell>
					  <TableCell align="left"> {items.name}</TableCell>
					  <TableCell align="left"> {items.description}</TableCell>
					  <TableCell align="left"> {items.price}</TableCell>
					  <TableCell align="left"> {items.quantity}</TableCell>
					  <>
						<TableCell className="tableCell">
						  <Button
							variant="contained"
							onClick={() => setSelectedProduct(items)}
						  >
							Ver
						  </Button>
						</TableCell>
						<TableCell className="tableCell">
						  {/* <Link
							to={`analisis/edit/${analisi.codigo}`}
							style={{ textDecoration: "none" }}
						  >
							<div className="viewButton">Editar</div>
						  </Link> */}
						  <Button
							variant="contained"
							onClick={() => handleEditClick(items)}
						  >
							Editar
						  </Button>
						</TableCell>
  
						<TableCell className="tableCell">
						  <div
							className="deleteButton"
							id={items.id}
							onClick={() => deleteHandler(items)}
						  >
						  <Button>Borrar</Button>
						  </div>
						</TableCell>
					  </>
					</TableRow>
				  ))}{" "}
			  </TableBody>
			</Table>
			<TablePagination
			  rowsPerPageOptions={[5,10, 100]}
			  component="div"
			  count={product.products.length}
			  rowsPerPage={rowsPerPage}
			  page={page}
			  onPageChange={handleChangePage}
			  onRowsPerPageChange={handleChangeRowsPerPage}
			></TablePagination>
		  </TableContainer>
		</Box>
	  </>
	)
};

export const ProductTableStyle = styled.div``;

export default ProductTable;
