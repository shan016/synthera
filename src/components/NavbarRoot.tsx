"use client";

import { AUTH_LINKS, config, NAVBAR_LINKS } from "@/constants";
import { Home, Menu } from "lucide-react";
import Link from "next/link";

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "./ui/button";
import { ModeToggle } from "./ModeToggle";


export default function NavbarRoot() {
    return (
        <header className="p-3 sticky top-0 backdrop-blur-md">
            <nav className="hidden justify-between items-center sm:flex">
                <div className="flex justify-center items-center gap-1">
                    <config.icon className="text-primary w-6 h-6" />
                    <Link href="/" className="text-xl font-bold">{config.title}</Link>
                </div>
                <div className="flex gap-2">
                    <div className="space-x-2">
                        {NAVBAR_LINKS.map((x, index) => (
                            <Link href={x.href || '#'} key={index}>
                                <Button variant="ghost">{x.label}</Button>
                            </Link>
                        ))}
                    </div>
                    {AUTH_LINKS.map((x, idx) => (
                        <Link href={x.href || '#'} key={idx}>
                            <Button variant={x.label === 'Sign In' ? 'outline' : 'default'}>{x.label}</Button>
                        </Link>
                    ))}
                    <ModeToggle />
                </div>
            </nav>

            <div className="flex sm:hidden justify-between">
                <div className="flex justify-center items-center gap-1">
                    <config.icon className="text-primary w-6 h-6" />
                    <Link href="/" className="text-xl font-bold">{config.title}</Link>
                </div>

                <div className="flex gap-2">
                    <ModeToggle />
                    <Drawer>
                        <DrawerTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Menu className="w-5 h-5" />
                            </Button>
                        </DrawerTrigger>
                        <DrawerContent>
                            <DrawerHeader>
                                <DrawerTitle>Menu</DrawerTitle>
                            </DrawerHeader>
                            <div className="px-4 pb-4 flex flex-col gap-3">
                                {NAVBAR_LINKS.map((item, index) => (
                                    <DrawerClose key={index} asChild>
                                        <Link href={item.href?.trim() || '#'}>
                                            <Button variant="ghost" className="w-full justify-start">
                                                {item.icon && (
                                                    <item.icon />
                                                )}
                                                <span>{item.label}</span>
                                            </Button>
                                        </Link>
                                    </DrawerClose>
                                ))}
                            </div>
                            {AUTH_LINKS && (
                                <DrawerFooter>
                                    {AUTH_LINKS.map((x, index) => (
                                        <DrawerClose key={index} asChild>
                                            <Link href={x.href?.trim() || '#'}>
                                                <Button variant={x.label === 'Sign In' ? 'outline' : 'default'} className="w-full">
                                                    {x.label}
                                                </Button>
                                            </Link>
                                        </DrawerClose>
                                    ))}
                                </DrawerFooter>
                            )}
                        </DrawerContent>
                    </Drawer>
                </div>
            </div>
        </header>
    )
}