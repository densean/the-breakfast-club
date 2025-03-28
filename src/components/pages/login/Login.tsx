import { WebButton } from "@/components/common/button/Button";
import { LOGIN_TEXTS } from "@/components/common/common.constants";
import { WebInput } from "@/components/common/input/Input";
import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { useNavigate } from "@tanstack/react-router";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import "./Login.less";
import { useAuthContext } from "@/hooks/useAuthContext";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  //forgot to implement
  const [formSubmitted, setFormSubmitted] = useState(false);
  const navigate = useNavigate();
  const [isIncorrect, setIsIncorrect] = useState(false);
  const isErrorCredentials = isLogin && isIncorrect;
  const { login } = useAuthContext();

  const form = useForm({
    defaultValues: isLogin
      ? { username: "", password: "" }
      : {
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
          mobileNumber: "",
        },

    onSubmit: (values) => {
      if (isLogin) {
        onLogin(values);
      } else {
        onRegister(values);
      }
    },
  });

  const onLogin = (val: { value: { username: string; password: string } }) => {
    if (
      val.value.username === "sean123" &&
      (val.value.password = "neverShare1")
    ) {
      setIsIncorrect(false);
      login();
      navigate({ to: "/" });
    }
    setIsIncorrect(true);
  };

  const onRegister = (val) => {
    console.log(val, "not implemented");
  };

  return (
    <div className="flex h-screen">
      <div className="hidden md:flex w-3/5 bg-cover bg-center relative">
        <div
          className="relative z-10 bg-black bg-opacity-30 text-gray-100 p-16 w-full flex flex-col justify-center"
          style={{ backgroundImage: "url('/src/assets/login/image.png')" }}
        >
          <h2 className="text-xl font-semibold mb-20">{LOGIN_TEXTS.TITLE}</h2>
          <h1 className="text-9xl font-bold mb-4">{LOGIN_TEXTS.SUBTITLE}</h1>
          {LOGIN_TEXTS.DESCRIPTION.map((desc) => (
            <p key={desc} className="mt-4 max-w-4xl text-left">
              {desc}
            </p>
          ))}
        </div>
      </div>

      <div className="w-full md:w-2/5 flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            {isLogin ? "Welcome back!" : "Register now!"}
          </h2>

          {isErrorCredentials && (
            <Alert variant="destructive" className="mb-10">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Wrong Credentials</AlertTitle>
              <AlertDescription>sean123, neverShare1</AlertDescription>
            </Alert>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setFormSubmitted(true);
              form.handleSubmit();
            }}
            className="space-y-4"
          >
            <form.Field
              name="username"
              validators={{
                onChange: ({ value }) => {
                  if (!value) return "Required";
                  if (value.length < 3) return "Minimum of 3 characters";
                },
              }}
            >
              {(field) => (
                <WebInput
                  size="3"
                  label="Username"
                  radius="large"
                  type="text"
                  variant="classic"
                  placeholder="Enter your username"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  errorMessage={field.state.meta.errors[0]}
                />
              )}
            </form.Field>
            {!isLogin && (
              <form.Field
                name="email"
                validators={{
                  onChange: ({ value }) => {
                    if (!value) return "Required";
                    if (!/\S+@\S+\.\S+/.test(value))
                      return "Invalid email address";
                  },
                }}
              >
                {(field) => (
                  <WebInput
                    size="3"
                    label="Email"
                    radius="large"
                    type="text"
                    variant="classic"
                    placeholder="Enter your email address"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    errorMessage={field.state.meta.errors[0]}
                  />
                )}
              </form.Field>
            )}
            {!isLogin && (
              <form.Field
                name="mobileNumber"
                validators={{
                  onChange: ({ value }) => {
                    if (!value) return "Required";
                    if (!/^\d{9,11}$/.test(value))
                      return "Mobile number must be 9 to 11 digits";
                  },
                }}
              >
                {(field) => (
                  <WebInput
                    size="3"
                    label="Mobile Number"
                    radius="large"
                    type="text"
                    variant="classic"
                    placeholder="Enter your phone number"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    errorMessage={field.state.meta.errors[0]}
                  />
                )}
              </form.Field>
            )}
            <form.Field
              name="password"
              validators={{
                onChange: ({ value }) => {
                  if (!value) return "Password is required";

                  if (!/^(?=.*[A-Z])(?=.*\d).{6,}$/.test(value) && !isLogin)
                    return "Password must have at least one uppercase letter, one number, and be 6+ characters long";
                },
              }}
            >
              {(field) => (
                <WebInput
                  size="3"
                  label="Password"
                  radius="large"
                  type="password"
                  variant="classic"
                  placeholder="Enter your password"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  errorMessage={field.state.meta.errors[0]}
                />
              )}
            </form.Field>

            {!isLogin && (
              <form.Subscribe selector={(state) => state.values.password}>
                {(password) => (
                  <form.Field
                    name="confirmPassword"
                    validators={{
                      onChange: ({ value }) => {
                        if (!value) return "Required";
                        if (value !== password) return "Passwords must match";
                      },
                    }}
                  >
                    {(field) => (
                      <WebInput
                        size="3"
                        label="Confirm Password"
                        radius="large"
                        type="password"
                        variant="classic"
                        placeholder="Confirm your password"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        errorMessage={field.state.meta.errors[0]}
                      />
                    )}
                  </form.Field>
                )}
              </form.Subscribe>
            )}

            <WebButton
              label={isLogin ? "Login" : "Register  (unimplemented)"}
              size="3"
              variant="solid"
              radius="large"
              type="submit"
              color="blue"
              // disabled={!form.state.isValid}
              className="web-button"
            />
          </form>

          <div className="mt-4 text-left">
            <p>
              {isLogin
                ? "Don't have an account? "
                : "Already have an account? "}
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  form.reset();
                }}
                className="text-blue-600 hover:underline"
              >
                {isLogin ? "Register" : "Login"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
