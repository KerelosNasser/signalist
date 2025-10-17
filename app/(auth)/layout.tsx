import React from 'react'
import Link from "next/link";
import Image from "next/image";
import {auth} from "@/lib/better-auth/auth";
import {headers} from "next/headers";
import {redirect} from "next/navigation";

const Layout = async ({children}: { children: React.ReactNode }) => {

    const session = await auth.api.getSession({headers: await headers()})

    if (session?.user) redirect('/')

    return (
        <main className='auth-layout'>
            <section className='auth-left-section scrollbar-hide-default'>
                <Link href='/' className='auth-logo'>
                    <Image src='/assets/icons/logo.svg' alt='logo' width={140} height={40}
                           className='cursor-pointer w-auto h-8'/>
                </Link>
                <div className='pb:6 lg:pb-8 flex-1'>
                    {children}
                </div>
            </section>
            <section className='auth-right-section'>
                <div className='z-10 relative lg: mt-4 lg:mb-12'>
                    <blockquote className='auth-blockquote'>
                        Signalist turned my watchlist into a winning list.
                        The alerts are spot-on, and I feel more confident making moves in the market
                    </blockquote>
                </div>
                <div className='flex items-center justify-between'>
                    <div>
                        <cite className='auth-testimonial-author'>
                            Kero Nasser
                        </cite>
                        <p className='max-md:text-xs text-gray-500'>
                            Retail investor
                        </p>
                        <div className='flex items-center gap-2'>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Image src='/assets/icons/star.svg' alt='star'
                                       width={20} height={20} key={star} className='w-5 h-5'/>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='flex-1 relative'>
                    <Image src='/assets/images/dashboard.png' alt='dashboard' width={1440} height={1150} className='auth-dashboard-preview absolute top-0'/>
                </div>
            </section>
        </main>
    )
}
export default Layout
