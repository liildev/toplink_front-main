import React, { useState } from "react";
import { Link } from "react-router-dom";
import { forgot } from "../http";
import { toast } from "react-hot-toast";
import Input from "../components/UI/Input";
import Loader from "../components/UI/Loader";

export default function Forget() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      let data = await forgot(email);

      if (data) {
        toast.success(data, {
          duration: 5000,
          position: "top-center",
        });
      }
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
    <section className="w-full h-[70vh] pt-32  flex items-center justify-center">
      <form className="flex flex-col">
        <h1 className="text-4xl font-body text-violet-800 mb-10">
          Parolni o'zgartirish
        </h1>

        <Input
          type="email"
          placeholder="Ex: abc@example.com"
          title="Elektron pochta"
          onChange={(e) => setEmail(e.target.value)}
        />
        
        <button
          disabled={loading}
          className="w-full bg-violet-800 text-white px-8 py-3 rounded-xl"
          onClick={handleSubmit}
        >
          {loading ? <Loader /> : "O'zgartirish"}
        </button>

        <div className="flex items-center justify-between mt-4">
          <p className="text-sm">Accountingiz mavjudmi?</p>

          <Link
            to={"/sign-in"}
            className="text-violet-800 mr-5 font-medium hover:underline"
          >
            Kirish
          </Link>
        </div>
      </form>
    </section>
  );
}
