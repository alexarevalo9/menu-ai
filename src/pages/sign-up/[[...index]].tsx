import AuthLayout from "@/layouts/auth/AuthLayout";
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <AuthLayout>
      <SignUp
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
