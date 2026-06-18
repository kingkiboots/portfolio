import { ProjectDetailHeader } from "@/widgets/header";
import { ProjectDetailNavBar } from "@/widgets/project-detail-nav-bar";

export default function ProjectDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ProjectDetailHeader />
      {children}
      <ProjectDetailNavBar />
    </>
  );
}
