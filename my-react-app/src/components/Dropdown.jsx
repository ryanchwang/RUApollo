import React, { useState, useEffect, useRef } from "react";

const Dropdown = ({ id, options, text, onSelect, setActiveDropdown }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    const isCurrentlyOpen = isOpen;
    setIsOpen(!isCurrentlyOpen);
    setActiveDropdown(isCurrentlyOpen ? null : id);
  };

  const handleSelect = (value) => {
    setSelectedValue(value);
    setIsOpen(false);
    if (setActiveDropdown) {
      setActiveDropdown(null);
    }
    if (onSelect) {
      onSelect(value); // Fix: Ensure onSelect is defined before calling
    }
    console.log(`Selected value from ${id}: ${value}`);
  };

  const dropdownHeight = options.length * 60;

  return (
    <div
      className="dropdown-container"
      ref={dropdownRef}
      style={{
        width: "200px",
        marginBottom: isOpen ? `${dropdownHeight + 40}px` : "20px", // Push content below down
        transition: "margin-bottom 0.3s ease",
        position: "relative",
      }}
    >
      <button
        onClick={toggleDropdown}
        style={{
          padding: "12px 16px",
          width: "100%",
          fontSize: "16px",
          borderRadius: "8px",
          border: "1px solid #ddd",
          backgroundColor: "white",
          textAlign: "left",
          cursor: "pointer",
          position: "relative",
          zIndex: 2,
        }}
      >
        {selectedValue ? `Selected: ${selectedValue}` : text}
      </button>
      <div
        className={`dropdown-content ${isOpen ? "open" : ""}`}
        style={{
          position: "absolute",
          width: "100%", // Ensures dropdown is the same width as the button
          border: "1px solid #ccc",
          borderRadius: "8px",
          backgroundColor: "white",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
          transformOrigin: "top",
          maxHeight: isOpen ? `${dropdownHeight}px` : "0px",
          opacity: isOpen ? "1" : "0",
          transition: "max-height 0.4s ease, opacity 0.3s ease",
          wordWrap: "break-word",
          whiteSpace: "normal",
          padding: "5px",
        }}
      >
        {options.map((option, index) => (
          <a
            key={index}
            href="#"
            onClick={() => handleSelect(option.value)}
            style={{
              padding: "12px",
              display: "block",
              color: "black",
              textDecoration: "none",
              transition: "background-color 0.2s ease",
              wordBreak: "break-word",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#f0f0f0")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "white")}
          >
            {option.label}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;