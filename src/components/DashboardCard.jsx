import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faInbox, faMoneyBill, faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
function DashboardCard() {
  const data = [
    {
      title: 'Collected',
      value: '$2,799.00',
      icon : <FontAwesomeIcon icon={faMoneyBill} />
    },
    {
      title: 'Pending',
      value: '$1,200.00',
      icon : <FontAwesomeIcon icon={faClock} />
    },
    {
      title: 'Total Invoice',
      value: '1',
      icon : <FontAwesomeIcon icon={faInbox} />
    },
    {
      title: 'Total Customers',
      value: '5',
      icon : <FontAwesomeIcon icon={faPeopleGroup} />
    }

  ]
  return (
    <>
      {
        data.map((item,index) => (
          <div key={index} className="rounded-xl bg-gray-50 p-2 shadow-sm ">
            <div className="flex font-[inter] text-gray-600 py-2 px-4">
              <div className="">
                {item.icon}
              </div>
              <h3 className="ml-2 text-sm font-medium">
                {item.title}
              </h3>
            </div>
            <p className="rounded-xl bg-white px-4 py-8 text-center text-2xl font-[lustina]">
              {item.value}
            </p>
          </div>
        ))
      }
    </>
  )
}

export default DashboardCard;