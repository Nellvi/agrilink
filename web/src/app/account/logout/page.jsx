import useAuth from "@/utils/useAuth";

function MainComponent() {
  const { signOut } = useAuth();
  const handleSignOut = async () => {
    await signOut({
      callbackUrl: "/",
      redirect: true,
    });
  };
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl border border-gray-100 text-center">
        <h1 className="mb-8 text-2xl font-bold text-gray-800">Sign Out</h1>
        <p className="text-gray-500 mb-8">
          Are you sure you want to sign out of AgriLink?
        </p>
        <button
          onClick={handleSignOut}
          className="w-full rounded-xl bg-red-600 px-4 py-3 font-bold text-white transition-all hover:bg-red-700 shadow-lg"
        >
          Sign Out
        </button>
        <a
          href="/"
          className="block mt-4 text-sm text-gray-500 hover:underline"
        >
          Return to Dashboard
        </a>
      </div>
    </div>
  );
}

export default MainComponent;
