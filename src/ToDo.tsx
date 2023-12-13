import { styled } from "styled-components";
import { useForm } from "react-hook-form";

const Form = styled.form`
  display: flex;
  margin-top: 50vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Input = styled.input`
  margin: 15px;
  border-radius: 5px;
`;
const Button = styled.button`
  width: 70px;
  height: 50px;
  background-color: white;
  border-radius: 5px;
`;

interface IForm {
  email: string;
  username: string;
  password1: string;
  password2: string;
  extraError?: string;
}

function ToDo() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
  } = useForm<IForm>({
    defaultValues: {
      email: "기본값",
    },
  });
  const onSubmit = (data: IForm) => {
    if (data.password1 !== data.password2) {
      setError(
        "password1",
        { message: "비밀번호가 일치하지 않습니다." },
        { shouldFocus: true }
      );
    }
    setError("extraError", { message: "서버다운" });
  };
  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register("email", {
            required: true,
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver\.com$/,
              message: "네이버 계정만 가능합니다.",
            },
          })}
          placeholder="email"
        />
        <span>{errors.email?.message}</span>
        <Input
          {...register("username", {
            validate: (value) => !value.includes("jun") || "jun사용불가",
          })}
          placeholder="username"
        />

        <Input {...register("password1")} placeholder="password1" />
        <Input {...register("password2")} placeholder="password2" />
        <span>{errors.password1?.message}</span>
        <Button>버튼</Button>
        <span>{errors.extraError?.message}</span>
      </Form>
    </>
  );
}
export default ToDo;
