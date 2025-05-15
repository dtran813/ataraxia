import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Clock, Image, BarChart3 } from "lucide-react";

export default function Home() {
  return (
    <MainLayout>
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
                Focus better. <br />
                <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
                  Achieve more.
                </span>
              </h1>
              <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 max-w-md">
                Ataraxia helps you create the perfect environment for deep work
                and healthy breaks, boosting your productivity and wellbeing.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link href="/signup">
                  <Button size="lg">Get Started Free</Button>
                </Link>
                <Link href="/how-it-works">
                  <Button size="lg" variant="outline">
                    How It Works
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative h-64 sm:h-80 lg:h-96 rounded-lg overflow-hidden shadow-xl">
              {/* Placeholder for hero image - will be replaced with an actual image later */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-300 to-secondary-500 opacity-20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  [Application Preview]
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50 dark:bg-dark-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Key Features
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Everything you need to create the perfect focus environment
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white dark:bg-dark-200 rounded-lg p-6 shadow-sm">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Productivity Timer
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Customizable Pomodoro-style timer to structure your work
                sessions and breaks for optimal productivity.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white dark:bg-dark-200 rounded-lg p-6 shadow-sm">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-4">
                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                <Image className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Focus Environments
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Beautiful visual backgrounds paired with ambient audio to create
                the perfect atmosphere for deep work.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white dark:bg-dark-200 rounded-lg p-6 shadow-sm">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Analytics Dashboard
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Track your productivity habits and focus trends with detailed
                analytics and custom reports.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Ready to improve your focus and productivity?
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Join thousands of professionals who use Ataraxia to enhance their
              work experience.
            </p>
            <div className="mt-8">
              <Link href="/signup">
                <Button size="lg">Get Started Free</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
