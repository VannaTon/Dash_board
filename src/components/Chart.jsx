import React, { useEffect, useRef, useState } from "react";
import { initFlowbite } from "flowbite";
import ApexCharts from "apexcharts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Chart = () => {
  const chartRef = useRef(null); // Use a ref to reference the chart div
  const [invoiceItems, setInvoiceItems] = useState([]); // State to store invoice items

  const options = {
    series: [
      {
        name: "Organic",
        data: [231, 122, 63, 421, 122, 323, 111],
      },
      {
        name: "Social media",
        data: [232, 113, 341, 224, 522, 411, 243],
      },
    ],
    chart: {
      type: "bar",
      height: 320,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "70%",
        borderRadius: 8,
      },
    },
    xaxis: {
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    fill: {
      opacity: 1,
    },
  };

  useEffect(() => {
    initFlowbite(); // Initialize Flowbite UI components

    if (chartRef.current) {
      const chart = new ApexCharts(chartRef.current, options);
      chart.render();

      return () => chart.destroy(); // Cleanup on unmount
    }
  }, []);

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const response = await fetch("https://reqres.in/api/users?page=1");
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        const data = await response.json();
        setInvoiceItems(data.data); // Set the fetched data to state
      } catch (error) {
        console.log(error);
      } finally {
        console.log("API request completed");
      }
    };

    fetchAPI();
  }, []);

  const getRandomNumber = () => {
    return Math.floor(Math.random() * 1000);
  };

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8 ">
      <div className="w-full md:col-span-4 ">
        <h2 className="mb-4 text-xl md:text-2xl font-[lustina]">
          Recent Revenue
        </h2>
        <div className=" w-full bg-white rounded-lg shadow-sm p-4 md:p-6">
          <h5 className="text-2xl font-bold text-gray-900 pb-4"></h5>
          {/* Chart Container */}
          <div ref={chartRef} id="column-chart"></div>
          <div className=" w-full bg-white rounded-lg shadow-sm  p-4 md:p-6">
            <div className="grid grid-cols-2">
              <dl className="flex items-center">
                <dt className="text-gray-500 text-sm font-normal me-1 ">
                  Money spent:
                </dt>
                <dd className="text-gray-900 text-sm font-semibold">$3,232</dd>
              </dl>
              <dl className="flex items-center justify-end">
                <dt className="text-gray-500 text-sm font-normal me-1">
                  Conversion rate:
                </dt>
                <dd className="text-gray-900 text-sm font-semibold">1.2%</dd>
              </dl>
            </div>
            <div className="grid grid-cols-1 items-center border-gray-200 border-t justify-between">
              <div className="flex justify-between items-center pt-5">
                {/* Button */}
                <button
                  id="dropdownDefaultButton"
                  data-dropdown-toggle="lastDaysdropdown"
                  data-dropdown-placement="bottom"
                  className="text-sm font-medium text-gray-500 hover:text-gray-900 text-center inline-flex items-center"
                  type="button"
                >
                  Last 7 days
                  <svg
                    className="w-2.5 m-2.5 ms-1.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                {/* Dropdown menu */}
                <div
                  id="lastDaysdropdown"
                  className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44"
                >
                  <ul
                    className="py-2 text-sm text-gray-700"
                    aria-labelledby="dropdownDefaultButton"
                  >
                    <li>
                      <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                        Yesterday
                      </a>
                    </li>
                    <li>
                      <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                        Today
                      </a>
                    </li>
                    <li>
                      <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                        Last 7 days
                      </a>
                    </li>
                    <li>
                      <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                        Last 30 days
                      </a>
                    </li>
                    <li>
                      <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                        Last 90 days
                      </a>
                    </li>
                  </ul>
                </div>
                <a
                  href="#"
                  className="uppercase text-sm font-semibold inline-flex items-center rounded-lg text-blue-600 hover:text-blue-700 hover:bg-gray-100 focus:ring-gray-700 border-gray-700 px-3 py-2"
                >
                  Leads Report
                  <svg
                    className="w-2.5 h-2.5 ms-1.5 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className=" w-full md:col-span-4">
      <h2 className="mb-4 text-xl md:text-2xl font-[lustina]">
          Latest Invoices
        </h2> 
        <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
          <div className="bg-white px-6">
            {invoiceItems.map((item, index) => (
              <div key={index} className={`flex flex-row items-center justify-between py-4 border-b border-gray-200 ${index === invoiceItems.length - 1 ? 'border-none' : ''}`}>
                <div className="flex items-center">
                  <img src={item.avatar} alt="" loading="lazy" width={32} height={32} className="mr-4 rounded-full" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold md:text-base">
                      {item.first_name} {item.last_name}
                    </p>
                    <p className="text-xs text-gray-500 md:text-sm">
                      {item.email}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="truncate text-sm font-semibold md:text-base">
                    ${item.id}{getRandomNumber()}.00
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex ms-2 items-center pb-2 pt-6">
            <FontAwesomeIcon icon={faSpinner} className="text-gray-500"/>
              <h3 className="ml-2 text-sm text-gray-500">Updated just now</h3>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Chart;