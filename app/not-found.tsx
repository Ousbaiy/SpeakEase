import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="fixed inset-0 w-full h-full flex flex-col items-center justify-center text-center p-5">
      <h2 className='font-extrabold text-transparent text-8xl bg-clip-text mb-4 bg-gradient-to-r from-[#7775D6] to-[#E935C1]'>Oops!</h2>
      <p className="text-3xl font-bold mb-4">Page Not Found</p>
      <p className="text-gray-400 max-w-[600px]">The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
      <Link
        href="/"
        className="capitalize rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white dark:text-white shadow-sm hover:bg-indigo-500 focus-visible:focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-4"
      >
        go to home
      </Link>
    </div>
  );
}
