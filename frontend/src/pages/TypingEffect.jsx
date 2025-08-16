import React, { useState, useEffect } from 'react';

const InfiniteTypingEffect = () => {
  const [typedText, setTypedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  const fullText = ' Mohit Srivastava';
  const typingSpeed = 100; // milliseconds
  const deletingSpeed = 50; // milliseconds
  const pauseTime = 1500; // milliseconds to pause after typing a word

  useEffect(() => {
    let timer;
    let charIndex = typedText.length;

    const handleTyping = () => {
      if (!isDeleting) {
        // Typing forward
        if (charIndex < fullText.length) {
          setTypedText(fullText.substring(0, charIndex + 1));
          charIndex++;
          timer = setTimeout(handleTyping, typingSpeed);
        } else {
          // Finished typing, start deleting after a pause
          timer = setTimeout(() => {
            setIsDeleting(true);
            handleTyping();
          }, pauseTime);
        }
      } else {
        // Deleting
        if (charIndex > 0) {
          setTypedText(fullText.substring(0, charIndex - 1));
          charIndex--;
          timer = setTimeout(handleTyping, deletingSpeed);
        } else {
          // Finished deleting, reset and start typing again
          setIsDeleting(false);
          timer = setTimeout(handleTyping, typingSpeed);
        }
      }
    };

    // Initial call to start the effect
    timer = setTimeout(handleTyping, typingSpeed);

    // Timer for the blinking cursor
    const cursorInterval = setInterval(() => {
      setShowCursor(prevShow => !prevShow);
    }, 500);

    // Clean up timers on component unmount
    return () => {
      clearTimeout(timer);
      clearInterval(cursorInterval);
    };
  }, [typedText, isDeleting]);

  return (
    <div className="flex flex-col items-center md:items-start">
      
      <h1 className="text-gray-900 font-semibold text-3xl sm:text-4xl md:text-5xl max-w-2xl leading-tight">
        Hello I Am 
        <span className="text-indigo-600">
          {typedText}
          <span className={`inline-block border-r-2 border-indigo-600 ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'}`}>&nbsp;</span>
        </span>
      </h1>
      <p className="mt-4 text-gray-600 max-w-md text-sm sm:text-base leading-relaxed">
        Aspiring Web Developer and MCA Student
      </p>
    </div>
  );
};

export default InfiniteTypingEffect;