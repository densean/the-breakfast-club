/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from "react";
import { useForm, useStore } from "@tanstack/react-form";

const useFormCompletion = ({ defaultValues }: { defaultValues: any }) => {
  const form = useForm({ defaultValues });

  const allFieldsFilled = useMemo(() => {
    return Object.values(form.store.state.values).every((val) => val !== "");
  }, [form.store.state.values]);

  const allFieldsTouched = useMemo(() => {
    return Object.values(form.store.state.fieldMeta).every(
      (meta) => meta.isTouched || !!allFieldsFilled
    );
  }, [form.store.state.fieldMeta, allFieldsFilled]);

  const isValid = useMemo(
    () => allFieldsFilled && allFieldsTouched,
    [allFieldsFilled, allFieldsTouched]
  );

  const values = useStore(form.store, (state) => state.values);

  return { isValid, values, form };
};

export default useFormCompletion;
