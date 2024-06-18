"use client";

import { useRouter, usePathname } from "next/navigation";

const Toolbar = () => {
  const currentRoute = usePathname();
  const router = useRouter();

  const onLogout = () => {
    localStorage.removeItem("token");
    router.replace("/login");
  };

  return (
    <div style={{ height: "50px" }} className="bg-white p-3">
      <div className="flex justify-between">
        <p className="text-black">Expenses Manager</p>

        <div className="flex items-center">
          {currentRoute === "/expenses" && (
            <button
              onClick={onLogout}
              className="px-2 py-1 bg-blue-500 text-white rounded-sm"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
