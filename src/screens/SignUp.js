import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import routes from "../routes";
import AuthLayout from "./auth/AuthLayout";
import BottomBox from "./auth/BottomBox";
import Button from "./auth/Button";
import FormBox from "./auth/FormBox";
import FormError from "./auth/FormError";
import Input from "./auth/Input";
import PageTitle from "./PageTitle";
import { FatLink } from "./shared";
import { useHistory } from "react-router-dom";

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Subtitle = styled(FatLink)`
  font-size: 16px;
  text-align: center;
  margin-top: 10px;
`;

const CREATE_ACCOUNT_MUTATION = gql`
  mutation (
    $email: String!
    $password: String!
    $username: String!
    $name: String!
  ) {
    createUser(
      email: $email
      password: $password
      username: $username
      name: $name
    ) {
      ok
      error
    }
  }
`;

function SingUp() {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
  } = useForm({
    mode: "onChange",
  });

  const onCompleted = (data) => {
    const { username, password } = getValues();
    const {
      createUser: { ok, error },
    } = data;
    if (!ok) {
      return;
    }

    history.push(routes.home, {
      message: "Account created. Please log in.",
      username,
      password,
    });
  };

  const [createUser, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
    onCompleted,
  });

  const onSubmitValid = (data) => {
    if (loading) {
      return;
    }
    createUser({
      variables: { ...data },
    });
  };

  return (
    <AuthLayout>
      <PageTitle title="Sign up" />
      <FormBox>
        <HeaderContainer>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
          <Subtitle>
            Sign up to see photos and videos from your friends.
          </Subtitle>
        </HeaderContainer>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            {...register("email", { required: "email is required" })}
            type="text"
            placeholder="Email"
            hasError={Boolean(errors?.email?.message)}
          />
          <FormError message={errors?.email?.message} />
          <Input
            {...register("username", { required: "username is required" })}
            type="text"
            placeholder="Username"
            hasError={Boolean(errors?.username?.message)}
          />
          <FormError message={errors?.username?.message} />

          <Input
            {...register("name")}
            type="text"
            placeholder="Name"
            hasError={Boolean(errors?.name?.message)}
          />
          {/* <FormError message={errors?.name?.message} /> */}
          <Input
            {...register("password", {
              required: "password is required",
            })}
            type="password"
            placeholder="Password"
            hasError={Boolean(errors?.password?.message)}
          />
          <FormError message={errors?.password?.message} />

          <Button
            type="submit"
            value={loading ? "Loading..." : "Sign up"}
            disabled={!isValid || loading}
          />

          <FormError message={errors?.result?.message} />
        </form>
      </FormBox>
      <BottomBox cta="Have an account?" linkText="Log in" link={routes.home} />
    </AuthLayout>
  );
}
export default SingUp;
