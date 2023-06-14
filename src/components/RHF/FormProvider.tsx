import { FormProvider as Form, type UseFormReturn } from "react-hook-form";

type Props = {
  // eslint-disable-next-line
  methods: UseFormReturn<any>;
  children: React.ReactNode;
  onSubmit?: VoidFunction;
};

export default function FormProvider({ children, onSubmit, methods }: Props) {
  return (
    <Form {...methods}>
      <form onSubmit={onSubmit}>{children}</form>
    </Form>
  );
}
