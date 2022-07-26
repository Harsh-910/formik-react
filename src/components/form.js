import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Select from "react-select";

const CreateForm = () => {
  const [selectedValue, SetselectedValue] = useState("");
  const age = [
    {
      value: "15",
      label: "15"
    },
    {
      value: "17",
      label: "17"
    }
  ];

  const validationSchema = yup.object({
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string("Enter your password")
      .min(8, "Password should be of minimum 8 characters length")
      .required("Password is required"),
    age: yup.string("Enter Age").required("Age Is Required")
  });

  const formik = useFormik({
    initialValues: {
      email: "foobar@example.com",
      password: "foobar",
      age: ""
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    }
  });
  useEffect(() => {
    formik.values.email = "ddf@gmail.com";
  }, [formik.values]);

  const handleage = (selected) => {
    SetselectedValue(selected);
  };
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Select
          value={formik.values.age}
          options={age}
          onChange={formik.handleChange}
          error={formik.touched.age && Boolean(formik.errors.age)}
          helperText={formik.touched.age && formik.errors.age}
        />
        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default CreateForm;
