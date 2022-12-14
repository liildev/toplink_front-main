import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MainContext } from "../context";
import { login, registration } from "../http";
import { toast } from "react-hot-toast";
import Input from "../components/UI/Input";
import { LOGIN_ROUTE } from "../constants";
import Loader from "../components/UI/Loader";

export default function Auth() {
  const location = useLocation();
  const navigate = useNavigate();

  const { setUser, setIsAuth } = useContext(MainContext);
  const [loading, setLoading] = useState(false);
  const isSignIn = location.pathname === LOGIN_ROUTE;

  const formInitialDetails = {
    fullName: "",
    username: "",
    email: "",
    password: "",
    number: "+998",
  };

  const [formDetails, setFormDetails] = useState(formInitialDetails);

  const onFormUpdate = (category, value) => {
    setFormDetails({
      ...formDetails,
      [category]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let data;
      if (isSignIn) {
        data = await login(formDetails.email, formDetails.password);
      } else {
        data = await registration(formDetails);
      }

      setUser(data);
      setFormDetails(formInitialDetails);
      setIsAuth(true);

      toast.success(`You are successfully signed ${isSignIn ? "in" : "up"}`, {
        duration: 3000,
        position: "top-center",
      });

      navigate("/");
    } catch (e) {
      toast.error(e.response.data.message, {
        duration: 3000,
        position: "bottom-center",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full h-[90vh] pt-32 flex items-center justify-center">
      <form className="flex flex-col">
        <h1 className="text-4xl font-body text-violet-800">
          {isSignIn ? "Kirish" : "Ro‘yxatdan o‘tish"}
        </h1>

        <p className="w-96 my-5">
          {isSignIn
            ? "Barcha xarajatlar va daromadlaringizni bir joyda kuzatib borish uchun hozir tizimga kiring!"
            : "Barcha xarajatlar va daromadlaringizni bir joyda kuzatib borish uchun hozir roʻyxatdan oʻting!"}
        </p>

        {isSignIn ? (
          <>
            <Input
              type="email"
              placeholder="Ex: abc@example.com"
              title="Elektron pochta"
              onChange={(e) => onFormUpdate("email", e.target.value)}
            />
            <Input
              type="password"
              placeholder="*********"
              title="Parol"
              onChange={(e) => onFormUpdate("password", e.target.value)}
            />
          </>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-x-4">
              <Input
                type="text"
                placeholder="Ex: Saul Ramirez"
                title="To‘liq ism"
                onChange={(e) => onFormUpdate("fullName", e.target.value)}
              />
              <Input
                type="tel"
                placeholder="+998"
                title="Telefon nomer"
                onChange={(e) => onFormUpdate("number", e.target.value)}
              />

              <Input
                type="email"
                placeholder="Ex: abc@example.com"
                title="Elektron pochta"
                onChange={(e) => onFormUpdate("email", e.target.value)}
              />
              <Input
                type="password"
                placeholder="*********"
                title="Parol"
                onChange={(e) => onFormUpdate("password", e.target.value)}
              />
            </div>
            <Input
              type="text"
              placeholder="Ex: Saul Ramirez"
              title="Foydalanuvchi nomi"
              onChange={(e) => onFormUpdate("username", e.target.value)}
            />
          </>
        )}

        {isSignIn && (
          <Link
            to={"/forgot"}
            className="text-sm text-violet-800 mb-4 hover:underline"
          >
            Parolni unutdingizmi?
          </Link>
        )}

        <button
          disabled={loading}
          className="w-full bg-violet-800 text-white px-8 py-3 rounded-xl"
          onClick={handleSubmit}
        >
          {loading ? <Loader /> : isSignIn ? "Kirish" : "Ro‘yxatdan o‘tish"}
        </button>
        
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm">
            {isSignIn
              ? "Accountingiz mavjud emasmi?"
              : "Accountingiz mavjudmi?"}
          </p>

          <Link
            to={isSignIn ? "/sign-up" : "/sign-in"}
            className="text-violet-800 mr-5 font-medium hover:underline"
          >
            {isSignIn ? "Ro‘yxatdan o‘tish" : "Kirish"}
          </Link>
        </div>
      </form>
    </section>
  );
}
