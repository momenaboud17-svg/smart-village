// ===============================================
// Smart Village - Core Engine (النواة الرئيسية)
// تجمع كل أجزاء التطبيق وتشغيلها
// Created by Momen Aboud
// ===============================================

import { NeuralGateway } from './neural-gateway.js';
import { InferenceEngine } from './diagnostic-matrix.js';
import { VocalProphet } from './vocal-prophet.js';
import { DialectListener } from './dialect-listener.js';
import { VillageHeatmap } from './village-heatmap.js';
import { MomenDashboard } from './momen-dashboard.js';
import { randomInRange, sleep, formatTime } from './utils.js';

// تهيئة جميع الأنظمة
const gateway = new NeuralGateway();
const engine = new InferenceEngine();
const prophet = new VocalProphet();
const dialect = new DialectListener();
const heatmap = new VillageHeatmap();
const dashboard = new MomenDashboard();

// الحالة العامة
let currentVitals = gateway.scan();
let currentDiagnosis = null;

// تحديث واجهة الماسح
function updateScannerUI() {
    document.getElementById('heartRateDisplay').innerText = currentVitals.heartRate;
    document.getElementById('spo2Display').innerText = currentVitals.spo2 + '%';
    document.getElementById('tempDisplay').innerText = currentVitals.temp + '°C';
    document.getElementById('cameraStatus').innerHTML = 
        `تحليل لوني: ${97 + Math.floor(Math.random()*3)}% | النبض: ${currentVitals.heartRate} bpm`;
}

// تشغيل تشخيص كامل
function runDiagnosis(additionalSymptoms = {}) {
    const diagnosis = engine.evaluate(currentVitals, additionalSymptoms);
    currentDiagnosis = diagnosis;
    
    // تحديث واجهة النبي الصوتي
    const voiceMsg = prophet.generateMessage(diagnosis.name, diagnosis.remedies);
    document.getElementById('voiceMessage').innerText = voiceMsg;
    
    // تحديث وضع الطوارئ
    if (diagnosis.emergency) {
        document.body.classList.add('emergency-global');
    } else {
        document.body.classList.remove('emergency-global');
    }
    
    // تحديث لوحة التحكم
    dashboard.incrementScan(diagnosis.emergency);
    
    // تحديث وقت آخر تشخيص
    document.getElementById('lastDiagnosisTime').innerHTML = 
        `آخر تشخيص: ${formatTime()} - ${diagnosis.name}`;
    
    return diagnosis;
}

// تهيئة الأحداث عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    console.log('%c🏥 SMART VILLAGE - CORE ENGINE', 
        'font-size:20px; color:#ffd966; background:#0a0f1e; padding:10px; border-radius:10px;');
    console.log('%cCreated by Momen Aboud', 'font-size:16px; color:#00ffc3;');
    
    // تحديث واجهة الماسح
    updateScannerUI();
    
    // تشغيل تشخيص أولي
    runDiagnosis();
    
    // إعداد أحدات التنقل بين الأقسام
    setupNavigation();
    
    // إعداد أزرار الماسح
    setupScannerEvents();
    
    // إعداد أحداث النبي الصوتي
    setupVoiceEvents();
    
    // إعداد أحداث مستمع اللهجات
    setupDialectEvents();
    
    // إعداد خريطة القرية
    setupHeatmap();
});

// دوال التهيئة (مختصرة)
function setupNavigation() {
    const tabs = document.querySelectorAll('.nav-tab');
    const sections = document.querySelectorAll('.section');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.section;
            tabs.forEach(t => t.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active-section'));
            tab.classList.add('active');
            document.getElementById(target + '-section').classList.add('active-section');
        });
    });
}

function setupScannerEvents() {
    document.getElementById('simulateScanBtn').addEventListener('click', () => {
        currentVitals = gateway.scan();
        updateScannerUI();
        runDiagnosis();
        setTimeout(() => {
            document.querySelector('[data-section="voice"]').click();
        }, 500);
    });
}

function setupVoiceEvents() {
    document.getElementById('speakBtn').addEventListener('click', () => {
        if (currentDiagnosis) {
            const msg = prophet.generateMessage(currentDiagnosis.name, currentDiagnosis.remedies);
            prophet.speak(msg);
        } else {
            prophet.speak('مرحبا بك في القرية الذكية. اضغط على زر المسح أولاً.');
        }
    });
}

function setupDialectEvents() {
    document.getElementById('analyzeDialectBtn').addEventListener('click', () => {
        const input = document.getElementById('dialectInput').value;
        if (!input.trim()) return;
        
        const result = dialect.analyze(input);
        document.getElementById('dialectAnalysis').innerHTML = `
            <div style="color:#00ffc3;">"${result.originalPhrase}"</div>
            <div style="margin-top:5px;">🔍 ${result.interpretation}</div>
        `;
        
        if (Object.keys(result.symptoms).length > 0) {
            currentVitals = { ...currentVitals, ...result.symptoms };
            runDiagnosis(result.symptoms);
            setTimeout(() => {
                document.querySelector('[data-section="voice"]').click();
            }, 1000);
        }
    });
    
    document.querySelectorAll('.phrase-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            document.getElementById('dialectInput').value = chip.dataset.phrase;
            document.getElementById('analyzeDialectBtn').click();
        });
    });
}

function setupHeatmap() {
    function renderHeatmap() {
        const grid = document.getElementById('villageGrid');
        grid.innerHTML = '';
        
        const cells = heatmap.updateSimulation();
        cells.forEach((cell, index) => {
            const div = document.createElement('div');
            div.className = 'village-cell';
            
            if (cell.active) {
                if (cell.intensity > 0.6) div.classList.add('active-high');
                else if (cell.intensity > 0.3) div.classList.add('active-medium');
                else div.classList.add('active-low');
            }
            
            div.title = `${cell.disease} (شدة ${Math.round(cell.intensity*100)}%)`;
            grid.appendChild(div);
        });
        
        document.getElementById('outbreakAlert').innerText = heatmap.getOutbreakAlert();
        document.getElementById('bluetoothStatus').innerHTML = 
            `📡 بلوتوث نشط: ${heatmap.getNearbyDevices()} أجهزة قريبة (محاكاة P2P)`;
    }
    
    renderHeatmap();
    setInterval(renderHeatmap, 5000);
}