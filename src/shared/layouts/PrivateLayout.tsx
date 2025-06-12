import { Outlet } from "react-router-dom";
import { SideBar } from "../../components/side-bar/SideBar";
import Header from "../../components/Header";
import { useDrawerContext } from "../../shared/contexts/DrawerContext";

const PrivateLayout = () => {
  const { toggleDrawerOpen } = useDrawerContext();

  return (
    <>
      <Header onMenuClick={toggleDrawerOpen} />
      <SideBar>
        <Outlet />
      </SideBar>
    </>
  );
};

export default PrivateLayout;
