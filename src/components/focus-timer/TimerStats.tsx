"use client";

import { useTimerStore } from "@/store/useTimerStore";
import { formatTimeVerbose } from "@/lib/utils/time";
import { Card, CardContent } from "@/components/ui/Card";
import { Clock, BarChart2 } from "lucide-react";

export function TimerStats() {
  const { completedSessions, totalFocusTime, totalBreakTime } = useTimerStore();

  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardContent className="p-6 flex items-center">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mr-4">
            <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Completed Sessions
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {completedSessions}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6 flex items-center">
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mr-4">
            <BarChart2 className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Total Focus Time
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {formatTimeVerbose(totalFocusTime)}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6 flex items-center">
          <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mr-4">
            <BarChart2 className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Total Break Time
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {formatTimeVerbose(totalBreakTime)}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
