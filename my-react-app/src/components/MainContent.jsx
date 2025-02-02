import { Tabs, Tab } from './Tabs';

export default function MainContent({ selectedCourse, courses }) {
  return (
    <main className="col-span-7 bg-white shadow p-6 rounded-2xl">
      <h1 className="text-2xl font-bold mb-4">
        {courses.find((c) => c.code === selectedCourse)?.name}
      </h1>
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="syllabus">Syllabus</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <p>Overview content for {selectedCourse}.</p>
        </TabsContent>
        <TabsContent value="syllabus">
          <p>Syllabus details for {selectedCourse}.</p>
        </TabsContent>
        <TabsContent value="resources">
          <p>Resource links and study materials.</p>
        </TabsContent>
      </Tabs>
    </main>
  );
}
