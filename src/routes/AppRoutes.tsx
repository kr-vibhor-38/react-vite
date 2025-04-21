import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import FeedBackPage from "../pages/FeedbackPage";
import ShowComponent from "../pages/ShowComponent";
import Chart from "../Charts/Chart";
import DonutChart from "../Charts/DonutChart";
import AnalyticsComponent from "../pages/AnalyticsComponent";
import LidkarSurvey from "../pages/LidkarSurvey";
import ViewRating from "../pages/ViewRating";
import PieChartWithGradient from "../Charts/PieWithGradient";
import PdfComponent from "../PDF_testing/download";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/feedback" element={<FeedBackPage/>}/>
      <Route path="/list" element={<ShowComponent/>}/>
      <Route path="/chart" element={<Chart/>}/>
      <Route path="/donut" element={<DonutChart/>}/>
      <Route path="/analytics" element={<AnalyticsComponent/>}/>
      <Route path="/lidkar_s" element={<LidkarSurvey/>}/>
      <Route path="/review" element={<ViewRating/>}/>
      <Route path="/pie_w_grad" element={<PieChartWithGradient/>}/>
      <Route path="/download" element={<PdfComponent/>}/>
    </Routes>
  );
};
export default AppRoutes;
