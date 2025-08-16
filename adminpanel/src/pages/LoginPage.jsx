import {useState} from "react";
import axios from "axios";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useNavigate} from "react-router-dom";

export const LoginPage = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:4000/api/v1/login", {email}, {withCredentials: true});
            toast.success(res.data.message || "Login request sent successfully!");

            setTimeout(() => {
                navigate("/verify-otp");
            }, 1500);
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong. Please try again.");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen  px-4">
            <form
                onSubmit={handleFormSubmit}
                className="flex flex-col gap-4 items-start p-8 py-10 w-full max-w-lg text-gray-600 rounded-lg shadow-lg border border-gray-200 bg-white"
                style={{fontSize: "16px"}}
            >
                <p className="text-2xl font-semibold m-auto">Login Form</p>

                <div className="w-full">
                    <p className="text-xl font-medium">Email</p>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        placeholder="Enter your Email Address"
                        className="border border-gray-300 rounded w-full p-2 mt-1 outline-indigo-500"
                        type="email"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="bg-indigo-500 hover:bg-indigo-600 transition-all text-white w-full py-2 rounded-md font-medium text-xl cursor-pointer"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};
