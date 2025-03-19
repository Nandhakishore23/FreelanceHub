"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { useSession, signOut } from "next-auth/react"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { data: session, status } = useSession()

  const isAuthenticated = status === "authenticated"
  const userRole = session?.user?.role || null

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-8 lg:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold">FreelanceHub</span>
          </Link>

          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Find Work</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          href="/jobs"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium">Browse All Jobs</div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Explore the latest opportunities from clients worldwide
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <Link href="/jobs/saved" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>Saved Jobs</NavigationMenuLink>
                      </Link>
                    </li>
                    <li>
                      <Link href="/proposals" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>My Proposals</NavigationMenuLink>
                      </Link>
                    </li>
                    <li>
                      <Link href="/jobs/recommended" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                          Recommended for You
                        </NavigationMenuLink>
                      </Link>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Hire Talent</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          href="/freelancers"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium">Browse Freelancers</div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Find skilled professionals for your projects
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <Link href="/post-job" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>Post a Job</NavigationMenuLink>
                      </Link>
                    </li>
                    <li>
                      <Link href="/projects" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>My Projects</NavigationMenuLink>
                      </Link>
                    </li>
                    <li>
                      <Link href="/saved-freelancers" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                          Saved Freelancers
                        </NavigationMenuLink>
                      </Link>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/how-it-works" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>How It Works</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center gap-2">
          <ModeToggle />

          {isAuthenticated ? (
            <div className="hidden md:flex items-center gap-2">
              <Link href="/messages">
                <Button variant="ghost" size="sm">
                  Messages
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  Dashboard
                </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || "User"} />
                      <AvatarFallback>{session?.user?.name?.[0] || "U"}</AvatarFallback>
                    </Avatar>
                    <span>{session?.user?.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>Log out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Log In
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm">Sign Up</Button>
              </Link>
            </div>
          )}

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col gap-6 py-6">
                <Link href="/" className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
                  <span className="text-2xl font-bold">FreelanceHub</span>
                </Link>
                <nav className="flex flex-col gap-4">
                  <Link
                    href="/jobs"
                    className={cn(
                      "text-lg font-medium transition-colors hover:text-primary",
                      pathname === "/jobs" ? "text-primary" : "text-muted-foreground",
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    Find Work
                  </Link>
                  <Link
                    href="/freelancers"
                    className={cn(
                      "text-lg font-medium transition-colors hover:text-primary",
                      pathname === "/freelancers" ? "text-primary" : "text-muted-foreground",
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    Hire Talent
                  </Link>
                  <Link
                    href="/post-job"
                    className={cn(
                      "text-lg font-medium transition-colors hover:text-primary",
                      pathname === "/post-job" ? "text-primary" : "text-muted-foreground",
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    Post a Job
                  </Link>
                  <Link
                    href="/how-it-works"
                    className={cn(
                      "text-lg font-medium transition-colors hover:text-primary",
                      pathname === "/how-it-works" ? "text-primary" : "text-muted-foreground",
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    How It Works
                  </Link>

                  {isAuthenticated ? (
                    <>
                      <Link
                        href="/messages"
                        className={cn(
                          "text-lg font-medium transition-colors hover:text-primary",
                          pathname === "/messages" ? "text-primary" : "text-muted-foreground",
                        )}
                        onClick={() => setIsOpen(false)}
                      >
                        Messages
                      </Link>
                      <Link
                        href="/dashboard"
                        className={cn(
                          "text-lg font-medium transition-colors hover:text-primary",
                          pathname === "/dashboard" ? "text-primary" : "text-muted-foreground",
                        )}
                        onClick={() => setIsOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <Link
                        href="/profile"
                        className={cn(
                          "text-lg font-medium transition-colors hover:text-primary",
                          pathname === "/profile" ? "text-primary" : "text-muted-foreground",
                        )}
                        onClick={() => setIsOpen(false)}
                      >
                        Profile
                      </Link>
                      <button
                        className="text-lg font-medium text-muted-foreground transition-colors hover:text-primary text-left"
                        onClick={() => {
                          signOut({ callbackUrl: "/" })
                          setIsOpen(false)
                        }}
                      >
                        Log Out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        className={cn(
                          "text-lg font-medium transition-colors hover:text-primary",
                          pathname === "/login" ? "text-primary" : "text-muted-foreground",
                        )}
                        onClick={() => setIsOpen(false)}
                      >
                        Log In
                      </Link>
                      <Link
                        href="/register"
                        className={cn(
                          "text-lg font-medium transition-colors hover:text-primary",
                          pathname === "/register" ? "text-primary" : "text-muted-foreground",
                        )}
                        onClick={() => setIsOpen(false)}
                      >
                        Sign Up
                      </Link>
                    </>
                  )}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

