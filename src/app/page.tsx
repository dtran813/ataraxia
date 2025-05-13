import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
      <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
        Ataraxia
      </h1>
      <p className="text-xl max-w-2xl mb-8 text-gray-700 dark:text-gray-300">
        Enhance productivity and wellbeing through customizable focus
        environments and smart breaks
      </p>
      <div className="flex gap-4">
        <Link
          href="/login"
          className="px-6 py-3 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors"
        >
          Get Started
        </Link>
        <Link
          href="/about"
          className="px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-dark-100 transition-colors"
        >
          Learn More
        </Link>
      </div>
    </main>
  );
}
