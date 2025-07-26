'use client';

import { useEffect, useState } from 'react';
import { soilDataService } from '../../backend/soil-data-service';
import { 
  BeakerIcon, 
  ChartBarIcon, 
  MapPinIcon, 
  ClockIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

export default function ReportsPage() {
  const [soilData, setSoilData] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCrop, setSelectedCrop] = useState('all');
  const [dateRange, setDateRange] = useState('7days');

  useEffect(() => {
    setLoading(true);
    
    // Set up real-time listener for soil data
    const unsubscribe = soilDataService.getSoilDataRealTime((data) => {
      setSoilData(data);
      setLoading(false);
    });

    // Fetch statistics
    soilDataService.getSoilDataStats()
      .then(setStats)
      .catch(console.error);

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const filteredData = soilData.filter(item => {
    if (selectedCrop === 'all') return true;
    return item.crop_type?.toLowerCase() === selectedCrop.toLowerCase();
  });

  const getQualityColor = (score) => {
    if (score >= 85) return 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400';
    return 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400';
  };

  const getQualityIcon = (score) => {
    if (score >= 85) return CheckCircleIcon;
    if (score >= 70) return ExclamationTriangleIcon;
    return ExclamationTriangleIcon;
  };

  const getNPKStatus = (value, type) => {
    const thresholds = {
      nitrogen: { low: 15, high: 25 },
      phosphorus: { low: 12, high: 20 },
      potassium: { low: 15, high: 22 }
    };
    
    const threshold = thresholds[type];
    if (value < threshold.low) return { status: 'low', color: 'text-red-500', icon: ArrowTrendingDownIcon };
    if (value > threshold.high) return { status: 'high', color: 'text-blue-500', icon: ArrowTrendingUpIcon };
    return { status: 'optimal', color: 'text-green-500', icon: CheckCircleIcon };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-earth-900 dark:via-earth-800 dark:to-primary-900/20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-earth-600 dark:text-earth-400">Loading soil data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-earth-900 dark:via-earth-800 dark:to-primary-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <ChartBarIcon className="w-8 h-8 text-primary-600 dark:text-primary-400 mr-3" />
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-earth-900 dark:text-earth-100">
              Soil Health Reports
            </h1>
          </div>
          <p className="text-earth-600 dark:text-earth-400 text-lg">
            Real-time NPK soil data analysis and comprehensive crop health monitoring
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-earth-700 dark:text-earth-300 mb-2">
              Crop Type
            </label>
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="w-full px-4 py-2 border border-earth-300 dark:border-earth-600 rounded-lg bg-white dark:bg-earth-800 text-earth-900 dark:text-earth-100 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">All Crops</option>
              <option value="wheat">Wheat</option>
              <option value="rice">Rice</option>
              <option value="corn">Corn</option>
              <option value="soybean">Soybean</option>
              <option value="cotton">Cotton</option>
              <option value="sugarcane">Sugarcane</option>
              <option value="tomato">Tomato</option>
              <option value="barley">Barley</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-earth-700 dark:text-earth-300 mb-2">
              Date Range
            </label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full px-4 py-2 border border-earth-300 dark:border-earth-600 rounded-lg bg-white dark:bg-earth-800 text-earth-900 dark:text-earth-100 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="24hours">Last 24 Hours</option>
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="90days">Last 90 Days</option>
            </select>
          </div>
        </div>

        {/* Statistics Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-earth-800 rounded-xl shadow-lg p-6 border border-earth-200 dark:border-earth-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-earth-900 dark:text-earth-100">Total Samples</h3>
                <BeakerIcon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <p className="text-3xl font-bold text-primary-600 dark:text-primary-400">{stats.totalEntries}</p>
            </div>
            
            <div className="bg-white dark:bg-earth-800 rounded-xl shadow-lg p-6 border border-earth-200 dark:border-earth-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-earth-900 dark:text-earth-100">Avg Nitrogen</h3>
                <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
              </div>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stats.averageNPK.nitrogen}</p>
            </div>
            
            <div className="bg-white dark:bg-earth-800 rounded-xl shadow-lg p-6 border border-earth-200 dark:border-earth-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-earth-900 dark:text-earth-100">Avg Phosphorus</h3>
                <div className="w-6 h-6 bg-orange-500 rounded-full"></div>
              </div>
              <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">{stats.averageNPK.phosphorus}</p>
            </div>
            
            <div className="bg-white dark:bg-earth-800 rounded-xl shadow-lg p-6 border border-earth-200 dark:border-earth-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-earth-900 dark:text-earth-100">Avg Potassium</h3>
                <div className="w-6 h-6 bg-purple-500 rounded-full"></div>
              </div>
              <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{stats.averageNPK.potassium}</p>
            </div>
          </div>
        )}

        {/* Data Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredData.map((item) => {
            const QualityIcon = getQualityIcon(item.quality_score);
            const nitrogenStatus = getNPKStatus(item.npk?.nitrogen, 'nitrogen');
            const phosphorusStatus = getNPKStatus(item.npk?.phosphorus, 'phosphorus');
            const potassiumStatus = getNPKStatus(item.npk?.potassium, 'potassium');

            return (
              <div
                key={item.id}
                className="bg-white dark:bg-earth-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-earth-200 dark:border-earth-700 overflow-hidden"
              >
                {/* Header */}
                <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-4 text-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <BeakerIcon className="w-6 h-6" />
                      <div>
                        <h3 className="font-semibold text-lg">{item.crop_type}</h3>
                        <p className="text-primary-100 text-sm">{item.sensor_id}</p>
                      </div>
                    </div>
                    <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${getQualityColor(item.quality_score)}`}>
                      <QualityIcon className="w-4 h-4" />
                      <span className="text-sm font-medium">{item.quality_score}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* NPK Values */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <nitrogenStatus.icon className={`w-5 h-5 ${nitrogenStatus.color}`} />
                      </div>
                      <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {item.npk?.nitrogen?.toFixed(1)}
                      </p>
                      <p className="text-sm text-earth-600 dark:text-earth-400">Nitrogen (N)</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <phosphorusStatus.icon className={`w-5 h-5 ${phosphorusStatus.color}`} />
                      </div>
                      <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                        {item.npk?.phosphorus?.toFixed(1)}
                      </p>
                      <p className="text-sm text-earth-600 dark:text-earth-400">Phosphorus (P)</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <potassiumStatus.icon className={`w-5 h-5 ${potassiumStatus.color}`} />
                      </div>
                      <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                        {item.npk?.potassium?.toFixed(1)}
                      </p>
                      <p className="text-sm text-earth-600 dark:text-earth-400">Potassium (K)</p>
                    </div>
                  </div>

                  {/* Additional Metrics */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-earth-50 dark:bg-earth-700 rounded-lg p-3">
                      <p className="text-sm text-earth-600 dark:text-earth-400">pH Level</p>
                      <p className="text-xl font-semibold text-earth-900 dark:text-earth-100">
                        {item.ph?.toFixed(1)}
                      </p>
                    </div>
                    <div className="bg-earth-50 dark:bg-earth-700 rounded-lg p-3">
                      <p className="text-sm text-earth-600 dark:text-earth-400">Moisture</p>
                      <p className="text-xl font-semibold text-earth-900 dark:text-earth-100">
                        {item.moisture?.toFixed(1)}%
                      </p>
                    </div>
                  </div>

                  {/* Location and Time */}
                  <div className="flex items-center justify-between text-sm text-earth-600 dark:text-earth-400 mb-4">
                    <div className="flex items-center space-x-1">
                      <MapPinIcon className="w-4 h-4" />
                      <span>{item.location?.region}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <ClockIcon className="w-4 h-4" />
                      <span>{new Date(item.timestamp).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Recommendations */}
                  {item.recommendations && item.recommendations.length > 0 && (
                    <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-4">
                      <h4 className="font-semibold text-earth-900 dark:text-earth-100 mb-2">
                        Recommendations
                      </h4>
                      <ul className="space-y-1">
                        {item.recommendations.map((rec, index) => (
                          <li key={index} className="text-sm text-earth-700 dark:text-earth-300 flex items-start">
                            <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {filteredData.length === 0 && (
          <div className="text-center py-12">
            <BeakerIcon className="w-16 h-16 text-earth-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-earth-900 dark:text-earth-100 mb-2">
              No Data Available
            </h3>
            <p className="text-earth-600 dark:text-earth-400">
              No soil data found for the selected filters. Try adjusting your search criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}