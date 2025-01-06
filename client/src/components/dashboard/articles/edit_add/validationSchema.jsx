import * as Yup from "yup";

export const formValues = {
  title: "",
  content: "",
  excerpt: "",
  score: "",
  director: "",
  actor: [],
  status: "draft",
  category: "",
};

export const validation = () =>
  Yup.object({
    excerpt: Yup.string()
      .required("Sorry the excerpt is required")
      .max(500, "Sorry 500 max"),
    score: Yup.number()
      .required("Sorry the score is required")
      .min(0, "0 is the min")
      .max(100, "100 is the max"),
    director: Yup.string()
    .required("Sorry the director is required"),
    actor: Yup.array()
      .required("Sorry the actors are required")
      .min(3, "Must be 3 at least"),
    status: Yup.string()
    .required("Sorry the status is required"),
    category: Yup.string()
  });
