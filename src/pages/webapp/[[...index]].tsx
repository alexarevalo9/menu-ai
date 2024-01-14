import MainContent from "@/components/MainContent/MainContent";
import MainLayout from "@/layouts/main/MainLayout";

WebApp.getLayout = function getLayout(page: React.ReactNode) {
  return <MainLayout>{page}</MainLayout>;
};

export default function WebApp() {
  return <MainContent />;
}
