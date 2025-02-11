import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faPlus,
  faCheck,
  faPen,
  faTrash,
  faChevronLeft,
  faChevronRight,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { InvoiceContext } from "../context/InvoiceContext";

function Invoice() {
  const { invoices, setInvoices } = useContext(InvoiceContext);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  if (!invoices || !setInvoices) {
    console.error("Invoices context is not available or setInvoices is not a function");
    return <div>Error: Invoices context is not available</div>;
  }

  if (!Array.isArray(invoices)) {
    console.error("Invoices is not an array", invoices);
    return <div>Error: Invoices is not an array</div>;
  }

  const handleDelete = (index) => {
    const updatedInvoices = invoices.filter((_, i) => i !== index);
    setInvoices(updatedInvoices);
  };

  const handleEdit = (invoice, index) => {
    navigate("/invoice/editinvoice", { state: { invoice, index } });
  };

  const filteredInvoices = invoices.filter(invoice =>
    invoice.customerId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.amount.toString().includes(searchTerm) ||
    invoice.date.toLowerCase().includes(searchTerm) ||
    invoice.status.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="grow p-6 md:overflow-y-auto md:p-12">
      <div className="w-full">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-2xl font-[lustina]">Invoices</h1>
        </div>
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
          <div className="relative flex flex-1 flex-shrink-0">
            <input
              type="text"
              placeholder="Search for invoices..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="peer block w-full rounded-md border border-gray-300 py-[9px] pl-10 text-sm placeholder:text-gray-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
            />
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="absolute top-3 left-3 text-gray-500"
            />
          </div>
          <NavLink to="/invoice/createinvoice">
            <div className="bg-blue-500 text-white p-2 rounded-lg flex items-center gap-2">
              <span className="hidden md:block">Create Invoice</span>
              <FontAwesomeIcon icon={faPlus} />
            </div>
          </NavLink>
        </div>
        <div className="mt-6 flow-root">
          <div className="inline-block min-w-full align-middle">
            <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
              <div className="md:hidden">
                {filteredInvoices.map((invoice, index) => (
                  <div key={index} className="mb-2 w-full rounded bg-white p-4">
                    <div className="flex items-center justify-between border-b pb-4">
                      <div className="mb-2 flex items-center gap-2">
                        <img src="https://assets.unileversolutions.com/v1/121910209.jpg" loading="lazy" width={28} height={28} className="rounded-full" alt="" />
                        <div>
                          <p>{invoice.customerId.replace(/\s+/g, '')}</p>
                          <p className="text-sm text-gray-500">{invoice.customerId.replace(/\s+/g, '')}@gmail.com</p>
                        </div>
                      </div>
                      <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${invoice.status === 'paid' ? 'bg-green-500 text-white' : 'bg-yellow-500 text-white'}`}>
                        {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                        <FontAwesomeIcon icon={invoice.status === 'paid' ? faCheck : faClock} className="ml-1 w-4 text-white" />
                      </span>
                    </div>
                    <div className="flex w-full items-center justify-between pt-4">
                      <div>
                        <p className="text-xl font-medium">${invoice.amount}</p>
                        <p>{invoice.date}</p>
                      </div>
                      <div className="flex justify-end gap-2">
                        <button className="rounded-md border border-gray-300 p-2 hover:bg-gray-100" onClick={() => handleEdit(invoice, index)}>
                          <FontAwesomeIcon icon={faPen} />
                        </button>
                        <button className="rounded-md border border-gray-300 p-2 hover:bg-gray-100" onClick={() => handleDelete(index)}>
                          <span className="sr-only">Delete</span>
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="overflow-x-auto">
                <table className="hidden min-w-full text-gray-900 md:table font-[inter]">
                  <thead className="rounded-lg text-left text-sm font-normal">
                    <tr>
                      <th className="px-4 py-5 font-medium sm:pl-6">Customer</th>
                      <th className="px-4 py-5 font-medium sm:pl-6">Email</th>
                      <th className="px-4 py-5 font-medium sm:pl-6">Amount</th>
                      <th className="px-4 py-5 font-medium sm:pl-6">Date</th>
                      <th className="px-4 py-5 font-medium sm:pl-6">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {filteredInvoices.map((invoice, index) => (
                      <tr key={index} className="w-full border-b border-gray-300 py-3 text-sm last-of-type:border-none">
                        <td className="whitespace-nowrap py-3 pl-6 pr-3">
                          <div className="flex items-center gap-3">
                            <img
                              src="https://assets.unileversolutions.com/v1/121910209.jpg"
                              alt=""
                              loading="lazy"
                              className="rounded-full"
                              width={28}
                              height={28}
                            />
                            <p>{invoice.customerId.replace(/\s+/g, '')}</p>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-3 lowercase">{invoice.customerId.replace(/\s+/g, '')}@gmail.com</td>
                        <td className="whitespace-nowrap px-3 py-3">${invoice.amount}</td>
                        <td className="whitespace-nowrap px-3 py-3">{invoice.date}</td>
                        <td className="whitespace-nowrap px-3 py-3">
                          <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${invoice.status === 'paid' ? 'bg-green-500 text-white' : 'bg-yellow-500 text-white'}`}>
                            {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                            <FontAwesomeIcon
                              icon={invoice.status === 'paid' ? faCheck : faClock}
                              className="ml-1 w-4 text-white"
                            />
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-3 py-3">
                          <div className="flex justify-end items-center gap-3">
                            <button
                              className="rounded-md border border-gray-300 p-2 hover:bg-gray-100"
                              onClick={() => handleEdit(invoice, index)}
                            >
                              <FontAwesomeIcon icon={faPen} />
                            </button>
                            <button
                              className="rounded-md border border-gray-300 p-2 hover:bg-gray-100"
                              onClick={() => handleDelete(index)}
                            >
                              <span className="sr-only">Delete</span>
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5 flex w-full justify-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-md border pointer-events-none text-gray-300 mr-2 md:mr-4">
            <span className="sr-only">Previous</span>
            <FontAwesomeIcon icon={faChevronLeft} />
          </div>
          <div className="flex -space-x-px">
            <div className="flex h-10 w-10 items-center justify-center text-sm border rounded-l-md rounded-r-md z-10 bg-blue-600 border-blue-600 text-white">
              1
            </div>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-md border pointer-events-none text-gray-300 ms-2 md:ms-4">
            <span className="sr-only">Previous</span>
            <FontAwesomeIcon icon={faChevronRight} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Invoice;