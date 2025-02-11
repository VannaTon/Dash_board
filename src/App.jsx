import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Invoice from "./pages/Invoice";
import Customer from "./pages/Customer";
import Sidebar from "./components/Sidebar";
import CreateInvoice from "./components/CreateInvoice";
import EditInvoice from "./components/EditInvoice";
import { InvoiceProvider } from './context/InvoiceContext';
import { CustomerProvider } from './context/CustomerContext';

function App() {
  return (
    <CustomerProvider>
      <InvoiceProvider>
        <Router>
          <div className="flex flex-col md:flex-row sm:flex-row min-h-screen">
            <Sidebar />
            <main className="flex-grow flex flex-col md:ml-63 sm:ml-63 overflow-x-auto">
              <div className="p-4">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/invoice" element={<Invoice />} />
                  <Route path="/invoice/createinvoice" element={<CreateInvoice />} />
                  <Route path="/invoice/editinvoice" element={<EditInvoice />} />
                  <Route path="/customer" element={<Customer />} />
                </Routes>
              </div>
            </main>
          </div>
        </Router>
      </InvoiceProvider>
    </CustomerProvider>
  );
}

export default App;