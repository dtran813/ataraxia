"use client";

import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FadeInProps {
  children: ReactNode;
  duration?: number;
  delay?: number;
  className?: string;
}

export function FadeIn({
  children,
  duration = 0.5,
  delay = 0,
  className,
}: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface SlideInProps {
  children: ReactNode;
  direction?: "left" | "right" | "up" | "down";
  duration?: number;
  delay?: number;
  className?: string;
}

export function SlideIn({
  children,
  direction = "up",
  duration = 0.5,
  delay = 0,
  className,
}: SlideInProps) {
  const directionVariants = {
    left: {
      initial: { x: -20, opacity: 0 },
      animate: { x: 0, opacity: 1 },
      exit: { x: -20, opacity: 0 },
    },
    right: {
      initial: { x: 20, opacity: 0 },
      animate: { x: 0, opacity: 1 },
      exit: { x: 20, opacity: 0 },
    },
    up: {
      initial: { y: 20, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      exit: { y: 20, opacity: 0 },
    },
    down: {
      initial: { y: -20, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      exit: { y: -20, opacity: 0 },
    },
  };

  const variant = directionVariants[direction];

  return (
    <motion.div
      initial={variant.initial}
      animate={variant.animate}
      exit={variant.exit}
      transition={{ duration, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface AnimatedListProps {
  children: ReactNode[];
  staggerDelay?: number;
  duration?: number;
  className?: string;
  itemClassName?: string;
}

export function AnimatedList({
  children,
  staggerDelay = 0.1,
  duration = 0.5,
  className,
  itemClassName,
}: AnimatedListProps) {
  return (
    <div className={className}>
      <AnimatePresence>
        {children.map((child, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration, delay: index * staggerDelay }}
            className={itemClassName}
          >
            {child}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
