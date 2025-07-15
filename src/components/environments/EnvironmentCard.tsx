import Image from "next/image";
import { cn } from "@/lib/utils";
import { Environment } from "@/types";
import {
  BadgeX,
  Palette,
  Star,
  Volume2,
  VolumeX,
  Tag,
  MoreVertical,
} from "lucide-react";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { DropdownMenu, DropdownMenuItem } from "@/components/ui/DropdownMenu";

interface EnvironmentCardProps {
  environment: Environment;
  onSelect: (environment: Environment) => void;
}

export function EnvironmentCard({
  environment,
  onSelect,
}: EnvironmentCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isSystemEnvironment = environment.createdBy === "system";

  return (
    <div
      className="group relative h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card className="cursor-pointer overflow-hidden transition-all hover:border-primary-500 dark:hover:border-primary-400 hover:shadow-lg h-full flex flex-col">
        <div
          className="w-full flex flex-col flex-1"
          onClick={() => onSelect(environment)}
        >
          {/* Environment Image/Background */}
          <div className="w-full aspect-video overflow-hidden relative border-b border-gray-200 dark:border-gray-700">
            {environment.backgroundType === "image" ? (
              <div className="relative w-full h-full bg-gray-200 dark:bg-gray-700">
                {/* Fallback gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-primary-300 dark:from-primary-900 dark:to-primary-700 flex flex-col items-center justify-center">
                  <BadgeX className="w-12 h-12 text-primary-600 dark:text-primary-400 opacity-50" />
                  <p className="text-sm text-primary-100">
                    Failed to load image
                  </p>
                </div>
                {/* Actual image */}
                <Image
                  src={environment.background}
                  alt={environment.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    // Fallback to placeholder if image fails to load
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
            ) : (
              <div
                className="h-full w-full flex items-center justify-center"
                style={{ backgroundColor: environment.background }}
              >
                <Palette className="w-12 h-12 text-primary-300 dark:text-primary-600" />
              </div>
            )}

            {/* Featured Badge */}
            {environment.isFeatured && (
              <div className="absolute top-3 left-3">
                <div className="flex items-center gap-1 bg-yellow-500/90 text-white px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                  <Star className="w-3 h-3" />
                  Featured
                </div>
              </div>
            )}

            {/* Audio Track Count */}
            <div className="absolute bottom-3 left-3">
              <div className="flex items-center gap-1 bg-black/60 text-white px-2 py-1 rounded-full text-xs backdrop-blur-sm">
                {environment.audioTracks.length > 0 ? (
                  <Volume2 className="w-3 h-3" />
                ) : (
                  <VolumeX className="w-3 h-3" />
                )}
                {`${environment.audioTracks.length} ${
                  environment.audioTracks.length === 1 ? "track" : "tracks"
                }`}
              </div>
            </div>
          </div>

          {/* Environment Info */}
          <CardContent className="p-4 flex-1 flex flex-col justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-1">
              {environment.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
              {environment.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1 mt-auto">
              {environment.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full"
                >
                  <Tag className="w-2.5 h-2.5" />
                  {tag}
                </span>
              ))}
              {environment.tags.length > 3 && (
                <span className="text-xs text-gray-500 dark:text-gray-400 px-2 py-1">
                  +{environment.tags.length - 3} more
                </span>
              )}
            </div>
          </CardContent>
        </div>

        {/* Options Menu Button - Only show for user environments */}
        {!isSystemEnvironment && (
          <div className="absolute right-2 top-2">
            <DropdownMenu
              trigger={
                <span
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white cursor-pointer backdrop-blur-sm transition-all",
                    isHovered ? "opacity-100" : "opacity-0",
                    "hover:bg-black/70"
                  )}
                >
                  <MoreVertical className="h-4 w-4" />
                </span>
              }
            >
              <DropdownMenuItem onClick={() => console.log("Edit environment")}>
                Edit Environment
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => console.log("Duplicate environment")}
              >
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => console.log("Delete environment")}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenu>
          </div>
        )}
      </Card>
    </div>
  );
}
