"use server";

import { signIn } from "@/auth";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { hash } from "bcryptjs";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import config from "../config";
import ratelimit from "../ratelimit";
import { workflowClient } from "../workflow";

async function rateLimit() {
  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
  const { success } = await ratelimit.limit(ip);

  if (!success) return redirect("/too-fast");
}

export async function signInWithCredentials(
  params: Pick<AuthCredentials, "email" | "password">
) {
  const { email, password } = params;

  // await rateLimit();

  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    console.log(result, "result");

    if (result?.error) {
      return { success: false, error: result.error };
    }

    return { success: true };
  } catch (error) {
    console.log(error, "Signin error");
    return { success: false, error: "Signin error" };
  }
}

export async function signUp(params: AuthCredentials) {
  console.log(params, "params");

  const {
    fullName,
    email,
    universityId,
    password,
    // universityCard
  } = params;

  // await rateLimit();

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existingUser.length > 0) {
    return { success: false, error: "User already exists" };
  }

  const hashedPassword = await hash(password, 10);

  try {
    await db.insert(users).values({
      fullName: fullName,
      email: email,
      universityId: universityId,
      password: hashedPassword,
      //cambiar esto por un upload de la universityCard
      universityCard: "/icons/upload.svg",
    });

    // await workflowClient.trigger({
    //   url: `${process.env.NEXT_PUBLIC_PROD_API_ENDPOINT}/api/workflow/onboarding`,
    //   body: {
    //     email,
    //     fullName,
    //   },
    // });

    await signInWithCredentials({ email, password });

    return { success: true };
  } catch (error) {
    console.log(error, "Signup error");
    return { success: false, error: "Signup error" };
  }
}
