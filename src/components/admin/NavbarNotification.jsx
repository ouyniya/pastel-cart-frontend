import { Bell } from "lucide-react";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

const NavbarNotification = () => {
  const [isRing, setIsRing] = useState(true);

  const handleRing = () => {
    setIsRing(false);
  };

  return (
    <div className="dropdown dropdown-end" onClick={handleRing}>
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        <div className="w-10 rounded-full">
          <button className="btn btn-ghost btn-circle">
            <div className="indicator">
              <Bell size={20} className={isRing ? "animate-bell-ring" : ""} />
              <span className="badge badge-xs badge-info indicator-item"></span>
            </div>
          </button>
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow
              "
      >
        {notifications.length > 4 ? (
          <div>
            {notifications.slice(0, 4).map((noti) => (
              <li
                key={noti.id}
                className={twMerge(
                  "border border-base-100",
                  noti.id === notifications.length ? "" : "border-b-secondary",
                  noti.id !== 1 && noti.id !== notifications.length
                    ? "py-1"
                    : noti.id === 1
                    ? "pb-1"
                    : "pt-1"
                )}
              >
                <div className="flex gap-2 justify-start items-start p-1 rounded-lg">
                  <div>
                    <p>{noti.icon}</p>
                  </div>

                  <div className="flex flex-col items-start gap-1">
                    <h2 className="font-semibold">{noti.title}</h2>
                    <p>{noti.message}</p>
                  </div>
                </div>
              </li>
            ))}

            <div className="mt-2 mb-1 btn btn-xs btn-secondary text-neutral flex">
              View more
            </div>
          </div>
        ) : (
          notifications.map((noti) => (
            <li
              key={noti.id}
              className={twMerge(
                "border border-base-100",
                noti.id === notifications.length ? "" : "border-b-secondary",
                noti.id !== 1 && noti.id !== notifications.length
                  ? "py-1"
                  : noti.id === 1
                  ? "pb-1"
                  : "pt-1"
              )}
            >
              <div className="flex gap-2 justify-start items-start p-1 rounded-lg">
                <div>
                  <p>{noti.icon}</p>
                </div>

                <div className="flex flex-col items-start gap-1">
                  <h2 className="font-semibold">{noti.title}</h2>
                  <p>{noti.message}</p>
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};
export default NavbarNotification;

const notifications = [
  {
    id: 1,
    title: "New Order Received",
    message: "You have a new order #12345 from John Doe.",
    type: "order",
    status: "unread",
    timestamp: "2025-07-15T10:30:00Z",
    icon: "🛒",
  },
  {
    id: 2,
    title: "Item Shipped",
    message: "Order #12345 has been shipped via DHL.",
    type: "shipment",
    status: "unread",
    timestamp: "2025-07-15T12:45:00Z",
    icon: "📦",
  },
  {
    id: 3,
    title: "Stock Alert",
    message: "‘Floral Summer Dress’ is low in stock. Only 3 items left!",
    type: "stock",
    status: "unread",
    timestamp: "2025-07-15T08:20:00Z",
    icon: "⚠️",
  },
  {
    id: 4,
    title: "New Customer Message",
    message: "You have a new message from Anna regarding her order.",
    type: "message",
    status: "read",
    timestamp: "2025-07-14T17:05:00Z",
    icon: "💬",
  },
  {
    id: 5,
    title: "Promotion Active",
    message: "Your ‘Buy 1 Get 1 Free’ promotion is now live.",
    type: "promotion",
    status: "read",
    timestamp: "2025-07-13T09:00:00Z",
    icon: "🔥",
  },
];
