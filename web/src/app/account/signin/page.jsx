import { useState } from "react";
import useAuth from "@/utils/useAuth";

function MainComponent() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signInWithCredentials } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!email || !password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      await signInWithCredentials({
        email,
        password,
        callbackUrl: "/",
        redirect: true,
      });
    } catch (err) {
      const errorMessages = {
        CredentialsSignin: "Incorrect email or password. Try again.",
      };
      setError(
        errorMessages[err.message] || "Something went wrong. Please try again.",
      );
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-50 p-4">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl border border-gray-100"
      >
        <div className="flex items-center gap-2 mb-8 justify-center">
          <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-2xl">A</span>
          </div>
          <span className="text-2xl font-bold text-gray-800">AgriLink</span>
        </div>

        <h1 className="mb-8 text-center text-xl font-bold text-gray-800">
          Welcome Back
        </h1>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500 transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500 transition-all"
              placeholder="Enter your password"
            />
          </div>

          {error && (
            <div className="text-sm text-red-500 bg-red-50 p-3 rounded-lg border border-red-100">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-green-600 px-4 py-3 font-bold text-white transition-all hover:bg-green-700 shadow-lg disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <a
              href="/account/signup"
              className="text-green-600 font-bold hover:underline"
            >
              Sign up
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default MainComponent;
