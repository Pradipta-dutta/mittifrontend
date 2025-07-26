import { database } from './firebase-config';
import { ref, onValue, push, set, get, query, orderByChild, limitToLast } from 'firebase/database';

/**
 * Service for managing soil data in Firebase Realtime Database
 */
export class SoilDataService {
  constructor() {
    this.soilDataRef = ref(database, 'soil_data');
  }

  /**
   * Get real-time soil data updates
   * @param {Function} callback - Callback function to handle data updates
   * @returns {Function} Unsubscribe function
   */
  getSoilDataRealTime(callback) {
    return onValue(this.soilDataRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Convert object to array and sort by timestamp
        const dataArray = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        })).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        callback(dataArray);
      } else {
        callback([]);
      }
    });
  }

  /**
   * Get latest soil data entries
   * @param {number} limit - Number of latest entries to fetch
   * @returns {Promise<Array>} Array of soil data entries
   */
  async getLatestSoilData(limit = 10) {
    try {
      const latestQuery = query(
        this.soilDataRef,
        orderByChild('timestamp'),
        limitToLast(limit)
      );
      
      const snapshot = await get(latestQuery);
      const data = snapshot.val();
      
      if (data) {
        return Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        })).reverse(); // Reverse to get newest first
      }
      return [];
    } catch (error) {
      console.error('Error fetching latest soil data:', error);
      throw error;
    }
  }

  /**
   * Add new soil data entry
   * @param {Object} soilData - Soil data object
   * @returns {Promise<string>} ID of the created entry
   */
  async addSoilData(soilData) {
    try {
      const newDataRef = push(this.soilDataRef);
      const dataWithTimestamp = {
        ...soilData,
        timestamp: new Date().toISOString(),
        created_at: Date.now()
      };
      
      await set(newDataRef, dataWithTimestamp);
      return newDataRef.key;
    } catch (error) {
      console.error('Error adding soil data:', error);
      throw error;
    }
  }

  /**
   * Get soil data filtered by crop type
   * @param {string} cropType - Type of crop to filter by
   * @param {Function} callback - Callback function to handle data updates
   * @returns {Function} Unsubscribe function
   */
  getSoilDataByCropType(cropType, callback) {
    const cropQuery = query(
      this.soilDataRef,
      orderByChild('crop_type'),
      equalTo(cropType)
    );
    
    return onValue(cropQuery, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const dataArray = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        })).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        callback(dataArray);
      } else {
        callback([]);
      }
    });
  }

  /**
   * Get aggregated soil data statistics
   * @returns {Promise<Object>} Aggregated statistics
   */
  async getSoilDataStats() {
    try {
      const snapshot = await get(this.soilDataRef);
      const data = snapshot.val();
      
      if (!data) {
        return {
          totalEntries: 0,
          averageNPK: { nitrogen: 0, phosphorus: 0, potassium: 0 },
          averagePH: 0,
          averageMoisture: 0
        };
      }

      const entries = Object.values(data);
      const totalEntries = entries.length;

      // Calculate averages
      const totals = entries.reduce((acc, entry) => {
        acc.nitrogen += entry.npk?.nitrogen || 0;
        acc.phosphorus += entry.npk?.phosphorus || 0;
        acc.potassium += entry.npk?.potassium || 0;
        acc.ph += entry.ph || 0;
        acc.moisture += entry.moisture || 0;
        return acc;
      }, { nitrogen: 0, phosphorus: 0, potassium: 0, ph: 0, moisture: 0 });

      return {
        totalEntries,
        averageNPK: {
          nitrogen: (totals.nitrogen / totalEntries).toFixed(2),
          phosphorus: (totals.phosphorus / totalEntries).toFixed(2),
          potassium: (totals.potassium / totalEntries).toFixed(2)
        },
        averagePH: (totals.ph / totalEntries).toFixed(2),
        averageMoisture: (totals.moisture / totalEntries).toFixed(2)
      };
    } catch (error) {
      console.error('Error calculating soil data stats:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const soilDataService = new SoilDataService();