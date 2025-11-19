import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MoveRight, PhoneCall } from "lucide-react";
import { Button } from "./button";

function AnimatedHero({ 
  titles = ["amazing", "new", "wonderful", "beautiful", "smart"],
  mainTitle = "This is something",
  description = "Managing a small business today is already tough.",
  primaryButtonText = "Sign up here",
  secondaryButtonText = "Jump on a call",
  onPrimaryClick,
  onSecondaryClick,
  showTopButton = true,
  topButtonText = "Read our launch article"
}) {
  const [titleNumber, setTitleNumber] = useState(0);
  const memoizedTitles = useMemo(() => titles, [titles]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === memoizedTitles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, memoizedTitles]);

  return (
    <div className="w-full">
      <div className="container mx-auto">
        <div className="flex gap-8 py-20 lg:py-40 items-center justify-center flex-col">
          {showTopButton && (
            <div>
              <Button variant="secondary" size="sm" className="gap-4">
                {topButtonText} <MoveRight className="w-4 h-4" />
              </Button>
            </div>
          )}
          
          <div className="flex gap-4 flex-col">
            <h1 className="text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-regular">
              <span className="text-white">{mainTitle}</span>
              <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1">
                &nbsp;
                {memoizedTitles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
                    initial={{ opacity: 0, y: "-100" }}
                    transition={{ type: "spring", stiffness: 50 }}
                    animate={
                      titleNumber === index
                        ? {
                            y: 0,
                            opacity: 1,
                          }
                        : {
                            y: titleNumber > index ? -150 : 150,
                            opacity: 0,
                          }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
            </h1>
            
            <p className="text-lg md:text-xl leading-relaxed tracking-tight text-gray-300 max-w-2xl text-center">
              {description}
            </p>
          </div>
          
          <div className="flex flex-row gap-3">
            <Button 
              size="lg" 
              className="gap-4" 
              variant="outline"
              onClick={onSecondaryClick}
            >
              {secondaryButtonText} <PhoneCall className="w-4 h-4" />
            </Button>
            <Button 
              size="lg" 
              className="gap-4"
              onClick={onPrimaryClick}
            >
              {primaryButtonText} <MoveRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export { AnimatedHero };
