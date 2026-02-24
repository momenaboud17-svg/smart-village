// ===============================================
// Smart Village - File #2: Diagnostic Matrix
// مصفوفة التشخيص - محرك الاستنتاج
// Created by Momen Aboud
// ===============================================

/**
 * محرك الاستنتاج (Expert System)
 * يحلل الأعراض ويعطي التشخيص المناسب
 */
 export class InferenceEngine {
    constructor() {
        this.rules = [
            {
                id: 'anemia',
                name: 'أنيميا حادة',
                condition: (v) => v.eyeColor === 'pale' && v.heartRate > 85,
                probability: 0.85,
                protocol: [
                    'فحص هيموجلوبين عاجل',
                    'تناول حديد مع فيتامين C',
                    'أطعمة غنية بالحديد: سبانخ، عدس، كبدة'
                ],
                remedies: ['الجرجير', 'العسل الأسود', 'التمر'],
                emergency: false
            },
            {
                id: 'asthma',
                name: 'حساسية صدر',
                condition: (v) => v.coughType === 'dry' && v.shortnessOfBreath === true,
                probability: 0.78,
                protocol: [
                    'موسعات الشعب الهوائية',
                    'تجنب الغبار والروائح القوية',
                    'شرب سوائل دافئة'
                ],
                remedies: ['الزنجبيل', 'البابونج', 'الكركم'],
                emergency: false
            },
            {
                id: 'stroke',
                name: '⚠️ جلطة دماغية محتملة',
                condition: (v) => (v.heartRate > 110 || v.heartRate < 40) && v.eyeColor === 'pale',
                probability: 0.92,
                protocol: [
                    'اتصل بالإسعاف فوراً',
                    'إمالة الرأس للجانب',
                    'لا تعطه أي شيء بالفم'
                ],
                remedies: ['لا شيء - حالة طارئة', 'الوضعية الجانبية الآمنة'],
                emergency: true
            },
            {
                id: 'pneumonia',
                name: 'التهاب رئوي',
                condition: (v) => v.coughType === 'wet' && v.heartRate > 90 && v.shortnessOfBreath === true,
                probability: 0.81,
                protocol: [
                    'مضاد حيوي (بعد استشارة طبيب)',
                    'كمادات دافئة للصدر',
                    'راحة تامة'
                ],
                remedies: ['الزعتر', 'العسل', 'بخار البصل'],
                emergency: false
            },
            {
                id: 'cardiac',
                name: '🚨 سكتة قلبية',
                condition: (v) => v.heartRate < 35 || v.heartRate > 150,
                probability: 0.98,
                protocol: [
                    'إنعاش قلبي فوري',
                    'اتصل بالإسعاف الآن',
                    'ضغطات صدر 5-6 سم'
                ],
                remedies: ['إنعاش قلبي', 'تنفس صناعي'],
                emergency: true
            }
        ];
    }

    /**
     * تقييم الأعراض وإرجاع التشخيص
     * @param {Object} vitals - القراءات الحيوية
     * @param {Object} dialectSymptoms - أعراض من اللهجات
     * @returns {Object} التشخيص
     */
    evaluate(vitals, dialectSymptoms = {}) {
        const data = { ...vitals, ...dialectSymptoms };
        
        for (const rule of this.rules) {
            if (rule.condition(data)) {
                return rule;
            }
        }
        
        // الحالة الطبيعية
        return {
            id: 'normal',
            name: 'حالة طبيعية - لا داعي للقلق',
            probability: 0.1,
            protocol: [
                'تابع حالتك',
                'اشرب سوائل كافية',
                'راحة تامة'
            ],
            remedies: ['النعناع', 'الشاي الأخضر', 'ماء'],
            emergency: false
        };
    }

    /**
     * الحصول على جميع القواعد
     * @returns {Array}
     */
    getAllRules() {
        return this.rules;
    }
}