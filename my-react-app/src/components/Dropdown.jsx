import React, { useState, useEffect, useRef } from "react";

const Dropdown = ({ id, options, activeDropdown, setActiveDropdown }) => {
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
    setActiveDropdown(null);
    console.log(`Selected value from ${id}: ${value}`);
  };

  return (
    <div
      className="dropdown-container"
      ref={dropdownRef}
      style={{
        width: "200px",
        marginBottom: isOpen ? "150px" : "20px", // Push content below down
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
        {selectedValue ? `Selected: ${selectedValue}` : `Dropdown ${id}`}
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
          maxHeight: isOpen ? "200px" : "0px",
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

const DropdownWrapper = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const options = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <Dropdown
        id="dropdown1"
        options={options}
        activeDropdown={activeDropdown}
        setActiveDropdown={setActiveDropdown}
      />
      <Dropdown
        id="dropdown2"
        options={options}
        activeDropdown={activeDropdown}
        setActiveDropdown={setActiveDropdown}
      />
      <div
        style={{
          padding: "20px",
          backgroundColor: "#f8f8f8",
          transition: "margin-top 0.3s ease",
        }}
      >
        This content moves down when dropdown opens!
      </div>
    </div>
  );
};

export default DropdownWrapper;