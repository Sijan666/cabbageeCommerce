import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Container from "../Container";
import { SlLock, SlEnvolope, SlUser } from "react-icons/sl";
import { useStore } from "../../store/useStore"; 

const Login = () => {
    const [authType, setAuthType] = useState("login");
    const navigate = useNavigate();
    const location = useLocation();

    const { user, loginUser } = useStore(); 
    const from = location.state?.from || "/profile"; 

    useEffect(() => {
        if (user) {
            navigate(from, { replace: true });
        }
    }, [user, navigate, from]);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (authType === "register") {
            const existingUsers = JSON.parse(localStorage.getItem("cabbage_users")) || [];
            const userExists = existingUsers.find(u => u.email === formData.email);
            
            if (userExists) {
                alert("This email is already registered! Please login.");
                return;
            }
            
            const newUser = { name: formData.name, email: formData.email, password: formData.password };
            existingUsers.push(newUser);
            localStorage.setItem("cabbage_users", JSON.stringify(existingUsers));
            
            alert("Account created successfully! Please log in now.");
            setAuthType("login");
            setFormData({ ...formData, password: "" }); 
        } 
        else if (authType === "login") {
            const existingUsers = JSON.parse(localStorage.getItem("cabbage_users")) || [];
            const validUser = existingUsers.find(
                u => u.email === formData.email && u.password === formData.password
            );
            
            if (validUser) {
                loginUser({ name: validUser.name, email: validUser.email });
            } else {
                alert("Invalid Email or Password! Please try again.");
            }
        } 
        else if (authType === "forgot") {
            alert(`A password reset link has been sent to: ${formData.email}`);
            setAuthType("login");
            setFormData({ ...formData, password: "" });
        }
    };

    return (
        <div className="bg-[#F7F9F2] min-h-screen py-16 md:py-24 flex items-center justify-center font-nuni">
            <Container className="px-4 lg:px-0 w-full max-w-5xl">
                <div className="bg-white rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.06)] border border-gray-100 overflow-hidden grid grid-cols-1 lg:grid-cols-2 transition-all duration-500">
                    <div className="bg-linear-to-br from-[#051117] to-[#122834] p-10 md:p-14 flex flex-col justify-between text-white relative overflow-hidden transition-colors duration-500">
                        <div className="absolute -top-24 -left-24 w-64 h-64 bg-[#80B500]/20 rounded-full blur-[80px] pointer-events-none"></div>
                        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-[#80B500]/10 rounded-full blur-[80px] pointer-events-none"></div>
                        <div className="relative z-10">
                            <Link to="/" className="text-2xl font-black font-int tracking-tight inline-block mb-10">
                                Cabbage<span className="text-[#80B500]">.</span>
                            </Link>
                            <h2 className="text-3xl md:text-4xl font-extrabold font-int leading-tight mb-4">
                                {authType === "login" && "Welcome back to fresh groceries!"}
                                {authType === "register" && "Join our healthy community today."}
                                {authType === "forgot" && "Don't worry, we've got you covered."}
                            </h2>
                            <p className="text-white/70 text-sm md:text-base leading-relaxed">
                                {authType === "forgot" 
                                ? "Resetting your password is easy. Just provide your email and follow the instructions sent to your inbox."
                                : "Discover organic products, daily hot deals, and seamless shopping experience crafted just for you."
                                }
                            </p>
                        </div>
                        <div className="relative z-10 pt-10 border-t border-white/10 mt-10">
                            <p className="text-xs text-white/50 tracking-wider uppercase font-bold">
                                Secure & Trusted E-Commerce Platform
                            </p>
                        </div>
                    </div>
                    <div className="p-8 md:p-14 flex flex-col justify-center transition-all duration-500">
                        {authType !== "forgot" && (
                            <div className="flex bg-[#F4F7F0] p-1.5 rounded-2xl mb-10">
                                <button
                                    type="button"
                                    onClick={() => setAuthType("login")}
                                    className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all duration-300 cursor-pointer ${
                                        authType === "login" ? "bg-white text-[#232323] shadow-sm" : "text-gray-400 hover:text-[#232323]"
                                    }`}
                                >
                                    Sign In
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setAuthType("register")}
                                    className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all duration-300 cursor-pointer ${
                                        authType === "register" ? "bg-white text-[#232323] shadow-sm" : "text-gray-400 hover:text-[#232323]"
                                    }`}
                                >
                                    Create Account
                                </button>
                            </div>
                        )}
                        <div className={`mb-8 ${authType === "forgot" ? "mt-4" : ""}`}>
                            <h3 className="text-2xl md:text-3xl font-black font-int text-[#232323] mb-2">
                                {authType === "login" && "Sign In to Your Account"}
                                {authType === "register" && "Get Started Absolutely Free"}
                                {authType === "forgot" && "Reset Your Password"}
                            </h3>
                            <p className="text-sm text-[#546375]">
                                {authType === "login" && "Please enter your credentials to continue."}
                                {authType === "register" && "No credit card required. Setup takes less than a minute."}
                                {authType === "forgot" && "Enter your email address and we will send you a link to reset your password."}
                            </p>
                        </div>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                            {authType === "register" && (
                                <div className="flex flex-col gap-2 transition-all duration-300">
                                    <label className="text-xs font-bold uppercase tracking-wider text-[#232323]">Full Name</label>
                                    <div className="relative flex items-center">
                                        <SlUser className="absolute left-4 text-gray-400 text-lg" />
                                        <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="John Doe" className="w-full bg-[#F4F7F0] border border-transparent focus:border-[#80B500] focus:bg-white rounded-xl pl-12 pr-5 py-4 outline-none transition-colors text-sm"/>
                                    </div>
                                </div>
                            )}
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-[#232323]">Email Address</label>
                                <div className="relative flex items-center">
                                    <SlEnvolope className="absolute left-4 text-gray-400 text-lg" />
                                    <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="name@example.com" className="w-full bg-[#F4F7F0] border border-transparent focus:border-[#80B500] focus:bg-white rounded-xl pl-12 pr-5 py-4 outline-none transition-colors text-sm"/>
                                </div>
                            </div>
                            {authType !== "forgot" && (
                                <div className="flex flex-col gap-2 transition-all duration-300">
                                    <label className="text-xs font-bold uppercase tracking-wider text-[#232323]">Password</label>
                                    <div className="relative flex items-center">
                                        <SlLock className="absolute left-4 text-gray-400 text-lg" />
                                        <input type="password" name="password" value={formData.password} onChange={handleChange} required placeholder="••••••••" className="w-full bg-[#F4F7F0] border border-transparent focus:border-[#80B500] focus:bg-white rounded-xl pl-12 pr-5 py-4 outline-none transition-colors text-sm"/>
                                    </div>
                                </div>
                            )}
                            {authType === "login" && (
                                <div className="flex justify-between items-center text-sm mt-1">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="checkbox" className="accent-[#80B500] w-4 h-4 rounded cursor-pointer" />
                                        <span className="text-gray-500">Remember me</span>
                                    </label>
                                    <button type="button" onClick={() => setAuthType("forgot")} className="text-[#80B500] font-bold hover:underline cursor-pointer">Forgot Password?</button>
                                </div>
                            )}
                            <button type="submit" className="mt-4 bg-[#80B500] hover:bg-[#6c9a00] text-white font-bold py-4 rounded-xl shadow-lg shadow-[#80B500]/30 hover:shadow-xl transition-all duration-300 uppercase tracking-widest text-sm w-full cursor-pointer">
                                {authType === "login" && "Sign In"}
                                {authType === "register" && "Create Account"}
                                {authType === "forgot" && "Send Reset Link"}
                            </button>
                        </form>
                        {authType === "forgot" && (
                            <div className="mt-8 text-center">
                                <p className="text-sm text-[#546375]">Remember your password? <button onClick={() => setAuthType("login")} className="text-[#80B500] font-bold hover:underline cursor-pointer">Back to Sign In</button></p>
                            </div>
                        )}
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Login;