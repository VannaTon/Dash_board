import React, { useContext, useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faDollar,
  faClock,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { InvoiceContext } from "../context/InvoiceContext";

function EditInvoice() {
  const { invoices, setInvoices } = useContext(InvoiceContext);
  const location = useLocation();
  const navigate = useNavigate();
  const { invoice, index } = location.state;
  const [formData, setFormData] = useState(invoice);

  useEffect(() => {
    setFormData(invoice);
  }, [invoice]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedInvoices = invoices.map((inv, i) =>
      i === index ? formData : inv
    );
    setInvoices(updatedInvoices);
    navigate("/invoice");
  };

  return (
    <div className="grow p-6 md:overflow-y-auto md:p-12">
      <main>
        {/* Navigation */}
        <nav className="mb-6 block">
          <ol className="flex text-xl md:text-2xl font-[Lustina]">
            <li className="text-gray-500 flex">
              <NavLink to="/invoice">
                <div className="">Invoices</div>
              </NavLink>
              <span className="mx-3 inline-block">/</span>
            </li>
            <li className="text-gray-900">
              <NavLink to="/invoice/editinvoice">
                <div className="">Edit Invoice</div>
              </NavLink>
            </li>
          </ol>
        </nav>

        {/* Edit Invoice Form */}
        <form onSubmit={handleSubmit}>
          <div className="rounded-md bg-gray-50 p-4 md:p-6">
                  <div className="mb-4">
                    <label
                    htmlFor="customer"
                    name="customerId"
                    className="mb-2 block text-sm font-medium"
                    >
                    Choose Customer
                    </label>
                    <div className="relative">
                    <select
                      id="customer"
                      name="customerId"
                      value={formData.customerId}
                      onChange={handleChange}
                      className="peer block w-full rounded-md border text-gray-600 border-gray-300 py-[9px] pl-10 text-sm placeholder:text-gray-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    >
                      <option value="" disabled selected>Select a customer</option>
                      <option value="John Doe">John Doe</option>
                      <option value="Jane Doe">Jane Doe</option>
                      <option value="Alice Smith">Alice Smith</option>
                      <option value="Bob Johnson">Bob Johnson</option>
                      <option value="Charlie Brown">Charlie Brown</option>
                      <option value="David Wilson">David Wilson</option>
                      <option value="Eva Green">Eva Green</option>
                      <option value="Frank White">Frank White</option>
                      <option value="Grace Black">Grace Black</option>
                      <option value="Hannah Blue">Hannah Blue</option>
                    </select>
                    <FontAwesomeIcon
                      icon={faUser}
                      className="absolute top-3 left-4 text-gray-500"
                    />
                    </div>
                  </div>

                  {/* Amount Input */}
            <div className="mb-4">
              <label
                htmlFor="amount"
                name="amount"
                className="mb-2 block text-sm font-medium"
              >
                Choose an amount
              </label>
              <div className="relative">
                <input
                  placeholder="Enter USD amount"
                  type="text"
                  id="amount"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  className="peer block w-full rounded-md border text-gray-600 border-gray-300 py-[9px] pl-10 text-sm placeholder:text-gray-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                />
                <FontAwesomeIcon
                  icon={faDollar}
                  className="absolute top-3 left-4 text-gray-500"
                />
              </div>
            </div>

            {/* Invoice Status Radio Buttons */}
            <fieldset>
              <legend className="mb-2 block text-sm font-medium">
                Set the invoice status
              </legend>
              <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
                <div className="flex gap-4">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="pending"
                      value="pending"
                      name="status"
                      checked={formData.status === "pending"}
                      onChange={handleChange}
                    />
                    <label
                      htmlFor="pending"
                      className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                    >
                      Pending
                      <FontAwesomeIcon
                        icon={faClock}
                        className="text-gray-500"
                      />
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="paid"
                      value="paid"
                      name="status"
                      checked={formData.status === "paid"}
                      onChange={handleChange}
                    />
                    <label
                      htmlFor="paid"
                      className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full text-white bg-green-500 px-3 py-1.5 text-xs font-medium"
                    >
                      Paid
                      <FontAwesomeIcon icon={faCheck} />
                    </label>
                  </div>
                </div>
              </div>
            </fieldset>
          </div>

          {/* Form Buttons */}
          <div className="mt-6 flex justify-end gap-4">
            <NavLink
              to="/invoice"
              className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
            >
              Cancel
            </NavLink>
            <button
              type="submit"
              className="flex h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
            >
              Edit Invoice
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default EditInvoice;
