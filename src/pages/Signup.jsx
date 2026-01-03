import { useState } from "react";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { BottomWarning } from "../components/BottomWarning";
import { LoadComponent } from "../components/LoadComponent";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signup() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="bg-white flex h-[450px] flex-col items-center justify-center w-[400px] border shadow-sm shadow-gray-500 rounded-2xl">
        <Heading label={"Sign up"} />

        <InputBox
          type="email"
          placeholder="Enter username/email"
          onChange={(e) => setUserName(e.target.value)}
        />

        <InputBox
          type="text"
          placeholder="Enter Firstname"
          onChange={(e) => setFirstName(e.target.value)}
        />

        <InputBox
          type="text"
          placeholder="Enter Lastname"
          onChange={(e) => setLastName(e.target.value)}
        />

        <InputBox
          type="password"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="text-red-600 text-xs mt-1">{message}</div>

        {loading && <LoadComponent label="Creating your account..." />}

        <Button
          label="Sign up"
          onClick={async () => {
            try {
              setLoading(true);

              const response = await axios.post(
                `${API_URL}/user/signup`,
                {
                  userName,
                  firstName,
                  lastName,
                  password,
                }
              );

              setMessage(response.data.message);

              if (response.data.message === "User created successfully") {
                navigate("/signin");
              }
            } catch (err) {
              setMessage(
                err.response?.data?.message || "Signup failed"
              );
            } finally {
              setLoading(false);
            }
          }}
        />

        <BottomWarning
          label={"Already have an account?"}
          buttonText={"Sign in"}
          to={"/signin"}
        />
      </div>
    </div>
  );
}
