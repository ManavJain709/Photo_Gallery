"use client";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Input,
} from "@nextui-org/react";
import React, { useState } from "react";

import { RecaptchaVerifier } from "firebase/auth";
import { auth } from "@/lib";
import { useAuth } from "../hooks/useAuth";

const PhoneAuth = () => {
  const { isSignedIn, pending, verifyPassword } = useAuth();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  if (pending) {
    return <div>Loading...</div>;
  }

  if (isSignedIn) {
    return (window.location.href = "/dashboard");
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-4 p-4">
      <Card>
        <CardHeader>
          <p className="text-lg font-semibold text-center">
            Welcome to the Photo gallery
          </p>
        </CardHeader>
        <Divider />
        <CardBody className="flex flex-col gap-4 w-full p-4">
          <Input
            type="tel"
            variant="bordered"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            type="text"
            variant="bordered"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </CardBody>
        <Divider />
        <CardFooter className="flex flex-row w-full justify-end">
          <Button
            onClick={async () => {
              if (!email || !password)
                return alert("Please enter email and password");
              try {
                await verifyPassword(email, password);
              } catch (error) {
                console.error(error);
                alert("Invalid email or password");
              }
            }}
          >
            Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PhoneAuth;
