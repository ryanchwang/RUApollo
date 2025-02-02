import React, { useState, useEffect, useRef } from "react";

const Dropdown = ({ id, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false); // Close dropdown if clicked outside
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (value, label) => {
    setSelectedValue(value);
    setIsOpen(false); // Close dropdown when an option is selected
    console.log(`Selected value from ${id}: ${value}`);
  };

  return (
    <div className="dropdown-container" style={{ marginBottom: "20px" }} ref={dropdownRef}>
      <div className="dropdown" style={{ position: "relative", width: "200px" }}>
        <button
          onClick={toggleDropdown}
          style={{
            padding: "10px",
            width: "100%",
            fontSize: "16px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            backgroundColor: "white",
            textAlign: "left",
          }}
        >
          {selectedValue ? `Selected: ${selectedValue}` : `Dropdown ${id}`}
        </button>
        {isOpen && (
          <div
            className="dropdown-content"
            style={{
              position: "absolute",
              backgroundColor: "white",
              width: "100%",
              border: "1px solid #ccc",
              borderRadius: "5px",
              zIndex: "1",
            }}
          >
            {options.map((option, index) => (
              <a
                key={index}
                href="#"
                onClick={() => handleSelect(option.value, option.label)}
                style={{
                  padding: "10px",
                  display: "block",
                  color: "black",
                  textDecoration: "none",
                }}
              >
                {option.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
