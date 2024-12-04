import React, { useEffect, useRef } from 'react'

function useInputFocus() {
  // Refs for input fields
  const titleInputRef = useRef(null);
  const descriptionInputRef = useRef(null);
  const dueDateInputRef = useRef(null);

  // Handle Enter key navigation
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission on Enter
      if (e.target.name === "title" && descriptionInputRef.current) {
        descriptionInputRef.current.focus();
      } else if (e.target.name === "description" && dueDateInputRef.current) {
        dueDateInputRef.current.focus();
      }
    }
  };

  // Focus on title input when modal opens
  useEffect(() => {
    if (titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, []);

  return{
    titleInputRef,
    descriptionInputRef,
    dueDateInputRef,
    handleKeyDown
  }
}

export default useInputFocus