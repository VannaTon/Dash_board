import React, { createContext, useState, useEffect } from 'react';

export const CustomerContext = createContext();

export const CustomerProvider = ({ children }) => {
  const [customers, setCustomers] = useState(() => {
    const storedCustomers = localStorage.getItem('customers');
    return storedCustomers ? JSON.parse(storedCustomers) : [
      { img:"https://assets.unileversolutions.com/v1/121910209.jpg", name: "John Doe", email: "johndoe@gmail.com", totalInvoice: 0, totalPending: 0, totalPaid: 0 },
      { name: "Jane Doe", email: "janedoe@gmail.com", totalInvoice: 0, totalPending: 0, totalPaid: 0 },
      { name: "Alice Smith", email: "alicesmith@gmail.com", totalInvoice: 0, totalPending: 0, totalPaid: 0 },
      { name: "Bob Johnson", email: "bobjohnson@gmail.com", totalInvoice: 0, totalPending: 0, totalPaid: 0 },
      { name: "Charlie Brown", email: "charliebrown@gmail.com", totalInvoice: 0, totalPending: 0, totalPaid: 0 },
      { name: "David Wilson", email: "davidwilson@gmail.com", totalInvoice: 0, totalPending: 0, totalPaid: 0 },
      { name: "Eva Green", email: "evagreen@gmail.com", totalInvoice: 0, totalPending: 0, totalPaid: 0 },
      { name: "Frank White", email: "frankwhite@gmail.com", totalInvoice: 0, totalPending: 0, totalPaid: 0 },
      { name: "Grace Black", email: "graceblack@gmail.com", totalInvoice: 0, totalPending: 0, totalPaid: 0 },
      { name: "Hannah Blue", email: "hannahblue@gmail.com", totalInvoice: 0, totalPending: 0, totalPaid: 0 },
    ];
  });

  useEffect(() => {
    localStorage.setItem('customers', JSON.stringify(customers));
  }, [customers]);

  return (
    <CustomerContext.Provider value={{ customers, setCustomers }}>
      {children}
    </CustomerContext.Provider>
  );
};
