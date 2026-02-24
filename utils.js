// ===============================================
// Smart Village - Utilities
// دوال مساعدة عامة
// Created by Momen Aboud
// ===============================================

/**
 * توليد رقم عشوائي في نطاق
 * @param {number} min - أقل قيمة
 * @param {number} max - أكبر قيمة
 * @returns {number}
 */
 export function randomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * تأخير التنفيذ
 * @param {number} ms - milliseconds
 * @returns {Promise}
 */
export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * تنسيق الوقت
 * @param {Date} date
 * @returns {string}
 */
export function formatTime(date = new Date()) {
    return date.toLocaleTimeString('ar-EG', {
        hour: '2-digit',
        minute: '2-digit'
    });
}

/**
 * حفظ في localStorage
 * @param {string} key
 * @param {any} value
 */
export function saveToStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        console.error('Storage error:', e);
    }
}

/**
 * قراءة من localStorage
 * @param {string} key
 * @param {any} defaultValue
 * @returns {any}
 */
export function getFromStorage(key, defaultValue = null) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
        console.error('Storage error:', e);
        return defaultValue;
    }
}

/**
 * التحقق من دعم المتصفح للميزات
 * @returns {Object}
 */
export function checkBrowserSupport() {
    return {
        speechSynthesis: 'speechSynthesis' in window,
        localStorage: 'localStorage' in window,
        webGL: (() => {
            try {
                const canvas = document.createElement('canvas');
                return !!(window.WebGLRenderingContext && 
                    (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
            } catch (e) {
                return false;
            }
        })(),
        webSpeech: 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window
    };
}

/**
 * إنشاء معرف فريد
 * @returns {string}
 */
export function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}