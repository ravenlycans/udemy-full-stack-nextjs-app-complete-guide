'use client';

import { signOutUser } from "@/app/actions/authActions";
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from "@nextui-org/react";
import { Session } from "next-auth";
import Link from "next/link";

type Props = {
    user: Session['user']
}

export default function UserMenu({user}: Props) {
  let isDarkMode :boolean = false;

  if (typeof window !== undefined) 
    isDarkMode = window.matchMedia('prefers-color-scheme: dark').matches;

  return (
    <Dropdown placement='bottom-end' className={isDarkMode ? "dark" : ""}>
        <DropdownTrigger>
            <Avatar
                isBordered
                as='button'
                className={isDarkMode ? "transition-transform dark" : "transition-transform"}
                color='secondary'
                name={user?.name || 'user avatar'}
                size='sm'
                src={user?.image || '/images/user.png'}
            />
        </DropdownTrigger>
        <DropdownMenu variant='flat' aria-label='User actions menu'>
            <DropdownSection showDivider>
                <DropdownItem isReadOnly as='span' className='h-14 flex flex-row' aria-label='username'>
                    Signed in as {user?.name}
                </DropdownItem>
            </DropdownSection>
            <DropdownItem as={Link} href='/members/edit'>
                Edit profile
            </DropdownItem>
            <DropdownItem color='danger' onClick={async () => signOutUser()}>
                Log out
            </DropdownItem>
        </DropdownMenu>
    </Dropdown>
  )
}