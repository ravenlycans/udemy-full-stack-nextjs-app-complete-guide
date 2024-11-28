'use client';

import { signOutUser } from "@/app/actions/authActions";
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from "@nextui-org/react";
import Link from "next/link";
import { useState, useEffect } from "react";

type Props = {
    userInfo: {name: string | null; image: string | null;} | null | undefined;
}

export default function UserMenu({userInfo}: Props) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  /*
   * Dark-Mode client detection code, this runs only on the client,
   * due to it being in an useEffect hook.
   * Also supports SSR.
   */
  useEffect(() => {
    const mediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(mediaQueryList.matches);

    mediaQueryList.addEventListener("change", (mql) => {
      setIsDarkMode(mql.matches);
    });
  }, []);

  return (
    <Dropdown placement='bottom-end' className={isDarkMode ? "bg-black" : ""}>
        <DropdownTrigger>
            <Avatar
                isBordered
                as='button'
                className="transition-transform"
                color='secondary'
                name={userInfo?.name || 'user avatar'}
                size='sm'
                src={userInfo?.image || '/images/user.png'}
            />
        </DropdownTrigger>
        <DropdownMenu variant='flat' aria-label='User actions menu'>
            <DropdownSection showDivider>
                <DropdownItem isReadOnly as='span' className='h-14 flex flex-row' aria-label='username'>
                    Signed in as {userInfo?.name}
                </DropdownItem>
            </DropdownSection>
            <DropdownItem as={Link} href='/members/edit'>
                Edit profile
            </DropdownItem>
            <DropdownItem color='danger'onClick={async () => signOutUser()}>
                Log out
            </DropdownItem>
        </DropdownMenu>
    </Dropdown>
  )
}