/* eslint-disable no-unused-expressions */

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import Autocomplete from '@mui/material/Autocomplete';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Swal from 'sweetalert2';
import { Typography, TableCell, Alert, Button, ButtonBase, TextField, Table, TableRow } from '@mui/material';
import { getAllTask, createTask } from '../../../redux/modules/task';

import { TaskTable } from '../TaskTable';
import { AllTaskTable } from '../AllTaskTable';
import { fetchCustomers } from '../../../redux/modules/customer';
import { fetchUsers } from '../../../redux/modules/user';
import { ErrorMessage } from '../../../components/ErrorMessage';

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

const AllTask = () => {
  // const [errors, setErrors] = useState({});
  // const { message } = useSelector((state) => state);
  // const [loading, setLoading] = useState(false);
  // const [selectButton, setSelectButton] = useState(null);
  // const [messageError, setMessageError] = useState({});
  // const [query, setQuery] = useState('');
  // const [queryt, setQueryt] = useState('');
  // const [customer, setCustomer] = useState({});
  // const [searchError, setSearchError] = useState(false);

  // const dispatch = useDispatch();

  // const [formInfo, setFormInfo] = useState({
  //   customer: '',
  //   description: '',
  //   note: '',
  //   address: '',
  //   technician: '',
  // });
  // const [isFormValid, setIsFormValid] = useState(false);

  // const validateForm = () => {
  //   const { description, address } = formInfo;
  //   setIsFormValid(description.trim() !== '' && address.trim() !== '') &&
  //     (isAddingTechnician ? formInfo.technician.trim() !== '' : true) &&
  //     (selectedCustomer ? selectedCustomer.name.trim() !== '' : true);
  // };

  // useEffect(() => {
  //   validateForm();
  // }, [formInfo]);

  // useEffect(() => {
  //   dispatch(getAllTask());
  // }, [dispatch]);

  // useEffect(() => {
  //   if (query) {
  //     dispatch(fetchCustomers(query));
  //   }
  // }, [query, dispatch]);

  // useEffect(() => {
  //   if (queryt) {
  //     dispatch(fetchUsers(queryt));
  //   }
  // }, [queryt, dispatch]);

  // function validate(formInfo) {
  //   const errors = {};

  //   formInfo.customer ? (errors.customer = '') : (errors.customer = 'Ingrese una Cliente');
  //   formInfo.description ? (errors.description = '') : (errors.description = 'Ingrese una Descripcion');
  //   formInfo.address ? (errors.address = '') : (errors.address = 'Ingrese una direccion ');

  //   return errors;
  // }

  // function capitalizeFirstLetter(text) {
  //   if (!text) return '';
  //   return text.charAt(0).toUpperCase() + text.slice(1);
  // }

  // const handleChange = (event) => {
  //   const { name, value } = event.target;
  //   setFormInfo((prevFormInfo) => ({
  //     ...prevFormInfo,
  //     [name]: value,
  //   }));
  //   setErrors(validate({ ...formInfo, [name]: value }));
  // };

  // console.log('forimfo', formInfo);

  // const [selectedCustomer, setSelectedCustomer] = useState(null);

  // const availableCustomer = useSelector((state) => state.customer);
  // console.log('aqui clientes', availableCustomer);

  // const handleCustomerSelect = (customer) => {
  //   setSelectedCustomer(customer); // Actualiza el estado del cliente seleccionado
  //   setFormInfo({
  //     ...formInfo,
  //     cliente_id: customer.id, // Actualiza el ID del cliente en el estado del formulario
  //     // Otras propiedades del cliente que quieras agregar al formulario
  //   });
  // };

//   const [selectedTec, setSelectedTec] = useState(null);

//   const availableTec = useSelector((state) => state.usuarios);
//   console.log('aqui users', availableTec);


//   const idt = selectedTec ? selectedTec.id : '';
 
// const trueT = selectedTec ? selectedTec.asignar_tecnico : '';
  
//   console.log('idt tru', idt, trueT);



//   const handleTecSelect = (usuarios) => {
//   if (usuarios && usuarios.id) {
//     setSelectedTec(usuarios); // Actualiza el estado del técnico seleccionado
//     setFormInfo({
//       ...formInfo,
//       // Puedes realizar otras actualizaciones en formInfo si es necesario
//     });
//   } else {
//     // Manejar el caso en que usuarios o usuarios.id es undefined
//     console.error("Usuario o ID de usuario indefinido");
//   }
// };
 
//   const updatedFormInfo = {
//     ...formInfo,
//     tecnico_id: idt,
//     asignar_tecnico: trueT
//   };

//   console.log('updateFor', updatedFormInfo);

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     setLoading(true);
//     dispatch(createTask(updatedFormInfo))
//       .then((response) => {
//         setLoading(false);
//         Swal.fire('tarea creada con éxito!', '', 'success');
//         dispatch(getAllTask());
//         setFormInfo({
//           customer: '',
//           description: '',

//           address: '',

//           technician: '',
//         });
//         setSelectButton(null);
//         if (response.error) {
//           setMessageError(response.error);
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//         setLoading(false);
//         setSelectButton(null);
//         setMessageError(error.message);
//         Swal.fire(error.message);
//       });
//   };

//   const navigate = useNavigate();

//   const handleLinkClick = (link) => {
//     navigate(link);
//     console.log(`Redireccionando a ${link}`);
//   };

//   const [isAddingTechnician, setIsAddingTechnician] = useState(false);

//   const toggleAddingTechnician = () => {
//     setIsAddingTechnician((prevValue) => !prevValue);
//   };

//   const handleClientSelect = (selectedClient) => {
//     setFormInfo((prevFormInfo) => ({
//       ...prevFormInfo,
//       client: selectedClient.id,
//     }));
//   };

//   const handleModalClose = () => {
//     setSelectButton(null);
//     setSelectedCustomer(null);
//     setSelectedTec(null);
//     toggleAddingTechnician();
   
//     // setQueryt('');
//     setQuery('');
//     // handleTecSelect();
//     // handleCustomerSelect();
//     // Restablecer otros estados según sea necesario
//   };

//   console.log(availableCustomer.customers);

  return (
    
    <>
      <hr />
      {/* <Box sx={{ m: 8 }}>
        <Button style={{ marginRight: 3 }} variant="contained" onClick={() => setSelectButton()}>
          Crear Tarea
        </Button>
      </Box> */}

      <AllTaskTable />

    
      </>
  );
};

export default AllTask;
