import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  User,
  Badge,
  Button,
  AvatarIcon,
  DropdownSection,
} from "@heroui/react";
import { AuthContext } from "../../contexts/AuthContext";
import { Await } from "react-router-dom";
import { logout } from "../../api/entity";
import { removeCookie } from "../../services/cookie.service";

export default function Profil() {
  const { auth, setAuth } = useContext(AuthContext);

  const userData = auth?.user;

  useEffect(() => {
    //fetchData();
  }, []);

  const handlerLogout = async () => {
    console.log("logout");
    const result = await logout("logout");
    if (result?.isSuccess) {
      removeCookie("auth");
      setAuth(null);
    }
  };

  return (
    <div className="flex items-center gap-6">
      {/* <Dropdown>
        <Badge
          content={
            notificationsData.unread?.length < 10
              ? notificationsData.unread?.length
              : "10+"
          }
          shape="circle"
          color="danger"
        >
          <DropdownTrigger>
            <Button
              radius="full"
              isIconOnly
              aria-label="more than 99 notifications"
              variant="light"
            >
              <NotificationIcon size={35} />
            </Button>
          </DropdownTrigger>
        </Badge>
        <Notification
          notificationsData={notificationsData}
          setNotificationsData={setNotificationsData}
        />
      </Dropdown> */}

      {!!userData && (
        <Dropdown placement="bottom-start">
          <DropdownTrigger>
            <User
              as="button"
              avatarProps={{
                isBordered: true,
                name: `${userData?.name}`,
                //src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
              }}
              className="transition-transform"
              //description={`@${userData?.name.toLowerCase()}`}
              name={`${userData?.name}`}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="User Actions" variant="flat">
            <DropdownItem
              key="profile"
              className="h-14 gap-2"
              textValue="Signed in as @tonyreichert"
            >
              <p className="font-bold">Connecté en tant que</p>
              <p className=" lowercase">{userData?.email}</p>
            </DropdownItem>
            <DropdownItem color="danger" onPress={handlerLogout}>
              Se déconnecter
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      )}
    </div>
  );
}
