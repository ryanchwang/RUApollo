export default function MainContent({ selectedCourse, courses }) {
  return (
    <main className="col-span-7 bg-white shadow p-6 rounded-2xl">
      <h1 className="text-2xl font-bold mb-4">
        {courses.find((c) => c.code === selectedCourse)?.name}
      </h1>
    </main>
  );
}
