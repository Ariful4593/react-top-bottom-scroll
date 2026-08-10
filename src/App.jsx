// import "./App.css";z
import ScrollUpDown from "./components/ScrollUpDown";
// import ReactAuthSystem from "react-auth-system";
// import GuestRoute from "./components/AuthenticationSystem/GuestRoute";
// import Login from "./components/Login/Login";
// import ProtectedRoute from "./components/AuthenticationSystem/ProtectedRoute";
// import MasterLayout from "./components/MasterLayout/MasterLayout";
// import Unauthorized from "./components/AuthenticationSystem/Unauthorized";
// import NotFound from "./components/AuthenticationSystem/NotFound";
function App() {
  // const urls = {
  //   DASHBOARD: {
  //     url: "/",
  //     permission: "web dashboard",
  //     component: <div>Dashboard</div>,
  //   },
  //   UN_AUTHORIZED: {
  //     url: "/unauthorized",
  //     permission: null,
  //     component: <div>Unauthorized</div>,
  //   },
  // };
  return (
    <>
      {Array(100)
        .fill(0)
        .map((_, i) => (
          <div key={i}>{i}</div>
        ))}
      {/* <hr /> */}
      <ScrollUpDown
        renderIcon={(scrollDirection) => (
          <div>
            {
              {
                down: "👇",
                up: "👆",
              }[scrollDirection]
            }
          </div>
        )}
      />
      {/* <ReactAuthSystem
        urls={urls}
        permissionList={[
          "web dashboard",
          "ui notification",
          "organization list",
        ]}
        guestRouteComponent={
          <GuestRoute
            user={{
              name: "John Doe",
              email: "john@gmail.com",
            }}
          />
        }
        loginComponent={<Login />}
        protectedRouteComponent={
          <ProtectedRoute
            user={{
              name: "John Doe",
              email: "john@gmail.com",
            }}
          />
        }
        masterLayoutComponent={<MasterLayout />}
        unAuthorizedComponent={<Unauthorized />}
        notFoundComponent={<NotFound />}
      /> */}
    </>
  );
}

export default App;
