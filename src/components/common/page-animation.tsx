import { cn } from "@/lib/utils"
import {motion,AnimatePresence, MotionProps, Transition, Variants,} from "framer-motion"

interface AnimationWrapperProps extends MotionProps {
  children: React.ReactNode;
  initial?: Variants | object; // Variants or a plain object for initial state
  animate?: Variants | object; // Variants or a plain object for animate state
  transition?: Transition; // Transition type from Framer Motion
  keyValue?: string | number;
  className?: string;
}

const AnimationWrapper: React.FC<AnimationWrapperProps> = ({
  children,
  initial = { opacity: 0 },
  animate = { opacity: 1 },
  transition = {duration:1},
  keyValue,
  className,
}) => {
  return (
    <motion.div
      initial={initial}
      animate={animate}
      transition={transition}
      key={keyValue}
      className={cn("", className)}
    >
      {children}
    </motion.div>
  );
};


export default AnimationWrapper