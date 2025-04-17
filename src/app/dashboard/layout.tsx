import { getCurrentUser, isAuthenticated } from "@/lib/actions/auth.action";
import { ReactNode } from "react";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Fingerprint, Menu } from "lucide-react";
import Link from "next/link";
import { config, dashboardMenus, myAccount } from "@/constants";
import { ModeToggle } from "@/components/ModeToggle";
import { redirect } from "next/navigation";

const DashboardLayout = async ({ children }: { children: ReactNode }) => {
    const isUserAuthenticated = await isAuthenticated();

    // Enable nanti
    if (!isUserAuthenticated) redirect('/sign-in');

    const userRecord = await getCurrentUser();
    const userLabel = userRecord?.name.split(' ').slice(0, 2).map(x => x.charAt(0).toUpperCase()).join('');
    return (
        <div className="flex flex-col justify-center items-center">
            <div className="flex justify-between items-center p-4 top-0 w-full">
                <div className="hidden md:flex gap-3">
                    <config.icon />
                    <span>{config.title}</span>
                </div>
                <div className="flex md:hidden">
                    <Drawer>
                        <DrawerTrigger>
                            <Menu />
                        </DrawerTrigger>
                        <DrawerContent>
                            <DrawerHeader className="flex text-lg py-10">
                                <div className="flex flex-col items-center justify-center">
                                    <DrawerTitle className="flex flex-row font-semibold gap-1">
                                        <config.icon />
                                        <span>{config.title}</span>
                                    </DrawerTitle>
                                    <DrawerDescription>{config.slogan}</DrawerDescription>
                                </div>
                                {dashboardMenus.map((x, index) => (
                                    <Link href={x.path} className="flex flex-row gap-3 hover:bg-accent rounded items-center py-1" key={index}>
                                        <x.icon />{x.title}
                                    </Link>
                                ))}
                            </DrawerHeader>
                        </DrawerContent>
                    </Drawer>
                </div>
                <div className="flex items-center gap-3">
                    <ModeToggle />
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Avatar>
                                <AvatarImage src={userRecord?.profilePhoto?.url || '#'} alt={userRecord?.email} />
                                <AvatarFallback>{ userLabel }</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="m-3">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {myAccount.map((x, index) => (
                                <Link href={x.path} key={index}>
                                    <DropdownMenuItem className="flex items-center">
                                        <x.icon />
                                        <span>{x.item}</span>
                                    </DropdownMenuItem>
                                </Link>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            {children}
        </div>
    );
}

export default DashboardLayout;