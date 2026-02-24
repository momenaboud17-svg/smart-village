// ===============================================
// Smart Village - File #1: Neural Gateway
// البوابة العصبية - الماسح الضوئي الحيوي
// Created by Momen Aboud
// ===============================================

/**
 * محاكاة الماسح الضوئي الحيوي
 * يحلل العلامات الحيوية (النبض، الأكسجين، الحرارة، لون العين)
 */
 export class NeuralGateway {
    constructor() {
        this.vitals = {
            heartRate: 78,
            spo2: 97,
            temp: 36.6,
            eyeColor: 'normal',
            coughType: 'dry',
            shortnessOfBreath: false
        };
    }

    /**
     * إجراء مسح جديد (محاكاة)
     * @returns {Object} القراءات الحيوية الجديدة
     */
    scan() {
        this.vitals.heartRate = 60 + Math.floor(Math.random() * 40);
        this.vitals.spo2 = 94 + Math.floor(Math.random() * 6);
        this.vitals.temp = (36 + Math.random() * 1.5).toFixed(1);
        this.vitals.eyeColor = Math.random() > 0.7 ? 'pale' : 'normal';
        return this.vitals;
    }

    /**
     * الحصول على آخر القراءات
     * @returns {Object}
     */
    getCurrentVitals() {
        return { ...this.vitals };
    }

    /**
     * تحديث نوع السعال
     * @param {string} type - dry, wet, none
     */
    setCoughType(type) {
        if (['dry', 'wet', 'none'].includes(type)) {
            this.vitals.coughType = type;
        }
    }

    /**
     * تحديث حالة النهجان
     * @param {boolean} value
     */
    setShortnessOfBreath(value) {
        this.vitals.shortnessOfBreath = value;
    }
}