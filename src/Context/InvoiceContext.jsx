import React, { createContext, useState, useEffect } from 'react';

export const InvoiceContext = createContext();

export const InvoiceProvider = ({ children }) => {
  const [invoices, setInvoices] = useState(() => {
    const savedInvoices = localStorage.getItem('invoices');
    return savedInvoices ? JSON.parse(savedInvoices) : [];
  });

  useEffect(() => {
    localStorage.setItem('invoices', JSON.stringify(invoices));
  }, [invoices]);

  return (
    <InvoiceContext.Provider value={{ invoices, setInvoices }}>
      {children}
    </InvoiceContext.Provider>
  );
};
