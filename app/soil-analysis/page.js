'use client';

import { useState, useEffect } from 'react';
import { soilDataService } from '../../backend/soil-data-service';
import { 
  BeakerIcon, 
  PlusIcon, 
  ChartBarIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';

export default function SoilAnalysisPage() {
  const [formData, setFormData] = useState({
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    ph: '',
    moisture: '',
    crop_type: '',
    location: ''
  });

  const [healthStatus, setHealthStatus] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [qualityScore, setQualityScore] = useState(0);
  const [recentData, setRecentData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch recent soil data
    soilDataService.getLatestSoilData(5)
      .then(setRecentData)
      .catch(console.error);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const analyzeHealth = (nitrogen, phosphorus, potassium, ph, moisture) => {
    let score = 0;
    let issues = [];
    let suggestions = [];

    // Nitrogen analysis
    if (nitrogen >= 15 && nitrogen <= 25) {
      score += 25;
      suggestions.push("Nitrogen levels are optimal for most crops");
    } else if (nitrogen < 15) {
      issues.push("Low nitrogen levels detected");
      suggestions.push("Consider nitrogen-rich fertilizers or organic compost");
    } else {
      issues.push("High nitrogen levels may cause excessive vegetative growth");
      suggestions.push("Reduce nitrogen application and monitor plant development");
    }

    // Phosphorus analysis
    if (phosphorus >= 12 && phosphorus <= 20) {
      score += 25;
      suggestions.push("Phosphorus levels support healthy root development");
    } else if (phosphorus < 12) {
      issues.push("Phosphorus deficiency may affect root growth");
      suggestions.push("Apply phosphorus-rich fertilizers like bone meal");
    } else {
      issues.push("Excess phosphorus can interfere with other nutrients");
      suggestions.push("Reduce phosphorus inputs and test soil regularly");
    }

    // Potassium analysis
    if (potassium >= 15 && potassium <= 22) {
      score += 25;
      suggestions.push("Potassium levels are excellent for disease resistance");
    } else if (potassium < 15) {
      issues.push("Low potassium affects plant immunity and fruit quality");
      suggestions.push("Apply potassium sulfate or wood ash");
    } else {
      issues.push("High potassium levels detected");
      suggestions.push("Monitor for nutrient imbalances");
    }

    // pH analysis
    if (ph >= 6.0 && ph <= 7.5) {
      score += 25;
      suggestions.push("Soil pH is optimal for nutrient availability");
    } else if (ph < 6.0) {
      issues.push("Acidic soil may limit nutrient uptake");
      suggestions.push("Consider lime application to raise pH");
    } else {
      issues.push("Alkaline soil may cause nutrient deficiencies");
      suggestions.push("Apply sulfur or organic matter to lower pH");
    }

    let status = '';
    if (score >= 85) {
      status = 'Excellent soil health! Your soil conditions are optimal for crop growth.';
    } else if (score >= 70) {
      status = 'Good soil health with minor adjustments needed.';
    } else if (score >= 50) {
      status = 'Moderate soil health. Several improvements recommended.';
    } else {
      status = 'Poor soil health. Immediate attention required.';
    }

    return { status, suggestions, score, issues };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const nitrogen = parseFloat(formData.nitrogen);
    const phosphorus = parseFloat(formData.phosphorus);
    const potassium = parseFloat(formData.potassium);
    const ph = parseFloat(formData.ph);
    const moisture = parseFloat(formData.moisture);

    const analysis = analyzeHealth(nitrogen, phosphorus, potassium, ph, moisture);
    
    setHealthStatus(analysis.status);
    setRecommendations(analysis.suggestions);
    setQualityScore(analysis.score);

    // Save to Firebase
    try {
      const soilData = {
        npk: {
          nitrogen,
          phosphorus,
          potassium
        },
        ph,
        moisture,
        crop_type: formData.crop_type,
        location: {
          region: formData.location
        },
        quality_score: analysis.score,
        recommendations: analysis.suggestions,
        sensor_id: `MANUAL_${Date.now()}`
      };

      await soilDataService.addSoilData(soilData);
      
      // Refresh recent data
      const updatedData = await soilDataService.getLatestSoilData(5);
      setRecentData(updatedData);
    } catch (error) {
      console.error('Error saving soil data:', error);
    }

    setLoading(false);
  };

  const getScoreColor = (score) => {
    if (score >= 85) return 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400';
    return 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400';
  };

  const getScoreIcon = (score) => {
    if (score >= 85) return CheckCircleIcon;
    if (score >= 70) return ExclamationTriangleIcon;
    return ExclamationTriangleIcon;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-earth-900 dark:via-earth-800 dark:to-primary-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <BeakerIcon className="w-8 h-8 text-primary-600 dark:text-primary-400 mr-3" />
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-earth-900 dark:text-earth-100">
              Soil Health Analysis
            </h1>
          </div>
          <p className="text-earth-600 dark:text-earth-400 text-lg">
            Analyze your soil's NPK levels, pH, and moisture content for optimal crop growth
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Analysis Form */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-earth-800 rounded-xl shadow-lg border border-earth-200 dark:border-earth-700 overflow-hidden">
              <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-6 text-white">
                <h2 className="text-2xl font-bold mb-2">Soil Analysis Form</h2>
                <p className="text-primary-100">Enter your soil parameters for comprehensive analysis</p>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* NPK Values */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-earth-700 dark:text-earth-300 mb-2">
                      Nitrogen (N) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        name="nitrogen"
                        value={formData.nitrogen}
                        onChange={handleChange}
                        required
                        step="0.1"
                        className="w-full px-4 py-3 border border-earth-300 dark:border-earth-600 rounded-lg bg-white dark:bg-earth-700 text-earth-900 dark:text-earth-100 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                        placeholder="e.g., 20.5"
                      />
                      <div className="absolute right-3 top-3 text-earth-500 dark:text-earth-400 text-sm">
                        mg/kg
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-earth-700 dark:text-earth-300 mb-2">
                      Phosphorus (P) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        name="phosphorus"
                        value={formData.phosphorus}
                        onChange={handleChange}
                        required
                        step="0.1"
                        className="w-full px-4 py-3 border border-earth-300 dark:border-earth-600 rounded-lg bg-white dark:bg-earth-700 text-earth-900 dark:text-earth-100 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                        placeholder="e.g., 15.2"
                      />
                      <div className="absolute right-3 top-3 text-earth-500 dark:text-earth-400 text-sm">
                        mg/kg
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-earth-700 dark:text-earth-300 mb-2">
                      Potassium (K) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        name="potassium"
                        value={formData.potassium}
                        onChange={handleChange}
                        required
                        step="0.1"
                        className="w-full px-4 py-3 border border-earth-300 dark:border-earth-600 rounded-lg bg-white dark:bg-earth-700 text-earth-900 dark:text-earth-100 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                        placeholder="e.g., 18.7"
                      />
                      <div className="absolute right-3 top-3 text-earth-500 dark:text-earth-400 text-sm">
                        mg/kg
                      </div>
                    </div>
                  </div>
                </div>

                {/* pH and Moisture */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-earth-700 dark:text-earth-300 mb-2">
                      pH Level <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="ph"
                      value={formData.ph}
                      onChange={handleChange}
                      required
                      step="0.1"
                      min="0"
                      max="14"
                      className="w-full px-4 py-3 border border-earth-300 dark:border-earth-600 rounded-lg bg-white dark:bg-earth-700 text-earth-900 dark:text-earth-100 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                      placeholder="e.g., 6.5"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-earth-700 dark:text-earth-300 mb-2">
                      Moisture Content <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        name="moisture"
                        value={formData.moisture}
                        onChange={handleChange}
                        required
                        step="0.1"
                        min="0"
                        max="100"
                        className="w-full px-4 py-3 border border-earth-300 dark:border-earth-600 rounded-lg bg-white dark:bg-earth-700 text-earth-900 dark:text-earth-100 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                        placeholder="e.g., 65.3"
                      />
                      <div className="absolute right-3 top-3 text-earth-500 dark:text-earth-400 text-sm">
                        %
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-earth-700 dark:text-earth-300 mb-2">
                      Crop Type
                    </label>
                    <select
                      name="crop_type"
                      value={formData.crop_type}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-earth-300 dark:border-earth-600 rounded-lg bg-white dark:bg-earth-700 text-earth-900 dark:text-earth-100 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                    >
                      <option value="">Select Crop Type</option>
                      <option value="Wheat">Wheat</option>
                      <option value="Rice">Rice</option>
                      <option value="Corn">Corn</option>
                      <option value="Soybean">Soybean</option>
                      <option value="Cotton">Cotton</option>
                      <option value="Sugarcane">Sugarcane</option>
                      <option value="Tomato">Tomato</option>
                      <option value="Barley">Barley</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-earth-700 dark:text-earth-300 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-earth-300 dark:border-earth-600 rounded-lg bg-white dark:bg-earth-700 text-earth-900 dark:text-earth-100 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                      placeholder="e.g., Punjab, India"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center">
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-primary-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <BeakerIcon className="w-5 h-5 mr-2" />
                        Analyze Soil Health
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Results */}
            {healthStatus && (
              <div className="mt-8 bg-white dark:bg-earth-800 rounded-xl shadow-lg border border-earth-200 dark:border-earth-700 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-earth-900 dark:text-earth-100">
                      Analysis Results
                    </h3>
                    <div className={`flex items-center space-x-2 px-4 py-2 rounded-full ${getScoreColor(qualityScore)}`}>
                      {React.createElement(getScoreIcon(qualityScore), { className: "w-5 h-5" })}
                      <span className="font-semibold">Score: {qualityScore}/100</span>
                    </div>
                  </div>

                  <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-4 mb-6">
                    <div className="flex items-start space-x-3">
                      <InformationCircleIcon className="w-6 h-6 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5" />
                      <p className="text-earth-900 dark:text-earth-100 font-medium">{healthStatus}</p>
                    </div>
                  </div>

                  {recommendations.length > 0 && (
                    <div>
                      <h4 className="text-lg font-semibold text-earth-900 dark:text-earth-100 mb-4">
                        Recommendations
                      </h4>
                      <ul className="space-y-3">
                        {recommendations.map((rec, index) => (
                          <li key={index} className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                            <p className="text-earth-700 dark:text-earth-300">{rec}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Recent Data Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-earth-800 rounded-xl shadow-lg border border-earth-200 dark:border-earth-700 overflow-hidden">
              <div className="bg-gradient-to-r from-secondary-500 to-primary-500 p-4 text-white">
                <h3 className="text-lg font-bold flex items-center">
                  <ChartBarIcon className="w-5 h-5 mr-2" />
                  Recent Analysis
                </h3>
              </div>

              <div className="p-4 space-y-4">
                {recentData.length > 0 ? (
                  recentData.map((item) => (
                    <div key={item.id} className="border border-earth-200 dark:border-earth-700 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-earth-900 dark:text-earth-100">
                          {item.crop_type || 'Unknown Crop'}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs ${getScoreColor(item.quality_score)}`}>
                          {item.quality_score}
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div>
                          <p className="text-earth-600 dark:text-earth-400">N</p>
                          <p className="font-semibold text-blue-600 dark:text-blue-400">
                            {item.npk?.nitrogen?.toFixed(1)}
                          </p>
                        </div>
                        <div>
                          <p className="text-earth-600 dark:text-earth-400">P</p>
                          <p className="font-semibold text-orange-600 dark:text-orange-400">
                            {item.npk?.phosphorus?.toFixed(1)}
                          </p>
                        </div>
                        <div>
                          <p className="text-earth-600 dark:text-earth-400">K</p>
                          <p className="font-semibold text-purple-600 dark:text-purple-400">
                            {item.npk?.potassium?.toFixed(1)}
                          </p>
                        </div>
                      </div>
                      <p className="text-xs text-earth-500 dark:text-earth-400 mt-2">
                        {new Date(item.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-earth-600 dark:text-earth-400 text-center py-4">
                    No recent analysis data available
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}