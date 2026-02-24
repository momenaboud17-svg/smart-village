// ===============================================
// Smart Village - Momen Dashboard
// لوحة تحكم مومن - إحصائيات وتتبع
// Created by Momen Aboud
// ===============================================

/**
 * لوحة تحكم تعرض الإحصائيات والأرواح التي تم حمايتها
 */
 export class MomenDashboard {
    constructor() {
        this.totalScans = 1247;
        this.emergencyCount = 38;
        this.livesSaved = 156;
        this.activeUsers = 12;
        this.dailyStats = {
            flu: 23,
            stomach: 15,
            asthma: 7
        };
    }

    /**
     * زيادة عدد المسوح
     * @param {boolean} isEmergency - هل هي حالة طوارئ
     */
    incrementScan(isEmergency = false) {
        this.totalScans++;
        if (isEmergency) {
            this.emergencyCount++;
            // فرصة 50% لإنقاذ حياة في الطوارئ
            if (Math.random() > 0.5) {
                this.livesSaved++;
            }
        }
        this.updateDisplay();
    }

    /**
     * تحديث عدد المستخدمين النشطين
     * @param {number} count
     */
    setActiveUsers(count) {
        this.activeUsers = count;
        this.updateDisplay();
    }

    /**
     * تحديث إحصائيات الأمراض
     * @param {Object} stats
     */
    updateDiseaseStats(stats) {
        this.dailyStats = { ...this.dailyStats, ...stats };
        this.updateDisplay();
    }

    /**
     * تحديث واجهة المستخدم
     */
    updateDisplay() {
        const elements = {
            totalScans: document.getElementById('totalScans'),
            emergencyCount: document.getElementById('emergencyCount'),
            livesSaved: document.getElementById('livesSaved'),
            activeUsers: document.getElementById('activeUsers')
        };
        
        if (elements.totalScans) {
            elements.totalScans.innerText = this.totalScans.toLocaleString();
        }
        if (elements.emergencyCount) {
            elements.emergencyCount.innerText = this.emergencyCount;
        }
        if (elements.livesSaved) {
            elements.livesSaved.innerText = this.livesSaved;
        }
        if (elements.activeUsers) {
            elements.activeUsers.innerText = this.activeUsers;
        }
    }

    /**
     * إعادة تعيين الإحصائيات
     */
    reset() {
        this.totalScans = 0;
        this.emergencyCount = 0;
        this.livesSaved = 0;
        this.updateDisplay();
    }

    /**
     * الحصول على إحصائيات اليوم
     * @returns {Object}
     */
    getTodayStats() {
        return this.dailyStats;
    }
}