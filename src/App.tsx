
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import Bimestre1 from "./pages/Bimestre1";
import Bimestre2 from "./pages/Bimestre2";
import Bimestre3 from "./pages/Bimestre3";
import Bimestre4 from "./pages/Bimestre4";
import Configuracoes from "./pages/Configuracoes";
import Boletim from "./pages/Boletim";
import Instrucoes from "./pages/Instrucoes";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/1-bimestre" element={<Bimestre1 />} />
            <Route path="/2-bimestre" element={<Bimestre2 />} />
            <Route path="/3-bimestre" element={<Bimestre3 />} />
            <Route path="/4-bimestre" element={<Bimestre4 />} />
            <Route path="/configuracoes" element={<Configuracoes />} />
            <Route path="/boletim" element={<Boletim />} />
            <Route path="/instrucoes" element={<Instrucoes />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
