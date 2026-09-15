import { useState } from "react";

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  // Regex: checks for something@something.something
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function getPasswordStrength(password) {
    if (password.length === 0) return "";
    if (password.length < 6) return "Weak";
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);
    const score = [hasUpper, hasNumber, hasSpecial].filter(Boolean).length;
    if (score >= 2 && password.length >= 8) return "Strong";
    if (score >= 1) return "Medium";
    return "Weak";
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newErrors = {};

    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert(`${isLogin ? "Login" : "Registration"} successful (demo only)`);
    }
  }

  const strength = getPasswordStrength(formData.password);
  const strengthColor =
    strength === "Strong" ? "text-green-400" :
    strength === "Medium" ? "text-yellow-400" :
    "text-red-400";

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="bg-gray-800 w-full max-w-md rounded-xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? "Log In" : "Create Account"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Email</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-700 outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-700 outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="••••••••"
            />
            {formData.password && (
              <p className={`text-sm mt-1 ${strengthColor}`}>
                Strength: {strength}
              </p>
            )}
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-purple-500 hover:bg-purple-600 py-3 rounded-lg font-semibold"
          >
            {isLogin ? "Log In" : "Sign Up"}
          </button>
        </form>

        <div className="my-6 flex items-center gap-2">
          <div className="flex-1 h-px bg-gray-600" />
          <span className="text-gray-400 text-sm">or</span>
          <div className="flex-1 h-px bg-gray-600" />
        </div>

        <div className="space-y-3">
          <button className="w-full bg-white text-gray-900 py-2 rounded-lg font-medium">
            Continue with Google
          </button>
          <button className="w-full bg-blue-600 py-2 rounded-lg font-medium">
            Continue with Facebook
          </button>
        </div>

        <p className="text-center text-gray-400 text-sm mt-6">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-purple-400 hover:underline"
          >
            {isLogin ? "Sign up" : "Log in"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default AuthForm;