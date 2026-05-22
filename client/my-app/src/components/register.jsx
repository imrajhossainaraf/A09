"use client";
import { useRouter } from "next/navigation";
import { Check } from "@gravity-ui/icons";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-hot-toast";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  InputGroup,
  Label,
  TextField,
} from "@heroui/react";
import { Eye, EyeSlash } from "@gravity-ui/icons";
import { useState } from "react";

export function Register() {
  const router = useRouter();
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {};

    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    try {
      const response = await axios.post(
        "http://localhost:5000/register",
        {
          email: data.email,
          password: data.password,
        },
        {
          withCredentials: true,
        },
      );
      if (response.status === 201) {
        toast.success("Registration successful");
        router.push("/home");
      } else {
        toast.error("Registration failed");
        router.push("/register");
      }
    } catch (error) {
      toast.error(`Error: ${error.response?.data?.message || error.message}`);
    }
  };
  const [isVisible, setIsVisible] = useState(false);

  return (
    <Form className="flex w-full flex-col gap-4" onSubmit={onSubmit}>
      <TextField
        isRequired
        name="email"
        type="email"
        validate={(value) => {
          if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
            return "Please enter a valid email address";
          }

          return null;
        }}
      >
        <Label>Email</Label>
        <Input placeholder="john@example.com" />
        <FieldError />
      </TextField>

      <TextField className="w-full max-w-70" name="password" isRequired>
        <Label>Password</Label>
        <InputGroup>
          <InputGroup.Input
            className="w-full max-w-70"
            type={isVisible ? "text" : "password"}
          />
          <InputGroup.Suffix className="pr-0">
            <Button
              isIconOnly
              aria-label={isVisible ? "Hide password" : "Show password"}
              size="sm"
              variant="ghost"
              onPress={() => setIsVisible(!isVisible)}
            >
              {isVisible ? (
                <Eye className="size-4" />
              ) : (
                <EyeSlash className="size-4" />
              )}
            </Button>
          </InputGroup.Suffix>
        </InputGroup>
        <FieldError />
      </TextField>

      <div className="flex flex-col gap-2 w-full mt-4">
        <Button type="submit" color="primary" className="w-full bg-blue-900 text-white">
          Create Officer Account
        </Button>
      </div>
      <div className="text-center text-sm mt-4 text-slate-600 dark:text-slate-300">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-800 dark:text-blue-300 hover:underline">
          Sign in here
        </Link>
      </div>
    </Form>
  );
}
