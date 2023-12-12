/* eslint-disable no-unused-expressions */

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';

import { getAllTaskPendding } from '../../../redux/modules/task';

import { TaskTable } from '../TaskTable';

const Task = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTaskPendding());
  }, [dispatch]);

  function capitalizeFirstLetter(text) {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  return (
    <>
      <TaskTable />
    </>
  );
};

export default Task;
