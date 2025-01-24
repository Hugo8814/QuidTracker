function LoginPage() {
  return (
    <div className="shadow-xl flex justify-center items-center p-5 h-screen bg-[#919190] max-1100:flex-col max-1100:p-0  ">
      <a
        href="/connect"
        className="bg-blue-500 text-2xl hover:bg-gray-700 text-white font-bold py-6 px-4 rounded-xl focus:outline-none focus:shadow-outline   max-380:text-xl"
      >
        Login
      </a>
    </div>
  );
}

export default LoginPage;
