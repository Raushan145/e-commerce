const GlobalLoader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#fffdf8]">
      <div className="text-center">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-[#293b25]" />

        <p className="mt-4 text-xs tracking-[0.2em] text-[#293b25]">
          LOADING...
        </p>
      </div>
    </div>
  );
};

export default GlobalLoader;