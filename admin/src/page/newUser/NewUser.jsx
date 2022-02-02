import React, { useContext } from "react";
import Container from "@mui/material/Container";
import { useHistory } from "react-router-dom";
import { LoaderContext } from "../../context/loaderContext/LoaderContext";
import { UserContext } from "../../context/userContext/UserContext";
import BasicModal from "../../components/modal/Modal";
import { createUser } from "../../context/userContext/apiCalls";
import { loaderStart } from "../../context/loaderContext/LoaderActions";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import "./NewUser.scss";

const NewUser = () => {
  const { dispatch: loaderDispatch, isLoader } = useContext(LoaderContext);
  const { dispatch: userDispatch } = useContext(UserContext);
  const history = useHistory();

  const validationSchema = Yup.object().shape({
    username: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string().required().min(5),
    profile: Yup.mixed()
      .required()
      .test("file", "The File is required", (value) => {
        return value[0];
      }),
    gender: Yup.string().required(),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("profile", data.profile[0]);
    formData.append("gender", data.gender);
    await createUser(loaderDispatch, loaderStart, formData, userDispatch);
    reset();
    history.push("/users");
  };

  return isLoader ? (
    <BasicModal state={isLoader} />
  ) : (
    <Container className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <form className="newUserForm" onSubmit={handleSubmit(onSubmit)}>
        <div className="newUserItem">
          <label className={`${errors.profile ? "is-invalid-label" : ""}`}>
            Profile
          </label>
          <input
            type="file"
            name="profile"
            {...register("profile")}
            className={`${errors.profile ? "is-invalid" : ""}`}
          />
        </div>
        <div className="newUserItem">
          <label className={`${errors.username ? "is-invalid-label" : ""}`}>
            Username
          </label>
          <input
            type="text"
            placeholder="username"
            name="username"
            {...register("username")}
            className={`${errors.username ? "is-invalid" : ""}`}
            autoComplete="off"
          />
        </div>

        <div className="newUserItem">
          <label className={`${errors.email ? "is-invalid-label" : ""}`}>
            Email
          </label>
          <input
            type="email"
            placeholder="email"
            name="email"
            {...register("email")}
            className={`${errors.email ? "is-invalid" : ""}`}
            autoComplete="off"
          />
        </div>
        <div className="newUserItem">
          <label className={`${errors.password ? "is-invalid-label" : ""}`}>
            Password
          </label>
          <input
            type="password"
            placeholder="password"
            name="password"
            {...register("password")}
            className={`${errors.password ? "is-invalid" : ""}`}
            autoComplete="off"
          />
        </div>
        <div className="newUserItem">
          <label className={`${errors.gender ? "is-invalid-label" : ""}`}>
            Gender
          </label>
          <div className="newUserGender">
            <input
              type="radio"
              name="gender"
              id="male"
              value="male"
              {...register("gender")}
            />
            <label
              htmlFor="male"
              className={`${errors.gender ? "is-invalid-label" : ""}`}
            >
              Male
            </label>
            <input
              type="radio"
              name="gender"
              id="female"
              value="female"
              {...register("gender")}
            />
            <label
              htmlFor="female"
              className={`${errors.gender ? "is-invalid-label" : ""}`}
            >
              Female
            </label>
            <input
              type="radio"
              name="gender"
              id="other"
              value="other"
              {...register("gender")}
            />
            <label
              htmlFor="other"
              className={`${errors.gender ? "is-invalid-label" : ""}`}
            >
              Other
            </label>
          </div>
        </div>
        <button className="createBtn">Create</button>
      </form>
    </Container>
  );
};

export default NewUser;
