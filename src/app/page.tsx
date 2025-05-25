// src/app/page.tsx
import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { FadeIn, SlideIn } from "@/components/ui/Animation";
import {
  Timer,
  Mountain,
  BarChart3,
  Play,
  Headphones,
  Zap,
  Shield,
  Smartphone,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Ataraxia - Focus Better, Achieve More",
  description:
    "Create the perfect environment for deep work with customizable focus environments, productivity timers, and ambient audio. Start focusing immediately - no signup required.",
};

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20" />

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-blue-200/30 dark:bg-blue-500/10 blur-3xl animate-pulse" />
          <div
            className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-purple-200/30 dark:bg-purple-500/10 blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          />
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Hero Content */}
            <div className="text-center lg:text-left">
              <FadeIn duration={0.8}>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="text-gray-900 dark:text-white">
                    Focus better.
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Achieve more.
                  </span>
                </h1>
              </FadeIn>

              <FadeIn duration={0.8} delay={0.2}>
                <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto lg:mx-0">
                  Ataraxia helps you create the perfect environment for deep
                  work with customizable focus environments, productivity
                  timers, and ambient audio that boost your concentration.
                </p>
              </FadeIn>

              <FadeIn duration={0.8} delay={0.4}>
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link href="/focus">
                    <Button size="lg" className="w-full sm:w-auto group">
                      <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                      Get Started Free
                    </Button>
                  </Link>

                  <Link href="#features">
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full sm:w-auto"
                    >
                      How It Works
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </FadeIn>

              <FadeIn duration={0.8} delay={0.6}>
                <div className="mt-8 flex items-center justify-center lg:justify-start space-x-6 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    No signup required
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    100% free
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    Works offline
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Hero Visual */}
            <div className="relative">
              <SlideIn direction="right" duration={1} delay={0.3}>
                <div className="relative">
                  {/* Mock app interface */}
                  <Card className="p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-2xl">
                    <div className="text-center space-y-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Focus Session
                      </h3>

                      {/* Mock timer */}
                      <div className="relative">
                        <div className="w-32 h-32 mx-auto rounded-full border-4 border-blue-200 dark:border-blue-800 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                              25:00
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              Focus Time
                            </div>
                          </div>
                        </div>
                        {/* Progress circle overlay */}
                        <div className="absolute inset-0 w-32 h-32 mx-auto">
                          <svg
                            className="w-full h-full -rotate-90"
                            viewBox="0 0 128 128"
                          >
                            <circle
                              cx="64"
                              cy="64"
                              r="56"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="4"
                              strokeLinecap="round"
                              strokeDasharray="351.86"
                              strokeDashoffset="87.96"
                              className="text-blue-500 dark:text-blue-400"
                            />
                          </svg>
                        </div>
                      </div>

                      {/* Status indicator instead of button */}
                      <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span>Ready to start</span>
                      </div>
                    </div>
                  </Card>

                  {/* Floating elements */}
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                    <Headphones className="w-8 h-8 text-white" />
                  </div>

                  <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                    <Mountain className="w-6 h-6 text-white" />
                  </div>
                </div>
              </SlideIn>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn duration={0.8}>
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Key Features
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Everything you need to create the perfect focus environment
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <SlideIn direction="up" delay={0.1}>
              <Card className="p-8 text-center group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Timer className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Productivity Timer
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Customizable Pomodoro-style timer to structure your work
                  sessions and breaks for optimal productivity.
                </p>
              </Card>
            </SlideIn>

            {/* Feature 2 */}
            <SlideIn direction="up" delay={0.2}>
              <Card className="p-8 text-center group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Mountain className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Focus Environments
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Beautiful visual backgrounds paired with ambient audio to
                  create the perfect atmosphere for deep work.
                </p>
              </Card>
            </SlideIn>

            {/* Feature 3 */}
            <SlideIn direction="up" delay={0.3}>
              <Card className="p-8 text-center group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Progress Tracking
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Track your productivity habits and focus trends with detailed
                  analytics and insights.
                </p>
              </Card>
            </SlideIn>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Benefits Content */}
            <div>
              <FadeIn duration={0.8}>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-8">
                  Why Choose Ataraxia?
                </h2>
              </FadeIn>

              <div className="space-y-6">
                <SlideIn direction="left" delay={0.1}>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Zap className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        Instant Access
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Start focusing immediately without creating an account.
                        Your preferences are saved locally.
                      </p>
                    </div>
                  </div>
                </SlideIn>

                <SlideIn direction="left" delay={0.2}>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Shield className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        Privacy First
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Your data stays on your device. No tracking, no
                        analytics, just pure focus.
                      </p>
                    </div>
                  </div>
                </SlideIn>

                <SlideIn direction="left" delay={0.3}>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Smartphone className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        Works Everywhere
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Responsive design that works beautifully on desktop,
                        tablet, and mobile devices.
                      </p>
                    </div>
                  </div>
                </SlideIn>
              </div>
            </div>

            {/* Benefits Visual */}
            <div className="relative">
              <SlideIn direction="right" duration={1} delay={0.4}>
                <div className="relative">
                  {/* Main card */}
                  <Card className="p-6 bg-white dark:bg-gray-900 shadow-xl">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        Today&apos;s Progress
                      </h4>
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Focus Sessions
                        </span>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          6 completed
                        </span>
                      </div>

                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full w-3/4 transition-all duration-1000" />
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">
                          Total: 2h 30m
                        </span>
                        <span className="text-green-600 dark:text-green-400">
                          +15% vs yesterday
                        </span>
                      </div>
                    </div>
                  </Card>

                  {/* Floating notification */}
                  <div className="absolute -top-4 -right-4 bg-green-500 text-white px-3 py-2 rounded-lg text-sm font-medium shadow-lg animate-bounce">
                    🎉 Goal achieved!
                  </div>
                </div>
              </SlideIn>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn duration={0.8}>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to improve your focus and productivity?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who use Ataraxia to enhance their
              work experience.
            </p>

            <Link href="/focus">
              <Button
                size="lg"
                variant="outline"
                className="bg-white text-blue-600 hover:bg-blue-50 border-white"
              >
                <Play className="w-5 h-5 mr-2" />
                Get Started Free
              </Button>
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
