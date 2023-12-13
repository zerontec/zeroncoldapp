"use client";

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import Autocomplete from '@mui/material/Autocomplete';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Swal from 'sweetalert2';
import {  Typography, TableCell, Alert, Button, ButtonBase, TextField, Table, TableRow } from '@mui/material';
import { getAllTask, createTask } from '../../redux/modules/task';


import { fetchCustomers } from '../../redux/modules/customer';
import { fetchUsers } from '../../redux/modules/user';
import { ErrorMessage } from '../ErrorMessage';



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

const TableContainer = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
`;
const StyledTextField = styled(TextField)`
  && {
    margin-top: 10px;
    color: #ffffff;
    text-align: center;

    input {
      text-align: center;

      color: #919eab;
    }
  }
`;


const CreteTask = ({tecnicoId, clienteId, asigneTecnico }) => {


	const [errors, setErrors] = useState({});
	const { message } = useSelector((state) => state);
	const [loading, setLoading] = useState(false);
	const [selectButton, setSelectButton] = useState(null);
	const [messageError, setMessageError] = useState({});
	const [query, setQuery] = useState('');
	const [queryt, setQueryt] = useState('');
	const [customer, setCustomer] = useState({});
	const [searchError, setSearchError] = useState(false);
  
	const dispatch = useDispatch();
  
	const [formInfo, setFormInfo] = useState({
	  customer: '',
	  description: '',
	  note: '',
	  address: '',
	  
	});
	const [isFormValid, setIsFormValid] = useState(false);
  
	const validateForm = () => {
	  const { description, address,  customer } = formInfo;
	  setIsFormValid(description.trim() !== ''
     && address.trim() !== '' &&
     customer.trim() !== '' &&
		// isAddingTechnician ? formInfo.technician.trim() !== '' : true &&
		selectedCustomer ? selectedCustomer.customer.trim() !== '' : true
    )
	};
  
	useEffect(() => {
	  validateForm();
	}, [formInfo]);
  
	useEffect(() => {
	  dispatch(getAllTask());
	}, [dispatch]);
  
	useEffect(() => {
	  if (query) {
		dispatch(fetchCustomers(query));
	  }
	}, [query, dispatch]);
  
	useEffect(() => {
	  if (queryt) {
		dispatch(fetchUsers(queryt));
	  }
	}, [queryt, dispatch]);
  
	const validateFormInfo = () => {
    const errors = {};
  
    errors.customer = formInfo.customer ? '' : 'Ingrese un Cliente';
    errors.description = formInfo.description ? '' : 'Ingrese una Descripción';
    errors.address = formInfo.address ? '' : 'Ingrese una dirección';
  
    return errors;
  };
  
	function capitalizeFirstLetter(text) {
	  if (!text) return '';
	  return text.charAt(0).toUpperCase() + text.slice(1);
	}
  
 
	console.log('forimfo', formInfo);
  
	const [selectedCustomer, setSelectedCustomer] = useState(null);
  
	const availableCustomer = useSelector((state) => state.customer);
	console.log('aqui clientes', availableCustomer);
  
	const handleCustomerSelect = (customer) => {
	  setSelectedCustomer(customer); // Actualiza el estado del cliente seleccionado
	  setFormInfo({
		...formInfo,
		cliente_id: customer.id, // Actualiza el ID del cliente en el estado del formulario
		// Otras propiedades del cliente que quieras agregar al formulario
	  });
	};



  const handleChange = (event) => {
    const { name, value } = event.target;
  
    // Actualiza el estado del formulario
    setFormInfo((prevFormInfo) => ({
      ...prevFormInfo,
      [name]: value,
    }));
  
    // Valida el formulario utilizando el último estado actualizado
    setErrors(validateFormInfo({ ...formInfo, [name]: value }));
  };
  

  
	const [selectedTec, setSelectedTec] = useState(null);
  
	const availableTec = useSelector((state) => state.usuarios);
	console.log('aqui users', availableTec);
  
  
	const idt = selectedTec ? selectedTec.id : '';
   
  const trueT = selectedTec ? selectedTec.asignar_tecnico : '';
	
	console.log('idt tru', idt, trueT);
  
  
  
	const handleTecSelect = (usuarios) => {
	if (usuarios && usuarios.id) {
	  setSelectedTec(usuarios); // Actualiza el estado del técnico seleccionado
	  setFormInfo({
		...formInfo,
		// Puedes realizar otras actualizaciones en formInfo si es necesario
	  });
	} else {
	  // Manejar el caso en que usuarios o usuarios.id es undefined
	  console.error("Usuario o ID de usuario indefinido");
	}
  };
   
	const updatedFormInfo = {
	  ...formInfo,
	  tecnico_id: idt,
	  asignar_tecnico: trueT
	};
  
	console.log('updateFor', updatedFormInfo);
  
	const handleSubmit = (event) => {
	  event.preventDefault();
  
	  setLoading(true);
	  dispatch(createTask(updatedFormInfo))
		.then((response) => {
		  setLoading(false);
		  Swal.fire('tarea creada con éxito!', '', 'success');
		  dispatch(getAllTask());
		  setFormInfo({
			customer: '',
			description: '',
  
			address: '',
  
			technician: '',
		  });
		  setSelectButton(null);
		  if (response.error) {
			setMessageError(response.error);
		  }
		})
		.catch((error) => {
		  console.log(error);
		  setLoading(false);
		  setSelectButton(null);
		  setMessageError(error.message);
		  Swal.fire(error.message);
		});
	};
  
	const navigate = useNavigate();
  
	const handleLinkClick = (link) => {
	  navigate(link);
	  console.log(`Redireccionando a ${link}`);
	};
  
	const [isAddingTechnician, setIsAddingTechnician] = useState(false);
  
	const toggleAddingTechnician = () => {
	  setIsAddingTechnician((prevValue) => !prevValue);
	};
  
	const handleClientSelect = (selectedClient) => {
	  setFormInfo((prevFormInfo) => ({
		...prevFormInfo,
		client: selectedClient.id,
	  }));
	};
  
	const handleModalClose = () => {
	  setSelectButton(null);
	  setSelectedCustomer(null);
	  setSelectedTec(null);
	  toggleAddingTechnician();
	 
	  // setQueryt('');
	  setQuery('');
	  // handleTecSelect();
	  // handleCustomerSelect();
	  // Restablecer otros estados según sea necesario
	};




	return (
		<>

  <Button variant="contained" style={{backgroundColor:"#2db32d"}} onClick={() => setSelectButton()}>
			Crea tarea
		  </Button>

		  
<Modal open={selectButton !== null} onClose={() => handleModalClose()}>
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
          {/* Aquí va el contenido del modal */}
          <form onSubmit={handleSubmit}>
            <FormContainer>
              <FieldContainer>
                <Autocomplete
                  options={availableCustomer.customers || []}
                  getOptionLabel={(option) => option?.name || option?.identification || ''}
                  renderInput={(params) => (
                    <StyledTextField
                      {...params}
                      label="Agregar Cliente"
                      onChange={(e) => setQuery(e.target.value.toLowerCase())}
                    />
                  )}
                  onChange={(event, value) => {
                    handleCustomerSelect(value);
                    setQuery(''); // Limpiar la búsqueda al seleccionar un técnico
                  }}
                />
                {query.length > 0 &&
                  Array.isArray(availableCustomer.customers) &&
                  availableCustomer.customers.length > 0 && (
                    <Table>
                      {availableCustomer.customers.map((result, index) => (
                        <ButtonBase key={result?.id} onClick={() => handleCustomerSelect(result)}>
                          <TableCell style={{ color: 'blue' }}>{result.name}</TableCell>
                        </ButtonBase>
                      ))}
                    </Table>
                  )}
                <div>
                  {' '}
                  <ErrorMessage message={availableCustomer.customers?.message} show={searchError} />
                </div>
                {selectedCustomer && (
                  <Typography>
                    Nombre: {selectedCustomer?.name} (Nro Cliente: {selectedCustomer?.id})
                  </Typography>
                )}
                {/* No existe Producto en inventario Stored */}
                {/* <div style={{color:"white"}}>
<ErrorMessage message={availableCustomers.customers.message} show={searchError} /></div>
                */}
                <TextField
                  required
                  label="Cliente"
                  name="customer"
                  id="customer"
                  value={selectedCustomer ? selectedCustomer.name : ''}
                  onChange={handleChange}
                />
                {errors.customer && <span className="error-message"> {errors.customer}</span>}
                <TextField
                  required
                  label="Descripción"
                  name="description"
                  id="description"
                  value={formInfo.description}
                  onChange={handleChange}
                />{' '}
                {errors.description && <span className="error-message"> {errors.description}</span>}
                <TextField
                  required
                  label="Direccion"
                  name="address"
                  id="address"
                  value={formInfo.address}
                  onChange={handleChange}
                />{' '}
                {errors.address && <span className="error-message"> {errors.address}</span>}
                <TextField
                  required
                  label="Nota"
                  name="note"
                  id="note"
                  value={formInfo.note}
                  onChange={handleChange}
                />{' '}
                <Button variant="contained" onClick={toggleAddingTechnician}>
                  {isAddingTechnician ? 'No agregar técnico' : 'Agregar técnico'}
                </Button>
                {isAddingTechnician && (
                  <Autocomplete
                    options={availableTec?.usuarios || []}
                    getOptionLabel={(option) => option?.name}
                    renderInput={(params) => (
                      <StyledTextField
                        {...params}
                        label="Agregar Técnico"
                        onChange={(e) => setQueryt(e.target.value.toLowerCase())}
                      />
                    )}
                    onChange={(event, value) => {
                      handleTecSelect(value);
                      setQueryt(''); // Limpiar la búsqueda al seleccionar un técnico
                    }}
                  />
                )}
                {queryt.length > 0 && Array.isArray(availableTec.usuarios) && availableTec.usuarios.length > 0 && (
                  <Table>
                    {availableTec.usuarios.map((result, index) => (
                      <ButtonBase key={result?.id} onClick={() => handleTecSelect(result)}>
                        <TableCell style={{ color: 'blue' }}>{result?.name}</TableCell>
                      </ButtonBase>
                    ))}
                  </Table>
                )}
                <div>
                  {' '}
                  <ErrorMessage message={availableTec.usuarios?.message} show={searchError} />
                </div>
                {selectedTec && <input type="hidden" name="tecnico_id" value={selectedTec?.id} />}
                {selectedTec && (
					
                  <Typography>
                    Tecnico: {selectedTec.name} (Nro Tecnico: {selectedTec.id})
                  </Typography>
				
             
			  
			   )}
                {isAddingTechnician && (
                  <TextField
                    required
                    label="Técnico"
                    name="technician"
                    id="technician"
                    value={selectedTec ? selectedTec.name : ''}
                    onChange={handleChange}
                  />
                )}
                {isAddingTechnician && (
                  <TextField
                    required
                    label="Asignado"
                    name="asignar_tecnico"
                    id="asignar_tecnico"
                    value={selectedTec ? (selectedTec.asignar_tecnico = true) : ''}
                    type="hiden"
                    onChange={handleChange}
                  />
                )}
                {message && (
                  <Alert severity="error" sx={{ mt: 2 }}>
                    {' '}
                    {messageError}{' '}
                  </Alert>
                )}{' '}
              </FieldContainer>
              <ActionsContainer>
                <Button
                  type="submit"
                  onClick={handleSubmit}
                  variant="contained"
                  color="primary"
                  disabled={!isFormValid} // Deshabilitar el botón si isFormValid es false
                >
                  {loading ? 'Cargando...' : 'Crear tarea'}
                </Button>
              </ActionsContainer>
            </FormContainer>
          </form>
          <hr />
          <Button variant="contained" onClick={() => setSelectButton(null)}>
            Cerrar
          </Button>
        </Box>
      </Modal>
		
		</>
	
	);
};



export default CreteTask;