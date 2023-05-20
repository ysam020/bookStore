import * as yup from "yup";

const nameRegex = /^[aA-zZ\s]+$/;
const date = new Date();
const year = date.getFullYear();

export const validationSchema = yup.object({
  title: yup
    .string()
    .trim()
    .min(1, "Title must be atleast 1 character")
    .max(25, "Maximun 25 Characters are allowed")
    .required("Please enter a title")
    .matches(nameRegex, "Title shouldn't include any special character"),

  author: yup
    .string()
    .trim()
    .min(1, "Name must be atleast 1 character")
    .max(25, "Maximun 25 Characters are allowed")
    .required("Please enter a name")
    .matches(nameRegex, "Name shouldn't include any special character"),

  year: yup
    .string("Enter a year")
    .required("Year is required")
    .test("valid-year", "Enter a valid year", (value) => {
      return Number(value) <= year;
    }),

  isbn: yup.string("Enter ISBN").required("ISBN is required"),
});
