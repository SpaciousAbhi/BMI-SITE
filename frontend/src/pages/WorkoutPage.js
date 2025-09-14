import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useTheme } from '../contexts/ThemeContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WorkoutRecommendations from '../components/WorkoutRecommendations';
import { generateBMIReport } from '../utils/pdfGenerator';
import { useToast } from '../hooks/use-toast';

const WorkoutPage = () => {
  const { theme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const bmiData = location.state;

  // If no BMI data is available, redirect to home
  if (!bmiData) {
    navigate('/');
    return null;
  }

  const handleDownloadPDF = async () => {
    try {
      toast({
        title: "Generating PDF...",
        description: "Please wait while we create your personalized report.",
      });

      const fileName = await generateBMIReport(bmiData);
      
      toast({
        title: "Success!",
        description: `Your BMI report has been downloaded as ${fileName}`,
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: "Error",
        description: "Failed to generate PDF report. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900' 
        : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
    }`}>
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Back Navigation */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className={`flex items-center gap-2 ${
              theme === 'dark' ? 'text-white hover:bg-white/10' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Results
          </Button>
        </div>

        {/* BMI Summary Card */}
        <div className={`mb-8 p-6 rounded-lg backdrop-blur-md border-0 shadow-lg ${
          theme === 'dark' ? 'bg-white/10' : 'bg-white/70'
        }`}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {bmiData.bmi}
              </div>
              <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                BMI Score
              </div>
            </div>
            <div>
              <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {bmiData.bodyFat}%
              </div>
              <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Body Fat
              </div>
            </div>
            <div>
              <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {bmiData.age}
              </div>
              <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Age
              </div>
            </div>
            <div>
              <div className={`text-2xl font-bold capitalize ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {bmiData.gender}
              </div>
              <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Gender
              </div>
            </div>
          </div>
        </div>

        {/* Workout Recommendations */}
        <WorkoutRecommendations 
          bmi={bmiData.bmi}
          age={bmiData.age}
          gender={bmiData.gender}
          onDownloadPDF={handleDownloadPDF}
        />
      </main>

      <Footer />
    </div>
  );
};

export default WorkoutPage;