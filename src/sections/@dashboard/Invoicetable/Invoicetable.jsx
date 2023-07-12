/* eslint-disable no-lone-blocks */
/* eslint-disable react/self-closing-comp */
/* eslint-disable no-undef */
/* eslint-disable import/order */
import React, { useState , useEffect} from 'react';

import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import { getAllInvoices } from '../../../redux/modules/invoices';
import numeral from 'numeral';
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,

} from '@mui/material';

import { fDateTime } from '../../../utils/formatTime';
import { SearchInvoiceByDate } from '../../../components/SearchInvoiceByDate';
import { getAllNotas } from '../../../redux/modules/notasC';

import styled, { css } from 'styled-components';



const columns = [
	{
	  id: "id",
	  label: "Numero Factura",
	  minWidth: 50,
	},
	{
	  id: "name",
	  label: "Fecha",
	  minWidth: 100,
	},
	{
	  id: "age",
	  label: "Cedula o Rif",
	  minWidth: 50,
	},
	{
	  id: "gender",
	  label: "Monto Total de factura",
	  minWidth: 50,
	},
	{
	  id: "address",
	  label: "Afectada por Devolucion",
	  minWidth: 150,
	},
  ];
const InvoiceTable = () => {
//   const [invoices, setInvoices] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();
 const [selectedInvoices, setSelectedinvoices] = useState(null)


 const TableRow = styled.tr`
 ${({ affected }) =>
   affected &&
   css`
     background-color: yellow;
   `}
`;



const formatAmountB = (amount) => numeral(amount).format('0,0.00');
  



  useEffect(() => {
    // Llamada a la API para obtener los datos de los pacientes y almacenarlos en el estado del componente.
    dispatch(getAllInvoices());
    dispatch(getAllNotas());
  }, [dispatch]);


  const invoice = useSelector((state) => state.invoice);
  const creditNotes = useSelector((state) => state.notasc);
  
  console.log(invoice)
  
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
 
  const handleSearch = () => {
    // Lógica para buscar facturas por el valor de búsqueda (searchQuery)
  };

 

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  fDateTime()




  return (
<>
<hr />
 
<Modal open={selectedInvoices !== null} onClose={() => setSelectedinvoices(null)}>
    <Box   sx={{
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
           {selectedInvoices && (
        <>	<h2><strong>Numero Factura:</strong></h2>
            <h3>{selectedInvoices.invoiceNumber}</h3>
            <p>
			<p>
                <strong>Factura a credito:</strong>
				{selectedInvoices.credit ? 'Sí' : 'No'}
            </p>
                <strong>Status:</strong>
                {selectedInvoices.status}
            </p>
			<p>
                <strong>Cliente:</strong>
                {selectedInvoices.clienteData.name}
            </p>
            <p>
                <strong>Cedula o Rif:</strong>
                {selectedInvoices.clienteData.identification}
            </p>
          
            <p>
                <strong>Codigo Vendedor:</strong>
                {selectedInvoices.vendedorData?.codigo}
               
            </p>
            <p>
                <strong>Nombre Vendedor:</strong>
                {selectedInvoices.vendedorData?.name}
               
            </p>


            <h3>Lista de Productos:</h3>
    <ul>
      {selectedInvoices.productoFactura.map((product) => (
        <li key={product.barcode}>
           <strong>Código :  </strong> {product.barcode}<br />
           <strong>Producto: </strong> {product.name}<br />
          {/* <strong>Precio:    </strong> {product.prePSiIva.toFixed(2)}<br />
          */}
          <strong>Cantidad:  </strong> {product.quantity}<br />
          <strong>Precio sin Iva:  </strong> {product. preProductoUndSinIva.toFixed(2)}<br />
          {/* <strong>Subtotal:  </strong> {product.subtotal.toFixed(2)}<br />
          <strong>Iva:  </strong> {product.iva.toFixed(2)  }<br /> */}
        </li>
      ))}
    </ul>

 
           

    {/* <p>
                <strong>Total productos: </strong>
                {selectedInvoices.subtotal}
            </p> */}
        <p>
                <strong>Total Producto : </strong>
                {selectedInvoices.totalProductosSinIva}
            </p>
            <p>
                <strong>Iva 16%: </strong>
                {selectedInvoices.ivaTotal}
            </p>
            <p>
                <strong>Total mas Iva : </strong>
                {selectedInvoices.amount}
            </p>


            <h3>Metodo de Pago:</h3>
    <ul>
      {selectedInvoices.metodoPago.map((metodo) => (
        <li key={metodo.amount}>
           <strong>Instrumento:  </strong> {metodo?.method}<br />
           <strong>Monto: </strong> {formatAmountB(metodo?.amount)}<br />
        
         
        </li>
      ))}
    </ul>

            <p>
                <strong>Fecha de Venta: </strong>
                {fDateTime(selectedInvoices.createdAt)}
            </p>
		
			<p>
                <strong>Fecha de Vencimiento: </strong>
                {fDateTime(selectedInvoices.dueDate)}
            </p>
            <Button variant="contained" onClick={() => setSelectedinvoices(null)}>
                Cerrar
            </Button>
        </>
        )}
    </Box>
</Modal>

{/* End Modal nalysis  */}

<Box sx={{ m: 2 }}>
 <div style={{marginLeft:70}}>
  
  
  <SearchInvoiceByDate /></div>
  
  
        <TextField
          label="Buscar Facturas"
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
              {Array.isArray(invoice.invoices) && invoice.invoices.length > 0 ? (
        invoice.invoices
          .filter((item) =>
            item.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((item) => {
            const affected = creditNotes.notas.some(
              (note) => note.facturaAfectada === item.invoiceNumber
            );

            return (
              <TableRow key={item.id} affected={affected}>
                <TableCell align="left">{item.invoiceNumber}</TableCell>
                <TableCell align="left">{item.date}</TableCell>
                <TableCell align="left">{item.clienteData.identification}</TableCell>
                <TableCell align="left">{item.amount}</TableCell>
                <TableCell align="left">
                  {affected ? 'Sí' : 'No'}
                </TableCell>
                {/* ... */}
                <>
                      <TableCell className="tableCell">
                        <Button
                          variant="contained"
                          onClick={() => setSelectedinvoices(item)}
                        >
                          Ver
                        </Button>
                      </TableCell>
                      
                    </>
              </TableRow>

              
            );
          })
      ) : (
        <TableRow>
          <TableCell colSpan={6}>No hay datos disponibles</TableCell>
        </TableRow>
      )}
  </TableBody>
  
</Table>
          <TablePagination
            rowsPerPageOptions={[5,10, 100]}
            component="div"
            count={invoice.invoices.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          ></TablePagination>
        </TableContainer>
      </Box>

      <hr/>
	</>
  );
};

export default InvoiceTable;






{/* <Box>
<Typography style={{backgroundColor:'#007bff', color:"white"}} variant="h5" sx={{ marginBottom: 2 }}>
  Lista de Facturas
</Typography>
<TextField
  label="Buscar Factura"
  variant="outlined"
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
  sx={{ marginBottom: 2 }}
/>
<Button variant="contained" onClick={handleSearch}>
  Buscar
</Button>
<TableContainerStyled>
  <Table>
	<TableHead>
	  <TableRow>
		<TableCell>Factura</TableCell>
		<TableCell>Fecha</TableCell>
		<TableCell>Cliente</TableCell>
		<TableCell>Acciones</TableCell>
	  </TableRow>
	</TableHead>
	<TableBody>



	  {invoice.invoices.filter((items) =>
			items.invoicenumber.toLowerCase().includes(searchTerm.toLowerCase())
		  )
		  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
		  .map((items) => (
		<TableRow key={items.id}>
		  <TableCell>{items.invoiceNumber}</TableCell>
		  <TableCell>{items.date}</TableCell>
		  <TableCell>{items.clienteData.identification}</TableCell>
		  <TableCell>
			<ActionsContainer>
			  <Button
				variant="outlined"
				onClick={() => setSelectedinvoices(items)}
			  >
				Ver Detalles
			  </Button>
			</ActionsContainer>
		  </TableCell>
		</TableRow>
	  ))}
	</TableBody>
  </Table>
</TableContainerStyled>
{/* Aquí puedes agregar la paginación */}
{/* <TablePagination
	  rowsPerPageOptions={[5,10, 100]}
	  component="div"
	  count={invoice.length}
	  rowsPerPage={rowsPerPage}
	  page={page}
	  onPageChange={handleChangePage}
	  onRowsPerPageChange={handleChangeRowsPerPage}
	></TablePagination>
</Box> */}
 
