import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import TripDetails from "./pages/TripDetails";
import VehicleDetails from "./pages/VehicleDetails";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/vehicle/:type" element={<VehicleDetails />} />
          <Route path="/trips" element={<Index />} />
          <Route path="/trip/:id" element={<TripDetails />} />
          <Route path="/about" element={<Index />} />
          <Route path="/contact" element={<Index />} />
          <Route path="/login" element={<Index />} />
          <Route path="/register" element={<Index />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
