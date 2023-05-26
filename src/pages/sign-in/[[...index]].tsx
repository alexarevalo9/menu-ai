import AuthLayout from "@/layouts/auth/AuthLayout";
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <AuthLayout>
      <SignIn
        appearance={{
          variables: {
            colorPrimary: "#000000",
          },
          elements: {
            formFieldInput: "focus:ring-0 focus:border-black border-gray-30",
          },
        }}
      />
    </AuthLayout>
  );
}
