'use client'
import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {useRouter} from "next/navigation"
import {Button} from "@/components/ui/button";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {LogOut} from "lucide-react";
import NavItems from "@/components/navItems";


const UseDropdown = () => {

    const router = useRouter()
    const hanldeSignin = () => {
        router.push('/signin')
    }
    const user = {
        name: "John Doe",
        email: "john@example.com",
        image: "https://github.com/shadcn.png",
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='ghost' className="flex items-center gap-3 text-shadow-gray-400 hover:text-yellow-400">
                    <Avatar className="h-8 w-8 ">
                        <AvatarImage src="https://github.com/shadcn.png"/>
                        <AvatarFallback className="bg-yellow-500 text-yellow-900 text-sm font-bold">
                            {user.name[0]}
                        </AvatarFallback>
                    </Avatar>
                    <div className='hidden md:flex flex-col items-center'>
                        <span className='text-base font-medium text gray-400'>
                            {user.name}
                        </span>
                    </div>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='text-gray-400'>
                <DropdownMenuLabel>
                    <div className='flex relative item-center py-3 gap-3 '>
                        <Avatar className="h-10 w-10 ">
                            <AvatarImage src="https://github.com/shadcn.png"/>
                            <AvatarFallback className="bg-yellow-500 text-yellow-900 text-sm font-bold">
                                {user.name[0]}
                            </AvatarFallback>
                        </Avatar>
                        <div className='flex flex-col'>
                        <span className='text-base font-medium text gray-400'>
                            {user.name}
                        </span>
                        </div>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className='bg-gray-600'/>
                <DropdownMenuItem className='text-sm text-gray-400 text-md font-medium focus:bg-transparent focus:text-yellow-500 transition-colors cursor-pointer'
                                  onClick={hanldeSignin}>
                    <LogOut className='h-4 w-4 mr-2 hidden sm:block'/>
                    Logout
                </DropdownMenuItem>
                <DropdownMenuSeparator/>
                <nav className='sm:hidden'>
                    <NavItems/>
                </nav>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
export default UseDropdown
