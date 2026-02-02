import { useState } from "react";

export function useFormHandler(onSubmitSuccess) {
  const [form, setForm] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", form);
    alert("Thank you! We will contact you soon.");
    if (onSubmitSuccess) onSubmitSuccess(form);
    setForm({});
  };

  const resetForm = () => setForm({});

  return { form, setForm, handleChange, handleSubmit, resetForm };
}
