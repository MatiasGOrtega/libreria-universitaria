"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { toast } from "sonner";
import { ZodType } from "zod";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { FIELD_NAMES, FIELD_TYPES } from "@/constants";
import FileUpload from "./FileUpload";

interface Props<T extends FieldValues> {
  type: "SIGN_IN" | "SIGN_UP";
  schema: ZodType<T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>;
}

function AuthForm<T extends FieldValues>({
  type,
  schema,
  defaultValues,
  onSubmit,
}: Props<T>) {
  const router = useRouter();

  const isSignIn = type === "SIGN_IN";

  const form: UseFormReturn<T> = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handleSubmit: SubmitHandler<T> = async (data) => {
    const result = await onSubmit(data);

    if (result.success) {
      toast.success("Éxito", {
        description: isSignIn
          ? "Has iniciado sesión exitosamente."
          : "Tu cuenta ha sido creada exitosamente.",
      });

      router.push("/");
    } else {
      toast.error(`Error ${isSignIn ? "al iniciar sesión" : "al registrase"}`, {
        description: result.error ?? "Ocurrio un error.",
      });
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold text-white">
        {isSignIn
          ? "Bienvenido de nuevo a la biblioteca de Papulo"
          : "Crea tu cuenta"}
      </h1>
      <p className="text-light-100">
        {isSignIn
          ? "Acceda a la amplia colección de recursos y manténgase actualizado."
          : "Complete todos los campos y cargue una identificación universitaria válida para obtener acceso a la biblioteca."}
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="w-full space-y-6"
        >
          {Object.keys(defaultValues).map((field) => (
            <FormField
              key={field}
              control={form.control}
              name={field as Path<T>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize">
                    {FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}
                  </FormLabel>
                  <FormControl>
                    {field.name === "universityCard" ? (
                      // <FileUpload
                      //   type="image"
                      //   accept="image/*"
                      //   placeholder="Upload your ID"
                      //   folder="ids"
                      //   variant="dark"
                      //   onFileChange={field.onChange}
                      // />
                      <div></div>
                    ) : (
                      <Input
                        required
                        type={
                          FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]
                        }
                        {...field}
                        className="form-input"
                      />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <Button type="submit" className="form-btn">
            {isSignIn ? "Inicia sesión" : "Registrarse"}
          </Button>
        </form>
      </Form>

      <p className="text-center text-base font-medium">
        {isSignIn ? "¿Eres nuevo? " : "¿Ya tienes cuenta?"}

        <Link
          href={isSignIn ? "/sign-up" : "/sign-in"}
          className="font-bold text-primary"
        >
          {isSignIn ? " Crear una cuenta" : " Inicia sesión"}
        </Link>
      </p>
    </div>
  );
}

export default AuthForm;
