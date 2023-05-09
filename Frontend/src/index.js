import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { FeedbacksContextProvider } from './context/FeedbackContext'
import { AuthContextProvider } from './context/AuthContext'
import { AppointmentsContextProvider } from './context/appointmentContext';
import { NoticesContextProvider } from './context/NoticeContext';
import { AFeedbacksContextProvider } from './context/AFeedbackContext';
import { AAppointmentsContextProvider } from './context/AAppointmentContext'
import { TimetablesContextProvider } from './context/TimetableContext';
import { TicketsContextProvider } from './context/TicketContext';
import { ModuleContextProvider } from './context/ModuleContext';
import './index.css'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
    <ModuleContextProvider>
    <TicketsContextProvider>
     <AAppointmentsContextProvider>
    <AFeedbacksContextProvider>
    <TimetablesContextProvider>
    <NoticesContextProvider>
    <AuthContextProvider>
    <AppointmentsContextProvider>
      <FeedbacksContextProvider>
        <App /> 
      </FeedbacksContextProvider>
      </AppointmentsContextProvider>
    </AuthContextProvider>
    </NoticesContextProvider>
    </TimetablesContextProvider>
    </AFeedbacksContextProvider>
    </AAppointmentsContextProvider>
    </TicketsContextProvider>
    </ModuleContextProvider>
  </React.StrictMode>
);

