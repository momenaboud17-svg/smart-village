// ===============================================
// Smart Village - Dialect Listener
// مستمع اللهجات - يفهم العامية الريفية
// Created by Momen Aboud
// ===============================================

/**
 * محرك معالجة اللهجات الريفية
 * يحول الكلام العامي إلى أعراض طبية
 */
 export class DialectListener {
    constructor() {
        this.dictionary = {
            'بيزيّق': 'ألم حاد في الصدر',
            'هتنفجر': 'صداع شديد',
            'مزغللة': 'دوخة وعدم وضوح رؤية',
            'بيوجعني': 'ألم',
            'نهجان': 'ضيق تنفس',
            'كحة': 'سعال',
            'سخونة': 'حمى',
            'رجعة': 'قيء',
            'مغص': 'ألم في البطن',
            'دوخة': 'دوار'
        };
        
        this.symptomMapping = {
            'صدري بيزيّق': { chestPain: true, shortnessOfBreath: true },
            'دماغي هتنفجر': { headache: true, dizziness: true },
            'عيني مزغللة': { dizziness: true, blurryVision: true },
            'قلبي بيوجعني': { chestPain: true, heartRate: 'fast' },
            'عندي نهجان': { shortnessOfBreath: true },
            'بطني بيوجعني': { abdominalPain: true },
            'بيزيد الم': { painIntensifies: true }
        };
    }

    /**
     * تحليل جملة عامية
     * @param {string} phrase - الجملة المدخلة
     * @returns {Object} نتيجة التحليل
     */
    analyze(phrase) {
        if (!phrase || phrase.trim() === '') {
            return {
                symptoms: {},
                interpretation: 'لم تدخل أي جملة',
                originalPhrase: ''
            };
        }
        
        phrase = phrase.toLowerCase().trim();
        let symptoms = {};
        
        // البحث عن تطابق مباشر للعبارات
        for (let [key, value] of Object.entries(this.symptomMapping)) {
            if (phrase.includes(key)) {
                symptoms = { ...symptoms, ...value };
            }
        }
        
        // تحليل الكلمات الفردية
        let detectedWords = [];
        for (let [word, meaning] of Object.entries(this.dictionary)) {
            if (phrase.includes(word)) {
                detectedWords.push(meaning);
            }
        }
        
        // إذا لم نجد شيئاً
        if (detectedWords.length === 0 && Object.keys(symptoms).length === 0) {
            return {
                symptoms: {},
                interpretation: 'لم يتم التعرف على أعراض محددة. حاول استخدام كلمات مثل: صدري، كحة، سخونة',
                originalPhrase: phrase
            };
        }
        
        return {
            symptoms,
            interpretation: detectedWords.length ? detectedWords.join('، ') : 'تم التعرف على أعراض',
            originalPhrase: phrase
        };
    }

    /**
     * إضافة كلمة جديدة للقاموس
     * @param {string} word - الكلمة بالعامية
     * @param {string} meaning - المعنى الطبي
     */
    addWord(word, meaning) {
        this.dictionary[word] = meaning;
    }

    /**
     * إضافة عبارة جديدة
     * @param {string} phrase - العبارة بالعامية
     * @param {Object} symptoms - الأعراض المرتبطة
     */
    addPhrase(phrase, symptoms) {
        this.symptomMapping[phrase] = symptoms;
    }
}