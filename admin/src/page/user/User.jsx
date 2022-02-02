import React, { useContext, useEffect } from "react";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PublishIcon from "@mui/icons-material/Publish";
import { Link, useHistory, useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import { UserContext } from "../../context/userContext/UserContext";
import { LoaderContext } from "../../context/loaderContext/LoaderContext";
import BasicModal from "../../components/modal/Modal";
import { updateUser } from "../../context/userContext/apiCalls";
import { loaderStart } from "../../context/loaderContext/LoaderActions";
import { getUser } from "../../context/userContext/apiCalls";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import "./User.scss";

const User = () => {
  const { dispatch: loaderDispatch, isLoader } = useContext(LoaderContext);
  const { dispatch: userDispatch, user } = useContext(UserContext);
  const params = useParams();
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      await getUser(loaderDispatch, loaderStart, userDispatch, params.id);
    };
    fetchData();
  }, [loaderDispatch, userDispatch, params.id]);

  const validationSchema = Yup.object().shape({
    username: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string().required(),
    profile: Yup.mixed()
      .required()
      .test("file", "The File is required", (value) => {
        return value[0];
      }),
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
    await updateUser(
      loaderDispatch,
      loaderStart,
      user._id,
      formData,
      userDispatch
    );
    reset();
    history.push("/users");
  };

  return isLoader ? (
    <BasicModal state={isLoader} />
  ) : (
    <Container className="editUser">
      <div className="titleContainer">
        <h1 className="title">Edit User</h1>
        <Link to="/newUser">
          <button className="userAddBtn">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src={
                user.profile ||
                "https://t3.ftcdn.net/jpg/00/64/67/52/360_F_64675209_7ve2XQANuzuHjMZXP3aIYIpsDKEbF5dD.jpg"
              }
              alt="profile"
            />
            <div className="userShowTopDetails">
              <span className="userShowTopName">{user.username}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowBottomTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentityIcon className="icon" />
              <span className="userShowBottomDetails">{user.username}</span>
            </div>
            <span className="userShowBottomTitle">Contact Details</span>

            <div className="userShowInfo">
              <MailOutlineIcon className="icon" />
              <span className="userShowBottomDetails">{user.email}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm" onSubmit={handleSubmit(onSubmit)}>
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label
                  className={`${errors.username ? "is-invalid-label" : ""}`}
                >
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  placeholder={user.username}
                  {...register("username")}
                  className={`${errors.username ? "is-invalid" : ""}`}
                  autoComplete="off"
                />
              </div>

              <div className="userUpdateItem">
                <label className={`${errors.email ? "is-invalid-label" : ""}`}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder={user.email}
                  {...register("email")}
                  className={`${errors.email ? "is-invalid" : ""}`}
                  autoComplete="off"
                />
              </div>
              <div className="userUpdateItem">
                <label
                  className={`${errors.password ? "is-invalid-label" : ""}`}
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  {...register("password")}
                  className={`${errors.password ? "is-invalid" : ""}`}
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  src={
                    user.profile ||
                    "https://t3.ftcdn.net/jpg/00/64/67/52/360_F_64675209_7ve2XQANuzuHjMZXP3aIYIpsDKEbF5dD.jpg"
                  }
                  alt="profile"
                />
                <label htmlFor="file">
                  <PublishIcon
                    className={`icon ${
                      errors.profile ? "is-invalid-label" : ""
                    }`}
                  />
                </label>
                <input
                  type="file"
                  id="file"
                  style={{ display: "none" }}
                  name="profile"
                  {...register("profile")}
                />
              </div>
              <button className="userUpdateBtn">Update</button>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default User;
