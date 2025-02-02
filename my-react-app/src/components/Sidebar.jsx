import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

export default function Sidebar({ selectedCourse, setSelectedCourse, courses }) {
  return (
    <aside className="col-span-2 bg-gray-100 p-4 rounded-2xl">
      <h2 className="text-lg font-semibold mb-4">Select Course</h2>
      <Select value={selectedCourse} onValueChange={setSelectedCourse}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a course" />
        </SelectTrigger>
        <SelectContent>
          {courses.map((course) => (
            <SelectItem key={course.code} value={course.code}>
              {course.code} - {course.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </aside>
  );
}
