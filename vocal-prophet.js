// ===============================================
// Smart Village - File #3: Vocal Prophet
// النبي الصوتي - تحويل النص إلى كلام بلهجة ريفية
// Created by Momen Aboud
// ===============================================

/**
 * محرك تحويل النص إلى كلام (Offline TTS)
 * يقرأ التشخيص بصوت واثق بلهجة ريفية
 */
 export class VocalProphet {
    constructor() {
        this.isSpeaking = false;
        this.voiceType = 'ريفية';
    }

    /**
     * نطق النص
     * @param {string} text - النص المراد نطقه
     * @returns {boolean} - نجاح العملية
     */
    speak(text) {
        if (!text || this.isSpeaking) return false;
        
        console.log('🔊 Vocal Prophet says:', text);
        
        try {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'ar-EG';
            utterance.rate = 0.9;      // أبطأ لكبار السن
            utterance.pitch = 1.1;      // نغمة دافئة
            utterance.volume = 1;
            
            // اختيار صوت عربي إن وجد
            const voices = window.speechSynthesis.getVoices();
            const arabicVoice = voices.find(v => v.lang.includes('ar'));
            if (arabicVoice) utterance.voice = arabicVoice;
            
            utterance.onstart = () => { this.isSpeaking = true; };
            utterance.onend = () => { this.isSpeaking = false; };
            utterance.onerror = () => { this.isSpeaking = false; };
            
            window.speechSynthesis.speak(utterance);
            return true;
            
        } catch (error) {
            console.error('TTS Error:', error);
            this.isSpeaking = false;
            return false;
        }
    }

    /**
     * إيقاف النطق
     */
    stop() {
        window.speechSynthesis.cancel();
        this.isSpeaking = false;
    }

    /**
     * توليد رسالة صوتية من التشخيص
     * @param {string} diagnosis - اسم التشخيص
     * @param {Array} remedies - العلاجات
     * @returns {string} الرسالة
     */
    generateMessage(diagnosis, remedies) {
        const remediesText = remedies.slice(0, 2).join(' و ');
        
        const messages = [
            `يا عم الحاج، التشخيص: ${diagnosis}. العلاج: ${remediesText}. خذ بالك على نفسك وربنا معاك.`,
            `مرحبا بك. التحليل طلع: ${diagnosis}. الأفضل تعمل: ${remediesText}. سلامتك يا رب.`,
            `نتيجة الكشف: ${diagnosis}. ${remediesText}. متنساش تشرب سوائل كتير.`
        ];
        
        return messages[Math.floor(Math.random() * messages.length)];
    }

    /**
     * التحقق من دعم المتصفح للنطق
     * @returns {boolean}
     */
    static isSupported() {
        return 'speechSynthesis' in window;
    }
}