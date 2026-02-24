// ===============================================
// Smart Village - Village Heatmap
// خريطة القرية الحرارية (Peer-to-Peer)
// Created by Momen Aboud
// ===============================================

/**
 * محاكاة خريطة انتشار الأمراض عبر البلوتوث
 */
 export class VillageHeatmap {
    constructor() {
        this.diseases = ['إنفلونزا', 'نزلة معوية', 'حساسية', 'لا شيء'];
        this.grid = [];
        this.initGrid();
    }

    /**
     * تهيئة الشبكة
     */
    initGrid() {
        for (let i = 0; i < 25; i++) {
            const randomDisease = this.diseases[Math.floor(Math.random() * this.diseases.length)];
            const intensity = Math.random();
            this.grid.push({
                id: i,
                disease: randomDisease,
                intensity: intensity,
                active: randomDisease !== 'لا شيء',
                lastUpdate: Date.now()
            });
        }
    }

    /**
     * تحديث المحاكاة
     * @returns {Array} الشبكة المحدثة
     */
    updateSimulation() {
        // محاكاة انتشار الأمراض
        for (let i = 0; i < this.grid.length; i++) {
            // فرصة 20% للتغيير
            if (Math.random() > 0.8) {
                this.grid[i].disease = this.diseases[Math.floor(Math.random() * 3)];
                this.grid[i].active = this.grid[i].disease !== 'لا شيء';
                this.grid[i].intensity = Math.random();
                this.grid[i].lastUpdate = Date.now();
            }
        }
        return this.grid;
    }

    /**
     * الحصول على تنبيه الانتشار
     * @returns {string} نص التنبيه
     */
    getOutbreakAlert() {
        const activeCount = this.grid.filter(c => c.active).length;
        const fluCount = this.grid.filter(c => c.disease === 'إنفلونزا').length;
        const stomachCount = this.grid.filter(c => c.disease === 'نزلة معوية').length;
        
        if (fluCount > 8) {
            return '⚠️ انتشار مرتفع للإنفلونزا في منطقتك!';
        }
        if (stomachCount > 5) {
            return '⚠️ انتشار للنزلات المعوية - اغسل يديك جيداً';
        }
        if (activeCount > 10) {
            return '⚠️ يوجد أمراض منتشرة - كن حذراً';
        }
        return 'لا يوجد انتشار ملحوظ في جوارك';
    }

    /**
     * محاكاة عدد الأجهزة القريبة
     * @returns {number}
     */
    getNearbyDevices() {
        return 5 + Math.floor(Math.random() * 10);
    }

    /**
     * الحصول على حالة خلية محددة
     * @param {number} index - رقم الخلية
     * @returns {Object}
     */
    getCell(index) {
        return this.grid[index] || null;
    }

    /**
     * إعادة تعيين الشبكة
     */
    reset() {
        this.grid = [];
        this.initGrid();
    }
}