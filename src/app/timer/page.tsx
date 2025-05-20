import { MainLayout } from "@/components/layout/MainLayout";
import { FocusTimer } from "@/components/focus-timer/FocusTimer";

export default function TimerPage() {
  return (
    <MainLayout>
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-12">Focus Timer</h1>
          <FocusTimer />
        </div>
      </div>
    </MainLayout>
  );
}
