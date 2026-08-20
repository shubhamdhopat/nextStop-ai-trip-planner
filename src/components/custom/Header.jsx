import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";

function Header() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [openDialog, setOpenDialog] = useState(false);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log("Login Failed:", error),
  });

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "application/json",
          },
        },
      )
      .then((resp) => {
        localStorage.setItem("user", JSON.stringify(resp?.data));
        setOpenDialog(false);
        window.location.reload();
      });
  };

  useEffect(() => {
    console.log(user);
  }, []);

  return (
    <header className="w-full shadow-sm bg-white">
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 gap-2">
        {/* Left Side */}
        <div className="flex items-center gap-2 shrink-0">
          <img
            src="/nextStop.png"
            alt="NextStop Logo"
            className="h-8 sm:h-12 w-auto"
          />
          <h1 className="text-lg sm:text-3xl font-extrabold tracking-tight whitespace-nowrap">
            <span className="text-[#0B1F4D]">next</span>
            <span className="bg-gradient-to-r from-cyan-500 to-teal-500 bg-clip-text text-transparent">
              Stop
            </span>
          </h1>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-1 sm:gap-3 min-w-0">
          {user ? (
            <>
              <a href="/create-trip" className="hidden sm:block">
                <Button variant="outline" className="rounded-full">
                  + Create Trip
                </Button>
              </a>
              <a href="/create-trip" className="sm:hidden">
                <Button variant="outline" size="icon" className="rounded-full">
                  +
                </Button>
              </a>

              <a href="/my-trips" className="hidden sm:block">
                <Button variant="outline" className="rounded-full">
                  My Trips
                </Button>
              </a>

              <Popover>
                <PopoverTrigger
                  render={
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full shrink-0"
                    />
                  }
                >
                  <img
                    src={user?.picture}
                    referrerPolicy="no-referrer"
                    className="h-8 w-8 rounded-full"
                  />
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverHeader>
                    <PopoverDescription className="flex flex-col gap-3">
                      {/* My Trips link shown here on mobile, since the top bar hides it */}
                      <a href="/my-trips" className="sm:hidden cursor-pointer">
                        My Trips
                      </a>
                      <h2
                        className="cursor-pointer"
                        onClick={() => {
                          googleLogout();
                          localStorage.clear();
                          window.location.reload();
                        }}
                      >
                        Logout
                      </h2>
                    </PopoverDescription>
                  </PopoverHeader>
                </PopoverContent>
              </Popover>
            </>
          ) : (
            <Button
              onClick={() => setOpenDialog(true)}
              className="px-4 sm:px-6 py-4 sm:py-6 text-sm sm:text-base rounded-xl"
            >
              Sign In
            </Button>
          )}
        </div>

        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent>
            <DialogHeader>
              <div className="flex items-center gap-1 mb-5">
                <img
                  src="/nextStop.png"
                  alt="NextStop Logo"
                  className="h-12 w-auto"
                />
                <h1 className="text-3xl font-extrabold tracking-tight">
                  <span className="text-[#0B1F4D]">next</span>
                  <span className="bg-gradient-to-r from-cyan-500 to-teal-500 bg-clip-text text-transparent">
                    Stop
                  </span>
                </h1>
              </div>
              <DialogTitle className="mt-2">Sign In with Google</DialogTitle>
              <DialogDescription>
                Sign in to your Google account to continue
              </DialogDescription>
              <div className="mt-4">
                <Button
                  onClick={login}
                  className="w-full mt-5 flex-gap-4 align-items-center"
                >
                  <FcGoogle className="h-7 w-7" />
                  Sign In with Google
                </Button>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </header>
  );
}

export default Header;
