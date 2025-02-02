import Dropdown from "./Dropdown";

export default function LeftBar() {
  
     const options = [
      { value: "1", label: "Option 1" },
      { value: "2", label: "Option 2" },
      { value: "3", label: "Option 3" },
    ];

  return (
    <div>
      <h1>React Dropdown Example</h1>
      <Dropdown id={1} options={options} />
      <Dropdown id={2} options={options} />
      <Dropdown id={3} options={options} />
    </div>
  );
};