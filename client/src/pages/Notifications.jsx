import { useEffect, useState } from "react";
import axios from "axios";

export default function Notifications() {
  const [notifications, setNotifications] =
    useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications =
    async () => {
      try {
        const userInfo =
          JSON.parse(
            localStorage.getItem(
              "userInfo"
            )
          );

        const res =
          await axios.get(
            "http://localhost:5000/api/notifications",
            {
              headers: {
                Authorization: `Bearer ${userInfo.token}`,
              },
            }
          );

        setNotifications(
          res.data
        );
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        🔔 Notifications
      </h1>

      {notifications.length === 0 ? (
        <p>No notifications yet.</p>
      ) : (
        notifications.map((n) => (
          <div
            key={n._id}
            className="bg-white shadow rounded p-4 mb-3"
          >
            {n.type === "like" ? (
              <p>
                ❤️{" "}
                <strong>
                  {
                    n.sender
                      ?.username
                  }
                </strong>{" "}
                liked your review "
                {n.post?.title}"
              </p>
            ) : (
              <p>
                💬{" "}
                <strong>
                  {
                    n.sender
                      ?.username
                  }
                </strong>{" "}
                commented on "
                {n.post?.title}"
              </p>
            )}
          </div>
        ))
      )}
    </div>
  );
}